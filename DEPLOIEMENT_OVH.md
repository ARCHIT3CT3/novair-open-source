# 🚀 Guide de Déploiement - Novair sur OVH

Ce guide vous explique comment déployer votre site Novair sur un hébergement OVH via FileZilla.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Un compte d'hébergement OVH actif
- ✅ Les identifiants FTP fournis par OVH (hôte, utilisateur, mot de passe)
- ✅ FileZilla installé sur votre ordinateur ([Télécharger ici](https://filezilla-project.org/))
- ✅ Node.js installé (version 18 ou supérieure)
- ✅ npm ou pnpm installé

---

## 🔨 Étape 1 : Préparation et Build du Projet

### 1.1 Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Si vous utilisez npm
npm install

# Si vous utilisez pnpm
pnpm install
```

### 1.2 Builder le projet pour la production

```bash
# Si vous utilisez npm
npm run deploy

# Si vous utilisez pnpm
pnpm deploy
```

Cette commande va :
- Nettoyer les anciens builds
- Créer un export statique du site dans le dossier `out`
- Optimiser tous les fichiers pour la production

⏱️ **Le build peut prendre 1-3 minutes selon votre machine.**

### 1.3 Vérifier le dossier `out`

Après le build, vérifiez que le dossier `out` contient :
- ✅ `index.html`
- ✅ Dossier `_next` (avec CSS, JS, images)
- ✅ Fichier `.htaccess` (dans le dossier `out`)
- ✅ Autres assets (images, icônes, etc.)

---

## 📤 Étape 2 : Configuration de FileZilla

### 2.1 Récupérer vos identifiants OVH

1. Connectez-vous à votre [espace client OVH](https://www.ovh.com/manager/)
2. Allez dans **Hébergements** → Sélectionnez votre hébergement
3. Cliquez sur l'onglet **FTP - SSH**
4. Notez les informations suivantes :
   - **Serveur FTP** : `ftp.votre-domaine.com` ou `ftp.clusterXXX.hosting.ovh.net`
   - **Login FTP** : votre identifiant (généralement votre domaine)
   - **Port** : `21` (FTP) ou `22` (SFTP)

> 💡 **Conseil** : Si vous ne trouvez pas votre mot de passe, vous pouvez le réinitialiser depuis l'espace client OVH.

### 2.2 Configurer FileZilla

1. **Ouvrez FileZilla**
2. Cliquez sur **Fichier** → **Gestionnaire de Sites**
3. Cliquez sur **Nouveau site** et nommez-le "Novair OVH"
4. Configurez les paramètres :

```
Protocole : FTP - File Transfer Protocol
Hôte : ftp.votre-domaine.com (ou celui fourni par OVH)
Port : 21
Chiffrement : Connexion FTP explicite sur TLS si disponible
Type d'authentification : Normale
Identifiant : votre-login-ftp
Mot de passe : votre-mot-de-passe
```

5. Cliquez sur **Connexion**

---

## 🌐 Étape 3 : Déploiement sur OVH

### 3.1 Se connecter au serveur

1. Sélectionnez votre site "Novair OVH" dans le Gestionnaire de Sites
2. Cliquez sur **Connexion**
3. Si c'est la première connexion, acceptez le certificat

### 3.2 Naviguer vers le bon dossier

Dans FileZilla, côté **Site distant** (à droite) :

- Naviguez vers le dossier `www` ou `public_html`
- C'est ici que vous allez télécharger vos fichiers

> ⚠️ **Important** : Le nom du dossier peut varier selon votre configuration OVH. Les noms courants sont :
> - `www`
> - `public_html`
> - Le nom de votre domaine

### 3.3 Nettoyer le dossier (optionnel)

Si c'est un nouveau déploiement et que le dossier contient des fichiers par défaut d'OVH :
1. Sélectionnez tous les fichiers du dossier distant
2. Clic droit → **Supprimer**

> ⚠️ **Attention** : Ne supprimez que si vous êtes sûr que ces fichiers ne sont pas importants !

### 3.4 Transférer les fichiers

1. **Côté local** (à gauche) : Naviguez vers votre dossier `novair main\out`
2. **Sélectionnez TOUT le contenu** du dossier `out` (Ctrl+A ou Cmd+A)
3. **Faites un glisser-déposer** vers le dossier distant (côté droit)
   
   OU
   
   Clic droit → **Envoyer**

⏱️ **Le transfert peut prendre 5-15 minutes selon la taille et votre connexion.**

### 3.5 Vérifier le transfert

Dans la fenêtre du bas de FileZilla, vérifiez :
- ✅ Tous les fichiers sont transférés (colonne "Réussite")
- ✅ Aucune erreur n'est affichée en rouge
- ✅ Le fichier `.htaccess` est bien présent sur le serveur

---

## 🔧 Étape 4 : Configuration Post-Déploiement

### 4.1 Vérifier le fichier .htaccess

Le fichier `.htaccess` doit être à la racine de votre site (dans `www` ou `public_html`).

Si le fichier n'est pas visible :
1. Dans FileZilla, allez dans **Serveur** → **Forcer l'affichage des fichiers cachés**
2. Rafraîchissez (F5)

### 4.2 Configurer le domaine (si nécessaire)

1. Dans votre espace client OVH
2. Allez dans **Hébergements** → **Multisite**
3. Vérifiez que votre domaine pointe vers le bon dossier racine

### 4.3 Activer HTTPS (Recommandé)

1. Dans l'espace client OVH
2. Allez dans **Hébergements** → Sélectionnez votre hébergement
3. Cliquez sur **SSL** → **Commander un certificat SSL**
4. Choisissez **Let's Encrypt (gratuit)** ou **Sectigo (payant)**
5. Une fois activé, décommentez les lignes HTTPS dans `.htaccess` (lignes 14-18)

---

## ✅ Étape 5 : Vérification

### 5.1 Tester votre site

1. Ouvrez votre navigateur
2. Accédez à `http://votre-domaine.com` ou `https://votre-domaine.com`
3. Vérifiez que :
   - ✅ La page d'accueil s'affiche correctement
   - ✅ Les animations Framer Motion fonctionnent
   - ✅ Les liens de navigation fonctionnent (smooth scroll)
   - ✅ Les images et icônes s'affichent
   - ✅ Les styles Tailwind CSS sont appliqués
   - ✅ Le site est responsive sur mobile

### 5.2 Tester les sections

Cliquez sur chaque lien du menu pour vérifier que le smooth scroll fonctionne :
- Histoire
- Mission
- Comment ça marche
- Équipe
- Impact
- Contact

### 5.3 Tester les performances

Utilisez ces outils pour vérifier les performances :
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## 🐛 Dépannage

### Problème : La page affiche une erreur 404

**Solution** :
- Vérifiez que `index.html` est bien à la racine du dossier `www`
- Vérifiez que le fichier `.htaccess` est présent
- Contactez le support OVH pour vérifier la configuration du domaine

### Problème : Les styles CSS ne s'appliquent pas

**Solution** :
- Videz le cache de votre navigateur (Ctrl+F5)
- Vérifiez que le dossier `_next` a bien été transféré
- Vérifiez les permissions des fichiers (644 pour les fichiers, 755 pour les dossiers)

### Problème : Les images ne s'affichent pas

**Solution** :
- Vérifiez que toutes les images sont dans le dossier `out` avant le transfert
- Vérifiez les permissions des fichiers images
- Vérifiez que les chemins d'images sont corrects (relatifs, pas absolus)

### Problème : Le smooth scroll ne fonctionne pas

**Solution** :
- Vérifiez que les fichiers JavaScript sont bien chargés
- Ouvrez la console du navigateur (F12) et vérifiez les erreurs
- Videz le cache et rechargez la page

### Problème : Erreur 500 - Internal Server Error

**Solution** :
- Vérifiez le fichier `.htaccess` (peut contenir une directive non supportée)
- Commentez les lignes une par une pour identifier le problème
- Contactez le support OVH pour vérifier les modules Apache activés

### Problème : Le transfert FTP est très lent

**Solution** :
- Utilisez SFTP au lieu de FTP (port 22)
- Transférez pendant les heures creuses
- Compressez les fichiers en .zip, uploadez-les, et décompressez sur le serveur via le gestionnaire de fichiers OVH

---

## 🔄 Mise à Jour du Site

Pour mettre à jour le site après modifications :

1. **Faites vos modifications** dans le code source
2. **Rebuild le projet** :
   ```bash
   npm run deploy
   # ou
   pnpm deploy
   ```
3. **Reconnectez-vous à FileZilla**
4. **Sélectionnez uniquement les fichiers modifiés** ou tout le dossier `out`
5. **Transférez les fichiers** (ils écraseront les anciens)
6. **Videz le cache** de votre navigateur
7. **Vérifiez les modifications** sur le site

---

## 📝 Checklist de Déploiement

Avant de considérer le déploiement terminé :

- [ ] Le projet build sans erreur (`npm run deploy`)
- [ ] Le dossier `out` contient tous les fichiers
- [ ] FileZilla est configuré avec les bons identifiants
- [ ] Tous les fichiers sont transférés (vérifier dans FileZilla)
- [ ] Le fichier `.htaccess` est présent sur le serveur
- [ ] Le site s'affiche correctement sur `votre-domaine.com`
- [ ] La navigation smooth scroll fonctionne
- [ ] Les animations Framer Motion sont fluides
- [ ] Le site est responsive (tester sur mobile)
- [ ] Les formulaires fonctionnent (si applicable)
- [ ] HTTPS est activé (recommandé)
- [ ] Les performances sont bonnes (PageSpeed > 80)

---

## 📞 Support

### Support OVH
- **Téléphone** : 1007 (depuis la France)
- **Email** : Via l'espace client
- **Documentation** : [guides.ovh.com](https://docs.ovh.com/)

### Support Technique
- **GitHub Issues** : Si vous rencontrez un bug dans le code
- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Documentation Framer Motion** : [framer.com/motion](https://www.framer.com/motion/)

---

## 🎉 Félicitations !

Votre site Novair est maintenant en ligne ! 🚀

N'oubliez pas de :
- Partager le lien avec votre équipe
- Tester régulièrement les performances
- Faire des sauvegardes régulières
- Monitorer le trafic avec Google Analytics (si configuré)

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**