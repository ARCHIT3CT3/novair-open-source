# 🚀 Démarrage Rapide - Novair

**Guide express pour lancer le projet en 5 minutes !**

---

## 📖 Vue d'Ensemble

Novair est un site web moderne développé avec :
- **React 19** + **Next.js 16**
- **TypeScript** pour la sécurité du code
- **Tailwind CSS 4** pour le design
- **Framer Motion** pour les animations fluides

Export statique prêt pour OVH ! 🎉

---

## ⚡ Installation (3 minutes)

### 1️⃣ Vérifier les prérequis

Vérifiez que Node.js est installé :

```bash
node --version
```

Si la commande échoue, installez Node.js : https://nodejs.org/ (version 18+)

### 2️⃣ Installer les dépendances

Ouvrez un terminal dans le dossier du projet :

```bash
cd "D:\film\novair main"

# Avec pnpm (recommandé - plus rapide)
pnpm install

# OU avec npm
npm install
```

⏱️ Comptez 1-2 minutes pour l'installation.

### 3️⃣ Lancer le serveur

```bash
# Avec pnpm
pnpm dev

# OU avec npm
npm run dev
```

✅ **C'est prêt !** Ouvrez http://localhost:3000 dans votre navigateur.

---

## 💻 Développement

### Structure du projet

```
novair main/
├── app/              ← Pages Next.js (layout, page principale)
├── components/       ← Composants React (header, hero, sections...)
├── hooks/            ← Hooks personnalisés (smooth scroll)
├── public/           ← Images, icônes, .htaccess
└── styles/           ← Styles additionnels
```

### Modifier le contenu

| Fichier | Description |
|---------|-------------|
| `app/page.tsx` | Page principale avec toutes les sections |
| `components/header.tsx` | Menu de navigation |
| `components/hero.tsx` | Section d'accueil avec animations |
| `components/story.tsx` | Section "Notre Histoire" |
| `components/mission.tsx` | Section "Notre Mission" |
| `components/team.tsx` | Section "Notre Équipe" |
| `components/contact.tsx` | Formulaire de contact |

### Commandes utiles

```bash
# Lancer le serveur de développement
pnpm dev

# Vérifier les erreurs TypeScript
pnpm type-check

# Linter le code
pnpm lint
```

### Hot Reload

Le serveur de développement se recharge automatiquement quand vous modifiez un fichier ! 🔥

---

## 🏗️ Build pour Production

### Option 1 : Script automatisé (Windows)

```powershell
.\deploy.ps1
```

Le script fait tout pour vous :
- ✅ Vérifie Node.js
- ✅ Installe les dépendances
- ✅ Nettoie les anciens builds
- ✅ Build le projet
- ✅ Copie le .htaccess
- ✅ Vérifie le résultat

### Option 2 : Manuellement

```bash
# Avec pnpm
pnpm clean      # Nettoyer
pnpm build      # Builder

# OU avec npm
npm run clean
npm run build
```

### Résultat

Tous les fichiers prêts à déployer sont dans le dossier **`out/`** ! 📦

---

## 🌐 Déploiement sur OVH

### En 5 étapes

1. **Builder le projet** (voir ci-dessus) ✅

2. **Ouvrir FileZilla**
   - Télécharger : https://filezilla-project.org/

3. **Se connecter au serveur OVH**
   - Hôte : `ftp.votre-domaine.com`
   - Port : `21`
   - Identifiant et mot de passe OVH

4. **Transférer les fichiers**
   - Local (gauche) : Aller dans `novair main/out`
   - Serveur (droite) : Aller dans `www` ou `public_html`
   - Sélectionner TOUT dans `out` → Glisser-déposer vers le serveur

5. **Tester**
   - Aller sur `http://votre-domaine.com`
   - Vérifier que tout fonctionne ! 🎉

### Temps estimé

- Build : 2-3 minutes
- Transfert : 5-15 minutes (selon votre connexion)
- **Total : ~20 minutes**

---

## 📚 Documentation Complète

### Guides Disponibles

| Guide | Description |
|-------|-------------|
| **README.md** | Documentation complète du projet |
| **DEPLOIEMENT_OVH.md** | Guide détaillé du déploiement (30+ pages) |
| **OPTIMISATION_ASSETS.md** | Guide d'optimisation des images et assets |
| **PRE_DEPLOIEMENT_CHECKLIST.md** | Checklist avant déploiement |

### Liens Utiles

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Documentation OVH](https://docs.ovh.com/)

---

## 🆘 Problèmes Courants

### Le serveur ne démarre pas

```bash
# Réinstaller les dépendances
rm -rf node_modules
pnpm install
pnpm dev
```

### Erreur de build

```bash
# Nettoyer et rebuilder
pnpm clean
pnpm build
```

### Les animations ne fonctionnent pas

- Vérifier que `"use client"` est en haut des composants
- Vérifier que Framer Motion est installé
- Vider le cache : Ctrl + Shift + Delete

### Le site est lent

- Optimiser les images (voir `OPTIMISATION_ASSETS.md`)
- Vérifier la taille du bundle
- Tester avec PageSpeed Insights

---

## ✨ Fonctionnalités Clés

### Déjà Implémentées

- ✅ **Smooth Scroll** : Navigation fluide entre sections
- ✅ **Animations Framer Motion** : Effets visuels modernes
- ✅ **Design Responsive** : Mobile, Tablet, Desktop
- ✅ **Page 404 Personnalisée** : Erreur avec style
- ✅ **Optimisation OVH** : .htaccess configuré
- ✅ **TypeScript** : Code typé et sécurisé
- ✅ **SEO Optimisé** : Métadonnées complètes

### Améliorations des Redirections

Le projet inclut maintenant :
- Navigation smooth scroll améliorée
- Hook personnalisé `useSmoothScroll`
- IDs de section pour l'ancrage
- Animations de menu améliorées
- Menu mobile avec transitions fluides

---

## 🎯 Prochaines Étapes

1. [ ] Personnaliser le contenu
2. [ ] Ajouter vos images optimisées
3. [ ] Tester en local
4. [ ] Builder pour production
5. [ ] Déployer sur OVH
6. [ ] Partager avec le monde ! 🌍

---

## 📞 Besoin d'Aide ?

- **Documentation complète** : Voir `README.md`
- **Guide de déploiement** : Voir `DEPLOIEMENT_OVH.md`
- **Support OVH** : 1007 (depuis la France)
- **Email** : contact@novair.fr

---

## 🎓 Apprendre Plus

### Tutoriels Recommandés

- [Next.js Tutorial](https://nextjs.org/learn) - Officiel
- [React Documentation](https://react.dev/learn) - Officiel
- [Tailwind CSS Playground](https://play.tailwindcss.com/) - Interactif
- [Framer Motion Examples](https://www.framer.com/motion/examples/) - Démonstrations

---

**Bon développement ! 💻✨**

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**

_Version 1.0 - Janvier 2024_