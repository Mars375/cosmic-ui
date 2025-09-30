'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Une erreur s'est produite</h1>
        <p className="text-muted-foreground mb-4">
          Désolé, une erreur inattendue s'est produite.
        </p>
        <button
          onClick={reset}
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
