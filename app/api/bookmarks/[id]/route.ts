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

    // Only update fields that were actually sent in the request body.
    // collectionId can be a string (assign) or null (remove from collection)
    const { title, url, note, collectionId } = body;

    const updated = await db.bookmark.updateMany({
      where: { id, userId: session.user.id },
      data: {
        ...(title !== undefined && { title }),
        ...(url !== undefined && { url }),
        // note can be a string OR null (to clear it) — both are valid
        ...(note !== undefined && { note: note || null }),
        ...(collectionId !== undefined && {
          collectionId: collectionId || null,
        }),
      },
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
