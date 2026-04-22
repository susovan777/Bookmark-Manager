// app\api\register\route.ts
import { db } from '@/lib/db';
import { hash } from 'bcrypt-ts';

export const POST = async (req: Request) => {
  try {
    // Convert the raw request body into a JS Object
    const body = await req.json();
    const { name, email, password } = body; // extract data

    // --- Validation ---
    // Check all required fields are present
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Password should be at least 6 characters
    if (password.length < 6) {
      return Response.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // --- Check for existing user ---
    // We don't want two accounts with the same email
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: 'An account with this email already exists' },
        { status: 409 } // 409 = Conflict
      );
    }

    // --- Hash the password ---
    // The number 10 is the "salt rounds" — higher = more secure but slower.
    // 10 is the industry standard for most apps.
    const hashedPassword = await hash(password, 10);

    // --- Create the user ---
    const user = await db.user.create({
      data: { name: name || null, email, password: hashedPassword },
    });

    // Don't return the password hash in the response — security best practice
    return Response.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
};
