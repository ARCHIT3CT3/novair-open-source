# 🎨 Guide d'Optimisation des Assets - Novair

Ce guide vous explique comment optimiser tous vos assets (images, polices, icônes, etc.) pour améliorer les performances de votre site Novair.

---

## 📸 Optimisation des Images

### Pourquoi optimiser les images ?

- ✅ Temps de chargement plus rapide
- ✅ Meilleure expérience utilisateur
- ✅ Moins de bande passante utilisée
- ✅ Meilleur référencement SEO
- ✅ Réduction des coûts d'hébergement

### Formats d'images recommandés

| Format | Usage | Avantages |
|--------|-------|-----------|
| **WebP** | Photos, illustrations | 30% plus léger que JPEG, supporte la transparence |
| **AVIF** | Photos modernes | 50% plus léger que JPEG, qualité supérieure |
| **SVG** | Logos, icônes, illustrations vectorielles | Scalable, petit, modifiable |
| **PNG** | Images avec transparence (fallback) | Bonne qualité, transparence |
| **JPEG** | Photos (fallback) | Bonne compression pour les photos |

### Tailles d'images recommandées

```
Hero section : 1920x1080px (Full HD)
Images de contenu : 1200x800px
Thumbnails : 400x300px
Avatars équipe : 300x300px
Icônes : 64x64px ou SVG
Logo : SVG (scalable)
```

---

## 🛠️ Outils d'Optimisation

### 1. Outils en ligne (Gratuits)

#### **TinyPNG / TinyJPG**
- URL : https://tinypng.com/
- Compression jusqu'à 70%
- Supporte PNG et JPEG
- Gratuit jusqu'à 20 images

#### **Squoosh**
- URL : https://squoosh.app/
- Développé par Google
- Conversion WebP, AVIF
- Comparaison avant/après
- 100% gratuit

#### **Compressor.io**
- URL : https://compressor.io/
- Compression jusqu'à 90%
- Supporte JPEG, PNG, GIF, SVG
- Gratuit

#### **SVGOMG**
- URL : https://jakearchibald.github.io/svgomg/
- Optimisation SVG
- Réduction jusqu'à 80%
- Options avancées

### 2. Outils de ligne de commande

#### **ImageMagick**
```bash
# Installation
# Windows : https://imagemagick.org/script/download.php
# Mac : brew install imagemagick
# Linux : sudo apt-get install imagemagick

# Redimensionner une image
magick input.jpg -resize 1200x800 output.jpg

# Convertir en WebP
magick input.jpg -quality 85 output.webp

# Compression JPEG
magick input.jpg -quality 85 -strip output.jpg
```

#### **cwebp (Google)**
```bash
# Installation
# https://developers.google.com/speed/webp/download

# Convertir en WebP
cwebp -q 85 input.jpg -o output.webp

# Batch conversion
for img in *.jpg; do cwebp -q 85 "$img" -o "${img%.jpg}.webp"; done
```

#### **Sharp (Node.js)**
```bash
# Installation
npm install -g sharp-cli

# Redimensionner
sharp -i input.jpg -o output.jpg resize 1200 800

# Convertir en WebP
sharp -i input.jpg -o output.webp --webp
```

### 3. Outils automatisés (Recommandé)

#### **Script Node.js pour optimisation automatique**

Créez un fichier `optimize-images.js` :

```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

async function optimizeImages() {
  const files = await fs.readdir(inputDir);
  
  await fs.mkdir(outputDir, { recursive: true });
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(ext, '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ ${file} → ${path.basename(outputPath)}`);
    }
  }
  
  console.log('✓ Optimisation terminée!');
}

optimizeImages().catch(console.error);
```

```bash
# Utilisation
npm install sharp
node optimize-images.js
```

---

## 📝 Guide Pratique

### Étape 1 : Préparer vos images

1. **Collectez toutes vos images** dans un dossier
2. **Renommez-les** avec des noms descriptifs :
   ```
   ❌ IMG_1234.jpg
   ✅ hero-novair-telephone.jpg
   
   ❌ photo.png
   ✅ team-membre-marie.png
   ```

### Étape 2 : Redimensionner

1. Ouvrez https://squoosh.app/
2. Glissez-déposez votre image
3. Ajustez la taille selon l'usage :
   - Hero : 1920x1080px
   - Contenu : 1200x800px
   - Thumbnail : 400x300px

### Étape 3 : Convertir en WebP

1. Dans Squoosh, sélectionnez **WebP** dans le menu de droite
2. Ajustez la qualité à **85** (bon compromis)
3. Comparez avec l'original
4. Téléchargez l'image optimisée

### Étape 4 : Créer des versions responsives

Pour chaque image importante, créez 3 versions :

```
hero-image.webp           (1920x1080px - Desktop)
hero-image-tablet.webp    (1024x576px - Tablet)
hero-image-mobile.webp    (768x432px - Mobile)
```

### Étape 5 : Implémenter dans le code

#### Méthode 1 : Image simple avec Next.js

```tsx
import Image from 'next/image'

export function MyComponent() {
  return (
    <Image
      src="/images/hero-image.webp"
      alt="Description de l'image"
      width={1920}
      height={1080}
      priority // Pour les images au-dessus de la ligne de flottaison
      quality={85}
    />
  )
}
```

#### Méthode 2 : Image responsive avec srcset

```tsx
export function ResponsiveImage() {
  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet="/images/hero-image.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/images/hero-image-tablet.webp"
        type="image/webp"
      />
      <source
        srcSet="/images/hero-image-mobile.webp"
        type="image/webp"
      />
      <img
        src="/images/hero-image.jpg"
        alt="Description"
        loading="lazy"
      />
    </picture>
  )
}
```

#### Méthode 3 : Background image avec CSS

```css
.hero {
  background-image: url('/images/hero-image-mobile.webp');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('/images/hero-image-tablet.webp');
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url('/images/hero-image.webp');
  }
}
```

---

## 🔤 Optimisation des Polices

### Polices actuelles du projet

Le projet utilise Google Fonts :
- **Inter** : Police sans-serif moderne
- **Playfair Display** : Police serif élégante

### Optimisations automatiques de Next.js

Next.js optimise déjà les polices Google Fonts :
- ✅ Auto-hébergement (pas de requête externe)
- ✅ Préchargement
- ✅ Sous-setting automatique
- ✅ Font display: swap

### Best practices

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

// Optimiser en limitant les styles chargés
const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'], // Seulement les poids utilisés
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Seulement les poids utilisés
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});
```

---

## 🎯 Optimisation des Icônes

### Utiliser Lucide React (Déjà installé)

```tsx
import { Phone, Heart, Shield } from 'lucide-react'

export function Icons() {
  return (
    <div>
      {/* Petite icône */}
      <Phone className="w-4 h-4" />
      
      {/* Moyenne icône */}
      <Heart className="w-6 h-6" />
      
      {/* Grande icône */}
      <Shield className="w-8 h-8" />
    </div>
  )
}
```

### Avantages de Lucide :
- ✅ Icônes vectorielles (SVG)
- ✅ Personnalisables avec CSS
- ✅ Légères (tree-shaking)
- ✅ Consistantes
- ✅ Accessibles

---

## 🚀 Lazy Loading

### Images lazy load automatique

Next.js active le lazy loading par défaut pour toutes les images sauf celles avec `priority`.

```tsx
// Chargement prioritaire (au-dessus de la ligne de flottaison)
<Image src="/hero.webp" priority />

// Lazy loading automatique (en-dessous de la ligne de flottaison)
<Image src="/content.webp" />
```

### Lazy loading personnalisé avec Intersection Observer

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt={alt}
      loading="lazy"
    />
  )
}
```

---

## 📊 Checklist d'Optimisation

### Avant le déploiement

- [ ] Toutes les images sont au format WebP ou AVIF
- [ ] Les images ont des tailles appropriées
- [ ] Chaque image a un `alt` descriptif
- [ ] Les images au-dessus de la ligne de flottaison ont `priority`
- [ ] Les images en-dessous utilisent le lazy loading
- [ ] Les polices sont optimisées (poids limités)
- [ ] Les icônes utilisent Lucide React (SVG)
- [ ] Aucune image > 500KB
- [ ] Les images responsive ont plusieurs versions

### Tester les performances

1. **Google PageSpeed Insights**
   - URL : https://pagespeed.web.dev/
   - Score cible : > 90

2. **GTmetrix**
   - URL : https://gtmetrix.com/
   - Grade cible : A

3. **WebPageTest**
   - URL : https://www.webpagetest.org/
   - LCP < 2.5s

---

## 🎯 Objectifs de Performance

| Métrique | Objectif | Excellent |
|----------|----------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 1.5s |
| **FID** (First Input Delay) | < 100ms | < 50ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| **Taille totale de la page** | < 2MB | < 1MB |
| **Nombre de requêtes** | < 50 | < 30 |

---

## 💡 Conseils Avancés

### 1. Placeholder Blurred

Créez des placeholders flous pour une meilleure expérience :

```tsx
import Image from 'next/image'

export function BlurredImage() {
  return (
    <Image
      src="/image.webp"
      alt="Description"
      width={1200}
      height={800}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Généré automatiquement
    />
  )
}
```

### 2. Sprites SVG

Regroupez vos icônes SVG dans un sprite :

```xml
<!-- sprites.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-phone" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
  <symbol id="icon-heart" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
</svg>
```

### 3. CDN pour les assets

Si vous avez beaucoup d'images, utilisez un CDN :
- Cloudflare (Gratuit)
- Cloudinary (Gratuit jusqu'à 25GB)
- imgix (Payant, très performant)

---

## 📞 Support

Pour toute question sur l'optimisation des assets :
- Consultez la documentation Next.js : https://nextjs.org/docs/app/building-your-application/optimizing/images
- Documentation Sharp : https://sharp.pixelplumbing.com/

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**