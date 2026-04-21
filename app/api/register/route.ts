// app\api\register\route.ts
import { db } from '@/lib/db';
import { hash } from 'bcrypt-ts';

export const POST = async (req: Request) => {
  // Convert the raw request body into a JS Object
  const body = await req.json();
  const { email, password } = body; // extract data

  // Hash password with salt 10
  const hashed = await hash(password, 10);

  // Create new user and save to DB
  const user = await db.user.create({
    data: { email, password: hashed },
  });

  return Response.json(user);
};
