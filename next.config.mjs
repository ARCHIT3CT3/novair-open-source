/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique pour hébergement OVH
  output: "export",

  // Ignorer les erreurs TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Désactiver l'optimisation des images (requis pour export statique)
  images: {
    unoptimized: true,
  },

  // Ajouter un trailing slash aux URLs
  trailingSlash: true,

  // Optionnel: Si votre site est dans un sous-dossier sur OVH
  // Décommentez et ajustez selon votre configuration
  // basePath: '/novair',

};

export default nextConfig;
