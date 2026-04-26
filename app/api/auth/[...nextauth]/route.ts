// app\api\auth\[...nextauth]\route.ts

import { handlers } from '@/lib/auth';

// Ref: https://authjs.dev/getting-started/installation?framework=pnpm#configure
export const { GET, POST } = handlers;
