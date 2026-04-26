// Bookmark-Manager\app\api\bookmarks\route.ts
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

/**
 * Creates a new bookmark for the user.
 * * @async
 * @function POST
 * @param {NextRequest} req - The incoming Next.js request object.
 * @property {Object} body - The JSON body of the request.
 * @property {string} body.url - The full URL of the website to bookmark (Required).
 * @property {string} [body.title] - An optional title; defaults to the URL if not provided.
 * * @returns {Promise<Response>} A JSON response containing the created bookmark object or an error message.
 * @throws {500} If a database or server error occurs.
 * @throws {400} If the URL is missing from the request body.
 */
export const POST = async (req: NextRequest) => {
  try {
    // auth() replaces getServerSession(authOptions) in Auth.js v5
    // It reads the session from the JWT cookie automatically
    const session = await auth();

    // if (!session || !session.user) - if no session or session.user
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, url } = body;

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    // favicon auto generate
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;

    const bookmark = await db.bookmark.create({
      data: {
        title: title || url,
        url,
        favicon,
        userId: session.user.id,
      },
    });

    return Response.json(bookmark);
  } catch (error) {
    console.error('CREATE ERROR:', error);
    return Response.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
};

/**
 * Retrieves all bookmarks, ordered by the most recently created.
 * * @async
 * @function GET
 * @returns {Promise<Response>} A JSON response containing an array of bookmark objects.
 * * @example
 * // Returns: [{ id: "...", title: "Google", url: "https://google.com", ... }]
 */
export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookmarks = await db.bookmark.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(bookmarks);
  } catch (error) {
    console.error('GET ERROR:', error);
    return Response.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
};
