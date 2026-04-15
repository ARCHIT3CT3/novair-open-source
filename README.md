# 🌟 Novair - Donner une seconde vie aux téléphones pour sauver des vies

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.36.0-ff0055?style=flat-square&logo=framer)

**Projet solidaire développé par les élèves du Lycée Élisa Lemonnier**

Novair est une initiative qui récupère et répare des téléphones pour les donner aux personnes sans-abri, leur permettant d'appeler les secours en cas d'urgence.

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Développement](#développement)
- [Build et Déploiement](#build-et-déploiement)
- [Structure du projet](#structure-du-projet)
- [Déploiement sur OVH](#déploiement-sur-ovh)
- [Contribution](#contribution)
- [License](#license)

---

## 🎯 Aperçu

Ce site web présente le projet Novair, une association qui collecte des téléphones usagés, les répare et les distribue aux personnes dans le besoin. Le site comprend :

- Une page d'accueil avec animations fluides
- Des sections détaillant notre histoire et notre mission
- Une présentation de notre équipe
- Un formulaire de contact
- Une navigation smooth scroll optimisée
- Design responsive et accessible

---

## ✨ Fonctionnalités

- ✅ **Animations avancées** avec Framer Motion
- ✅ **Design moderne** avec Tailwind CSS 4
- ✅ **Navigation fluide** avec smooth scroll
- ✅ **100% Responsive** - Mobile, Tablet, Desktop
- ✅ **Optimisé pour les performances**
- ✅ **Export statique** pour hébergement sur OVH
- ✅ **SEO optimisé**
- ✅ **TypeScript** pour la sécurité du code
- ✅ **Accessibilité** (WCAG 2.1)

---

## 🛠 Technologies

### Frontend
- **[Next.js 16](https://nextjs.org/)** - Framework React avec export statique
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Framer Motion](https://www.framer.com/motion/)** - Animations fluides et performantes

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Composants accessibles
- **[Lucide React](https://lucide.dev/)** - Icônes modernes
- **[Shadcn/ui](https://ui.shadcn.com/)** - Composants réutilisables

### Outils de développement
- **[ESLint](https://eslint.org/)** - Linting JavaScript/TypeScript
- **[PostCSS](https://postcss.org/)** - Transformation CSS
- **pnpm** - Gestionnaire de paquets rapide

---

## 📦 Installation

### Prérequis

- Node.js 18 ou supérieur ([Télécharger](https://nodejs.org/))
- npm, pnpm ou yarn
- Un éditeur de code (VS Code recommandé)

### Étapes d'installation

1. **Cloner le repository** (ou télécharger les fichiers)
   ```bash
   git clone https://github.com/votre-repo/novair.git
   cd "novair main"
   ```

2. **Installer les dépendances**
   ```bash
   # Avec pnpm (recommandé)
   pnpm install

   # Ou avec npm
   npm install

   # Ou avec yarn
   yarn install
   ```

3. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

4. **Ouvrir le navigateur**
   
   Accédez à [http://localhost:3000](http://localhost:3000)

---

## 💻 Développement

### Commandes disponibles

```bash
# Lancer le serveur de développement
pnpm dev

# Builder le projet pour la production
pnpm build

# Builder et préparer pour le déploiement
pnpm deploy

# Nettoyer les builds
pnpm clean

# Prévisualiser le build de production
pnpm preview

# Linter le code
pnpm lint
```

### Structure des commandes

- `dev` : Démarre le serveur de développement avec hot-reload
- `build` : Crée un build optimisé et l'exporte en statique
- `export` : Alias pour `build`
- `deploy` : Nettoie et build le projet
- `clean` : Supprime les dossiers `out` et `.next`
- `preview` : Prévisualise le build avec un serveur local

---

## 🚀 Build et Déploiement

### Build pour la production

```bash
# Windows (PowerShell)
.\deploy.ps1

# Ou manuellement
pnpm deploy
```

Le script `deploy.ps1` automatise :
- ✅ Vérification de Node.js
- ✅ Installation des dépendances
- ✅ Nettoyage des anciens builds
- ✅ Build optimisé du projet
- ✅ Copie du fichier `.htaccess`
- ✅ Vérification du résultat

Après le build, tous les fichiers sont dans le dossier `out/`.

---

## 📁 Structure du projet

```
novair main/
├── app/                      # Pages Next.js
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   └── not-found.tsx        # Page 404
│
├── components/              # Composants React
│   ├── ui/                  # Composants UI de base (Shadcn)
│   ├── header.tsx           # En-tête avec navigation
│   ├── hero.tsx             # Section héro
│   ├── story.tsx            # Section histoire
│   ├── mission.tsx          # Section mission
│   ├── how-it-works.tsx     # Section fonctionnement
│   ├── team.tsx             # Section équipe
│   ├── impact.tsx           # Section impact
│   ├── contact.tsx          # Section contact
│   └── footer.tsx           # Pied de page
│
├── hooks/                   # Hooks personnalisés
│   └── use-smooth-scroll.ts # Hook pour smooth scroll
│
├── lib/                     # Utilitaires
│   └── utils.ts             # Fonctions utilitaires
│
├── public/                  # Fichiers statiques
│   ├── .htaccess            # Configuration Apache pour OVH
│   └── [images, icons...]   # Assets statiques
│
├── styles/                  # Styles additionnels
│
├── next.config.mjs          # Configuration Next.js
├── tailwind.config.ts       # Configuration Tailwind CSS
├── tsconfig.json            # Configuration TypeScript
├── package.json             # Dépendances et scripts
├── deploy.ps1               # Script de build automatisé
├── DEPLOIEMENT_OVH.md       # Guide de déploiement OVH
└── README.md                # Ce fichier
```

---

## 🌐 Déploiement sur OVH

### Guide complet

Consultez le fichier **[DEPLOIEMENT_OVH.md](./DEPLOIEMENT_OVH.md)** pour un guide détaillé étape par étape.

### Résumé rapide

1. **Builder le projet**
   ```bash
   .\deploy.ps1
   ```

2. **Ouvrir FileZilla** et se connecter à votre serveur OVH

3. **Transférer le contenu du dossier `out/`** vers `www/` ou `public_html/` sur le serveur

4. **Vérifier** que le fichier `.htaccess` est bien présent

5. **Tester** votre site sur votre domaine

### Configuration OVH requise

- Hébergement web OVH (mutualisé ou VPS)
- Accès FTP actif
- Certificat SSL (Let's Encrypt gratuit)

---

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `app/globals.css` avec le système de variables CSS :

```css
:root {
  --primary: oklch(0.65 0.18 145);    /* Vert principal */
  --accent: oklch(0.55 0.12 30);      /* Orange accent */
  --background: oklch(0.08 0 0);      /* Noir de fond */
  --foreground: oklch(0.98 0 0);      /* Blanc de texte */
}
```

### Animations

Les animations sont configurées dans les composants avec Framer Motion :

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Votre contenu */}
</motion.div>
```

### Navigation

Le smooth scroll est géré automatiquement. Pour ajouter une nouvelle section :

1. Ajoutez un `id` à votre section dans `app/page.tsx`
2. Ajoutez le lien dans `components/header.tsx`

---

## 🐛 Dépannage

### Le build échoue

```bash
# Nettoyer et réinstaller
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

### Les animations ne fonctionnent pas

- Vérifiez que Framer Motion est installé
- Vérifiez que les composants ont `"use client"` en haut du fichier

### Les styles ne s'appliquent pas

- Videz le cache du navigateur (Ctrl+Shift+Delete)
- Vérifiez que Tailwind CSS est correctement configuré
- Relancez le serveur de développement

### Erreur de TypeScript

```bash
# Vérifier les erreurs
pnpm run type-check

# Ignorer temporairement (non recommandé)
# Déjà configuré dans next.config.mjs
```

---

## 📊 Performances

Le site est optimisé pour des performances maximales :

- ⚡ Score Lighthouse > 90
- 🎨 First Contentful Paint < 1.5s
- 📦 Taille du bundle optimisée
- 🖼️ Images optimisées et lazy-loaded
- 🗜️ Compression GZIP activée
- 📱 Mobile-first approach

---

## 🤝 Contribution

Ce projet est développé par les élèves du Lycée Élisa Lemonnier.

### Comment contribuer

1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Créez une Pull Request

### Guidelines

- Respecter la structure du projet
- Écrire du code TypeScript typé
- Utiliser des composants réutilisables
- Tester sur mobile et desktop
- Commenter le code complexe

---

## 📄 License

Ce projet est développé dans un cadre éducatif au Lycée Élisa Lemonnier.

---

## 📞 Contact

- **Email** : contact@novair.fr
- **Site web** : [www.novair.fr](https://www.novair.fr)
- **Lycée Élisa Lemonnier** : [Site officiel](https://lyc-elisa-lemonnier.fr/)

---

## 🙏 Remerciements

- **Next.js** pour le framework performant
- **Vercel** pour les outils de développement
- **Framer Motion** pour les animations fluides
- **Tailwind CSS** pour le système de design
- **Radix UI** pour les composants accessibles
- **Shadcn** pour les composants UI
- **Lycée Élisa Lemonnier** pour le support du projet

---

## 📝 Changelog

### Version 1.0.0 (2026)
- ✅ Page d'accueil avec animations
- ✅ Navigation smooth scroll
- ✅ Sections : Histoire, Mission, Équipe, Impact, Contact
- ✅ Design responsive
- ✅ Export statique pour OVH
- ✅ Page 404 personnalisée
- ✅ Optimisations performances
- ✅ Configuration Apache (.htaccess)

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**

🌟 Si ce projet vous plaît, n'hésitez pas à le partager ! 🌟