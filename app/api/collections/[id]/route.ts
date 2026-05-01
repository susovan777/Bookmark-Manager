// Path: app\api\collections\[id]\route.ts

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

export const GET = async (req: Request, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const collection = await db.collection.findFirst({
      where: { id, userId: session.user.id },
      include: { _count: { select: { bookmarks: true } } },
    });

    if (!collection) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json(collection);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
};

// PATCH /api/collections/:id → rename a collection
export const PATCH = async (req: Request, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { name, description, icon, color } = body;

    if (!name?.trim()) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    // updateMany with userId check ensures users can only edit their own collections
    const updated = await db.collection.updateMany({
      where: { id, userId: session.user.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        icon: icon || null,
        color: color || null,
      },
    });

    if (updated.count === 0) {
      return Response.json(
        { error: 'Not found or not yours' },
        { status: 404 }
      );
    }

    // Fetch updated collection with count to return fresh data
    const collection = await db.collection.findUnique({
      where: { id },
      include: { _count: { select: { bookmarks: true } } },
    });

    return Response.json(collection);
  } catch (error) {
    console.error('PATCH COLLECTION ERROR:', error);
    return Response.json(
      { error: 'Failed to update collection' },
      { status: 500 }
    );
  }
};

// DELETE /api/collections/:id → delete a collection
// Bookmarks in this collection are NOT deleted — their collectionId becomes null (SetNull)
export const DELETE = async (req: Request, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const deleted = await db.collection.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (deleted.count === 0) {
      return Response.json(
        { error: 'Not found or not yours' },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE COLLECTION ERROR:', error);
    return Response.json(
      { error: 'Failed to delete collection' },
      { status: 500 }
    );
  }
};
