import { db } from '@/lib/db';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await db.bookmark.deleteMany({ where: { id: params.id } });

  return Response.json({ success: true });
};
