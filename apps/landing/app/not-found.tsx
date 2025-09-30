export default function NotFound() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-muted-foreground mb-4">
          La page que vous recherchez n'existe pas.
        </p>
        <a 
          href="/" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
