// Path: app\(auth)\register\page.tsx

// 'use client' is required here because we use:
// - useState (React hook — only works client-side)
// - Form submission handler (event listener — client-side)
// - useRouter for navigation after registration

'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passowrd, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // useRouter lets us redirect the user after successful registration
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(''); // clear any previous error

    try {
      await axios.post('/api/register', { name, email, passowrd });
      toast.success('Registered successfully');

      // Success! Redirect to login page so the user can sign in
      router.push('/login');
    } catch (err) {
      // axios throws an AxiosError for any non-2xx response (400, 409, 500, etc.)
      // We cast it so TypeScript knows the shape of the error.
      const error = err as AxiosError<{ error: string }>;

      // error.response: The object containing the response from the server
      // error.response.data: The actual body of the response
      // error.response.data.error: The specific key where I stored error message in Next.js API route
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        // This catches network errors (e.g. no internet, server down)
        setError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      // Always turn off loading spinner, whether success or failure
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your detail below to get started
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Name - optional */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email - required */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password - required */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              value={passowrd}
              placeholder="Minimum 6 characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-5">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creacting account' : 'Create account'}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterPage;
