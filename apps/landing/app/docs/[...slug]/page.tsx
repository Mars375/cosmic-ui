'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsSlugRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirection...</h1>
        <p className="text-muted-foreground">
          La documentation est temporairement indisponible.
        </p>
      </div>
    </div>
  );
}
