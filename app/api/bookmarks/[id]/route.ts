// app\api\bookmarks\[id]\route.ts
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

type RouteContext = { params: Promise<{ id: string }> };

// PATCH /api/bookmarks/:id → update collectionId (or other fields later)
export const PATCH = async (req: Request, context: RouteContext) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();

    // collectionId can be a string (assign) or null (remove from collection)
    const { collectionId } = body;

    // If a collectionId is provided, verify it belongs to this user
    // Prevents user A from assigning their bookmark to user B's collection
    if (collectionId) {
      const collection = await db.collection.findFirst({
        where: { id: collectionId, userId: session.user.id },
      });
      if (!collection) {
        return Response.json(
          { error: 'Collection not found' },
          { status: 404 }
        );
      }
    }

    const updated = await db.bookmark.updateMany({
      where: { id, userId: session.user.id },
      data: { collectionId: collectionId ?? null },
    });

    if (updated.count === 0) {
      return Response.json(
        { error: 'Not found or not yours' },
        { status: 404 }
      );
    }

    const bookmark = await db.bookmark.findUnique({ where: { id } });
    return Response.json(bookmark);
  } catch (error) {
    console.error('PATCH BOOKMARK ERROR:', error);
    return Response.json(
      { error: 'Failed to update bookmark' },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    console.log('Deleting ID: ', id);

    if (!id) {
      return Response.json({ error: 'Invalid Id' }, { status: 400 });
    }

    const deleted = await db.bookmark.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (deleted.count === 0) {
      return Response.json(
        { error: 'Not found or not yours' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      count: deleted.count,
    });
  } catch (error) {
    console.error('DELETE ERROR:', error);

    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }
};
