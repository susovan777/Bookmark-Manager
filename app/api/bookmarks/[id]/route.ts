// app\api\bookmarks\[id]\route.ts
import { db } from '@/lib/db';

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;

    console.log('Deleting ID: ', id);

    if (!id) {
      return Response.json({ error: 'Invalid Id' }, { status: 400 });
    }

    const deleted = await db.bookmark.deleteMany({
      where: { id },
    });

    return Response.json({
      success: true,
      count: deleted.count,
    });
  } catch (error) {
    console.error('DELETE ERROR:', error);

    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }
};
