// app\api\bookmarks\[id]\route.ts
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

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
