// Path: app\api\collections\route.ts

import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/collections → fetch all collections for the logged-in user
export const GET = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const collections = await db.collection.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },

      // _count is a Prisma feature that adds a count of related records.
      // This lets us show "12 bookmarks" on each collection card
      // without fetching all the bookmarks themselves.
      include: {
        _count: {
          select: { bookmarks: true },
        },
      },
    });

    return Response.json(collections);
  } catch (error) {
    console.error('GET COLLECTIONS ERROR:', error);
    return Response.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
};

// POST /api/collections → create a new collection
export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, icon, color } = body;

    if (!name?.trim()) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    // Check for duplicate collection name for this user
    // Two users can have the same name, but one user can't have two "Design" collections
    const existing = await db.collection.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        userId: session.user.id,
      },
    });

    if (existing) {
      return Response.json(
        { error: 'A collection with this name already exists' },
        { status: 409 }
      );
    }

    const collection = await db.collection.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        icon: icon || null,
        color: color || null,
        userId: session.user.id,
      },
      include: {
        _count: { select: { bookmarks: true } },
      },
    });

    return Response.json(collection, { status: 201 });
  } catch (error) {
    console.error('CREATE COLLECTION ERROR:', error);
    return Response.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
};
