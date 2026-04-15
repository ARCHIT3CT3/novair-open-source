# ✅ Checklist Pré-Déploiement - Novair

Utilisez cette checklist pour vous assurer que tout est prêt avant de déployer votre site sur OVH.

---

## 📋 Avant de Commencer

### Environnement de Développement

- [ ] Node.js version 18 ou supérieure installé
- [ ] npm ou pnpm installé et fonctionnel
- [ ] Toutes les dépendances installées (`npm install`)
- [ ] Aucune erreur dans la console de développement
- [ ] Le site fonctionne en local (`npm run dev`)

### Accès OVH

- [ ] Compte OVH actif et accessible
- [ ] Identifiants FTP/SFTP disponibles
- [ ] Nom de domaine configuré
- [ ] FileZilla (ou autre client FTP) installé et configuré

---

## 🎨 Contenu et Design

### Textes et Contenu

- [ ] Tous les textes sont corrects (orthographe, grammaire)
- [ ] Pas de "Lorem Ipsum" ou texte de placeholder
- [ ] Les coordonnées de contact sont à jour
- [ ] Les liens externes fonctionnent
- [ ] Les mentions légales sont présentes (si nécessaire)

### Images et Médias

- [ ] Toutes les images sont optimisées (< 500KB)
- [ ] Les images ont des attributs `alt` descriptifs
- [ ] Les images sont au format WebP (ou fallback disponible)
- [ ] Logo et favicon sont présents dans `/public`
- [ ] Pas d'images de test ou de placeholder

### Design

- [ ] Le site est responsive sur mobile (320px à 768px)
- [ ] Le site est responsive sur tablette (768px à 1024px)
- [ ] Le site est responsive sur desktop (1024px+)
- [ ] Les couleurs respectent la charte graphique
- [ ] Les polices s'affichent correctement
- [ ] Pas d'éléments qui débordent

---

## ⚡ Fonctionnalités

### Navigation

- [ ] Le menu de navigation s'affiche correctement
- [ ] Les liens du menu fonctionnent (smooth scroll)
- [ ] Le menu mobile s'ouvre et se ferme
- [ ] Le scroll vers les sections fonctionne
- [ ] Le logo ramène à l'accueil
- [ ] Pas d'erreur 404 sur les liens internes

### Animations

- [ ] Les animations Framer Motion fonctionnent
- [ ] Pas de lag ou de ralentissement
- [ ] Les animations ne perturbent pas la lecture
- [ ] Les particules s'affichent dans le Hero
- [ ] Les hover effects fonctionnent

### Formulaires (si applicable)

- [ ] Le formulaire de contact fonctionne
- [ ] La validation des champs fonctionne
- [ ] Les messages d'erreur s'affichent
- [ ] La confirmation d'envoi s'affiche
- [ ] Protection anti-spam en place

### Sections

- [ ] Section Hero : affichage et animations OK
- [ ] Section Histoire : contenu et animations OK
- [ ] Section Mission : contenu et animations OK
- [ ] Section Comment ça marche : contenu OK
- [ ] Section Équipe : photos et informations OK
- [ ] Section Impact : statistiques à jour
- [ ] Section Contact : formulaire fonctionnel
- [ ] Footer : liens et informations OK

---

## 🔧 Technique

### Configuration Next.js

- [ ] `next.config.mjs` configuré pour l'export statique (`output: "export"`)
- [ ] `images: { unoptimized: true }` activé
- [ ] Pas de fonctionnalités serveur incompatibles (API routes, ISR, etc.)
- [ ] TypeScript configuré correctement

### Build et Export

- [ ] `npm run build` s'exécute sans erreur
- [ ] Le dossier `out` est créé après le build
- [ ] `out/index.html` existe et contient le code
- [ ] Le dossier `out/_next` contient les assets
- [ ] Le fichier `.htaccess` est présent dans `out`
- [ ] Taille totale du dossier `out` < 50MB

### Fichiers Statiques

- [ ] Tous les fichiers du dossier `public` sont copiés
- [ ] Les icônes (favicon, apple-touch-icon) sont présentes
- [ ] Le fichier `robots.txt` est présent (si nécessaire)
- [ ] Le fichier `sitemap.xml` est présent (si nécessaire)

---

## 🌐 SEO et Métadonnées

### Balises Meta

- [ ] Titre de la page défini (`<title>`)
- [ ] Meta description présente
- [ ] Open Graph tags pour les réseaux sociaux
- [ ] Twitter Card tags
- [ ] Canonical URL définie
- [ ] Language tag (`lang="fr"`)

### Contenu SEO

- [ ] Structure des titres cohérente (H1, H2, H3)
- [ ] URLs propres et descriptives
- [ ] Texte alternatif sur toutes les images
- [ ] Pas de contenu dupliqué
- [ ] Vitesse de chargement < 3 secondes

### Fichiers SEO

- [ ] `robots.txt` configuré
- [ ] `sitemap.xml` généré
- [ ] Pas de pages bloquées par robots.txt

---

## 🔒 Sécurité

### Configuration Serveur

- [ ] Fichier `.htaccess` présent et testé
- [ ] Headers de sécurité configurés
- [ ] Protection XSS activée
- [ ] Protection Clickjacking activée
- [ ] MIME sniffing désactivé

### Contenu

- [ ] Pas de clés API exposées dans le code
- [ ] Pas de mots de passe en clair
- [ ] Pas d'informations sensibles dans le code source
- [ ] Variables d'environnement sécurisées

### HTTPS (Recommandé)

- [ ] Certificat SSL activé sur OVH
- [ ] Redirection HTTP → HTTPS configurée
- [ ] Liens internes en HTTPS
- [ ] Ressources externes en HTTPS

---

## 📊 Performance

### Tests de Performance

- [ ] Google PageSpeed Insights : Score > 80
- [ ] GTmetrix : Grade B ou supérieur
- [ ] Temps de chargement < 3 secondes
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

### Optimisations

- [ ] Images optimisées et compressées
- [ ] CSS minifié
- [ ] JavaScript minifié
- [ ] Compression GZIP activée (`.htaccess`)
- [ ] Cache navigateur configuré
- [ ] Lazy loading des images

---

## 🧪 Tests Cross-Browser

### Navigateurs Desktop

- [ ] Google Chrome (dernière version)
- [ ] Mozilla Firefox (dernière version)
- [ ] Microsoft Edge (dernière version)
- [ ] Safari (si Mac disponible)

### Navigateurs Mobile

- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

### Résolutions Testées

- [ ] Mobile : 375x667 (iPhone SE)
- [ ] Mobile : 390x844 (iPhone 12/13/14)
- [ ] Tablet : 768x1024 (iPad)
- [ ] Desktop : 1920x1080 (Full HD)
- [ ] Desktop : 1366x768 (Laptop)

---

## 📱 Accessibilité

### WCAG 2.1 Niveau AA

- [ ] Contraste des couleurs suffisant (4.5:1 minimum)
- [ ] Textes redimensionnables
- [ ] Navigation au clavier fonctionnelle
- [ ] Attributs ARIA présents si nécessaire
- [ ] Pas de clignotements (épilepsie)

### Lecteurs d'écran

- [ ] Tous les éléments interactifs sont accessibles
- [ ] Images décoratives ont `alt=""` ou `aria-hidden`
- [ ] Titres de sections présents
- [ ] Landmarks HTML5 utilisés (nav, main, footer)

---

## 🚀 Déploiement

### Préparation FTP

- [ ] FileZilla configuré avec les bons identifiants
- [ ] Connexion au serveur OVH testée
- [ ] Dossier de destination identifié (`www` ou `public_html`)
- [ ] Sauvegarde de l'ancien site (si existe)

### Transfert

- [ ] Mode de transfert : Binaire (recommandé)
- [ ] Tous les fichiers du dossier `out` sélectionnés
- [ ] Transfert lancé
- [ ] Attendre la fin du transfert (100%)
- [ ] Vérifier qu'aucun fichier n'a échoué

### Post-Déploiement

- [ ] Site accessible via le domaine
- [ ] Toutes les pages se chargent
- [ ] Aucune erreur 404
- [ ] Images s'affichent correctement
- [ ] CSS appliqué correctement
- [ ] JavaScript fonctionne
- [ ] Animations Framer Motion actives

---

## 🔍 Vérification Finale

### Test Rapide

1. [ ] Ouvrir le site dans un navigateur privé
2. [ ] Tester la navigation dans le menu
3. [ ] Scroller sur toute la page
4. [ ] Tester sur mobile (DevTools ou appareil réel)
5. [ ] Vérifier le formulaire de contact
6. [ ] Tester les boutons CTA
7. [ ] Vérifier les liens externes
8. [ ] Tester la page 404 (taper une URL invalide)

### Outils de Vérification

- [ ] [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [GTmetrix](https://gtmetrix.com/)
- [ ] [Google Search Console](https://search.google.com/search-console)
- [ ] [W3C Validator](https://validator.w3.org/)
- [ ] [WAVE Accessibility](https://wave.webaim.org/)

---

## 📝 Documentation

### Fichiers de Documentation

- [ ] `README.md` à jour
- [ ] `DEPLOIEMENT_OVH.md` disponible
- [ ] `OPTIMISATION_ASSETS.md` disponible
- [ ] Commentaires dans le code si nécessaire

### Informations à Conserver

- [ ] URL du site en production
- [ ] Identifiants FTP sauvegardés (coffre-fort)
- [ ] Date du déploiement
- [ ] Version du projet
- [ ] Contacts techniques (OVH, développeurs)

---

## 🎉 Après le Déploiement

### Communication

- [ ] Informer l'équipe du déploiement
- [ ] Partager l'URL avec les parties prenantes
- [ ] Annoncer sur les réseaux sociaux (si applicable)

### Monitoring

- [ ] Configurer Google Analytics (si souhaité)
- [ ] Vérifier les logs d'erreur (OVH)
- [ ] Surveiller le trafic les premiers jours
- [ ] Collecter les retours utilisateurs

### Maintenance

- [ ] Planifier des sauvegardes régulières
- [ ] Programmer des mises à jour de sécurité
- [ ] Renouveler le certificat SSL (si nécessaire)
- [ ] Vérifier les performances mensuellement

---

## 🆘 En Cas de Problème

### Le site ne s'affiche pas

1. Vérifier que tous les fichiers sont transférés
2. Vérifier les permissions (644 pour fichiers, 755 pour dossiers)
3. Vérifier que `index.html` est à la racine
4. Contacter le support OVH

### Les styles ne s'appliquent pas

1. Vider le cache du navigateur (Ctrl+Shift+Delete)
2. Vérifier que le dossier `_next` est transféré
3. Vérifier les chemins dans le code
4. Vérifier le fichier `.htaccess`

### Erreur 500

1. Vérifier le fichier `.htaccess`
2. Commenter les directives une par une
3. Vérifier les logs d'erreur OVH
4. Contacter le support OVH

---

## 📞 Contacts Utiles

### Support OVH
- **Téléphone** : 1007 (depuis la France)
- **Email** : Via l'espace client
- **Doc** : https://docs.ovh.com/

### Support Technique Novair
- **Email** : contact@novair.fr
- **Documentation** : Voir les fichiers MD du projet

---

## ✅ Validation Finale

Une fois TOUS les points cochés :

- [ ] **Le site est prêt pour le déploiement**
- [ ] **J'ai fait une sauvegarde de tout**
- [ ] **J'ai les identifiants OVH sous la main**
- [ ] **Je suis prêt à dépanner si besoin**
- [ ] **L'équipe est informée**

---

**Signature du déploiement :**

- Date : _______________
- Déployé par : _______________
- URL : _______________
- Version : _______________

---

**Bon déploiement ! 🚀**

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**