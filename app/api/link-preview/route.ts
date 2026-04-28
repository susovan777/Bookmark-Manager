// Path: app\api\link-preview\route.ts

import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

// This runs SERVER-SIDE — important because:
// 1. Avoids CORS errors (browser can't fetch most sites directly)
// 2. Hides our server from external sites
// 3. We can sanitise the response before sending to the client

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the URL to preview from query params: /api/link-preview?url=https://...
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate the URL format before fetching
    try {
      new URL(url);
    } catch {
      return Response.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Fetch the actual webpage HTML from the target URL
    const response = await fetch(url, {
      headers: {
        // Some sites block requests without a User-Agent header
        'User-Agent': 'Mozilla/5.0 (compatible; Linkmark/1.0)',
      },
      // Abort if the site takes more than 5 seconds
      signal: AbortSignal.timeout(5000),
    });

    const html = await response.text();

    // --- Parse metadata from the HTML using regex ---
    // We look for Open Graph tags first (og:title), then fall back to <title>

    // Helper: extract a meta tag's content value
    // e.g. <meta property="og:title" content="GitHub"> → "GitHub"
    const getMeta = (property: string): string | null => {
      const match =
        html.match(
          new RegExp(
            `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`,
            'i'
          )
        ) ||
        html.match(
          new RegExp(
            `<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`,
            'i'
          )
        );
      return match ? match[1].trim() : null;
    };

    // Try og:title first, then twitter:title, then <title> tag
    const title =
      getMeta('og:title') ||
      getMeta('twitter:title') ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      url; // final fallback: use the URL itself

    const description =
      getMeta('og:description') || getMeta('description') || null;

    // Build favicon URL using Google's favicon service as reliable fallback
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;

    return Response.json({
      title,
      description,
      favicon,
    });
  } catch (error) {
    console.error('LINK PREVIEW ERROR:', error);
    // Return empty data — the client handles this gracefully
    return Response.json(
      { title: null, description: null, favicon: null },
      { status: 200 }
      // We return 200 even on fetch failure so the client
      // doesn't show an error — user just types the title manually
    );
  }
};
