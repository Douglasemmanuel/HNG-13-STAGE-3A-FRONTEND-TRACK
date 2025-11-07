'use client';

import { ConvexProvider } from 'convex/react';
import convex from './lib/convexClient';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
