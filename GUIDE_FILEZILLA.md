# 📁 Guide FileZilla - Déploiement Novair sur OVH

**Guide visuel complet pour déployer votre site avec FileZilla**

---

## 📥 Étape 0 : Téléchargement et Installation

### Télécharger FileZilla

1. Allez sur **https://filezilla-project.org/**
2. Cliquez sur **"Download FileZilla Client"**
3. Choisissez la version pour votre système :
   - Windows 10/11 (64-bit)
   - macOS
   - Linux

### Installation

**Windows** :
- Double-cliquez sur le fichier `.exe`
- Suivez l'assistant d'installation
- Acceptez les termes et conditions
- Installation complète recommandée

**macOS** :
- Ouvrez le fichier `.dmg`
- Glissez FileZilla vers Applications
- Autoriser l'application dans les paramètres de sécurité

---

## 🔑 Étape 1 : Récupérer vos Identifiants OVH

### Sur l'Espace Client OVH

1. **Connectez-vous** à https://www.ovh.com/manager/
2. Dans le menu de gauche, cliquez sur **"Hébergements"**
3. Sélectionnez votre hébergement
4. Cliquez sur l'onglet **"FTP - SSH"**

### Informations à Noter

```
┌─────────────────────────────────────────────────┐
│  INFORMATIONS FTP                               │
├─────────────────────────────────────────────────┤
│                                                 │
│  Serveur FTP/SFTP :                            │
│  ► ftp.votre-domaine.com                       │
│  ► ou ftp.cluster0XX.hosting.ovh.net           │
│                                                 │
│  Login FTP :                                    │
│  ► votre-login (généralement votre domaine)    │
│                                                 │
│  Port FTP :                                     │
│  ► 21 (FTP standard)                           │
│  ► 22 (SFTP sécurisé - recommandé)            │
│                                                 │
│  Mot de passe :                                 │
│  ► [Cliquez sur "Changer le mot de passe"]    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Si Vous Avez Perdu Votre Mot de Passe

1. Sur la page **"FTP - SSH"**
2. Cliquez sur **"Changer le mot de passe"**
3. Choisissez un nouveau mot de passe fort
4. Validez et attendez 5-10 minutes

---

## ⚙️ Étape 2 : Configuration de FileZilla

### Interface de FileZilla

```
┌────────────────────────────────────────────────────────────────────┐
│ FileZilla                                          [_] [□] [X]     │
├────────────────────────────────────────────────────────────────────┤
│ Fichier  Édition  Affichage  Transfert  Serveur  Aide             │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Hôte: [___________] Identifiant: [_____] Mot de passe: [_____]   │
│  Port: [21] [Connexion rapide]                                     │
│                                                                     │
├──────────────────────────┬─────────────────────────────────────────┤
│                          │                                         │
│  SITE LOCAL             │  SITE DISTANT                           │
│  (Votre ordinateur)     │  (Serveur OVH)                          │
│                          │                                         │
│  📁 Documents            │  📁 www                                 │
│  📁 Téléchargements     │  📁 logs                                │
│  📁 novair main         │  📁 cgi-bin                             │
│    📁 out ◄ ICI         │  📄 .htaccess                           │
│      📄 index.html      │  📄 index.html                          │
│      📁 _next           │                                         │
│                          │                                         │
├──────────────────────────┴─────────────────────────────────────────┤
│  File d'attente des transferts                                     │
│  [Vide - Aucun transfert en cours]                                │
└────────────────────────────────────────────────────────────────────┘
```

### Méthode 1 : Connexion Rapide (Débutant)

**Pour un test rapide** :

1. En haut de FileZilla, remplissez :
   ```
   Hôte : ftp.votre-domaine.com
   Identifiant : votre-login-ftp
   Mot de passe : votre-mot-de-passe
   Port : 21
   ```

2. Cliquez sur **"Connexion rapide"**

3. ⚠️ Si c'est la première connexion, une fenêtre apparaît :
   ```
   ┌─────────────────────────────────────────┐
   │  Certificat Inconnu                     │
   ├─────────────────────────────────────────┤
   │  Le serveur a envoyé un certificat      │
   │  inconnu. Voulez-vous faire confiance  │
   │  à ce certificat ?                      │
   │                                         │
   │  [ ] Toujours faire confiance          │
   │                                         │
   │  [Accepter une fois] [Refuser]         │
   └─────────────────────────────────────────┘
   ```
   
   Cochez **"Toujours faire confiance"** et cliquez **"Accepter une fois"**

### Méthode 2 : Gestionnaire de Sites (Recommandé)

**Pour sauvegarder vos identifiants** :

1. Cliquez sur **Fichier** → **Gestionnaire de sites** (ou Ctrl+S)

2. Fenêtre qui s'ouvre :
   ```
   ┌─────────────────────────────────────────────────────────────┐
   │  Gestionnaire de sites                      [_] [□] [X]     │
   ├─────────────────────────────────────────────────────────────┤
   │                                                              │
   │  Mes sites          │  Général  │  Avancé  │  Options       │
   │  📂 (vide)          │                                        │
   │                     │  Protocole : [FTP ▼]                  │
   │                     │  Hôte : [________________]            │
   │                     │  Port : [21____]                      │
   │                     │  Chiffrement : [▼]                    │
   │  [Nouveau site]     │  Type d'authentification : [▼]        │
   │  [Supprimer]        │  Identifiant : [__________]           │
   │  [Renommer]         │  Mot de passe : [__________]          │
   │                     │  □ Mémoriser les mots de passe        │
   │                     │                                        │
   │                     │  [Connexion]  [Annuler]               │
   └─────────────────────────────────────────────────────────────┘
   ```

3. Cliquez sur **"Nouveau site"**

4. Renommez-le (ex: "Novair OVH")

5. Configurez les paramètres :
   
   **Onglet Général** :
   ```
   Protocole : FTP - File Transfer Protocol
   Hôte : ftp.votre-domaine.com
   Port : 21
   Chiffrement : Connexion FTP explicite sur TLS si disponible
   Type d'authentification : Normale
   Identifiant : votre-login-ftp
   Mot de passe : votre-mot-de-passe
   ☑ Mémoriser les mots de passe
   ```

6. Cliquez sur **"Connexion"**

---

## 🌐 Étape 3 : Première Connexion

### Que se passe-t-il lors de la connexion ?

```
┌────────────────────────────────────────────────────────┐
│  Journal des messages (en bas de FileZilla)            │
├────────────────────────────────────────────────────────┤
│  Statut:    Résolution de l'adresse de ftp.domain.com │
│  Statut:    Connexion à 213.186.33.XX:21...           │
│  Statut:    Connexion établie, attente du message...  │
│  Réponse:   220 Welcome to OVH FTP server             │
│  Commande:  AUTH TLS                                   │
│  Réponse:   234 Proceed with negotiation              │
│  Statut:    Connexion TLS/SSL établie                 │
│  Commande:  USER votre-login                          │
│  Réponse:   331 Password required                     │
│  Commande:  PASS ********                             │
│  Réponse:   230 User logged in                        │
│  Statut:    Connexion réussie ✓                       │
│  Statut:    Récupération de la liste du dossier /     │
│  Statut:    Dossier listé avec succès                 │
└────────────────────────────────────────────────────────┘
```

### Structure Typique OVH

Vous devriez voir ces dossiers sur le serveur (côté droit) :

```
📁 / (racine)
├── 📁 www          ◄ IMPORTANT : C'est ici !
│   └── (mettez vos fichiers ici)
├── 📁 logs         (journaux du serveur)
├── 📁 cgi-bin      (scripts CGI)
└── 📁 ssl          (certificats SSL)
```

**⚠️ IMPORTANT** : Naviguez dans le dossier **`www`** ou **`public_html`** !

---

## 📤 Étape 4 : Préparer les Fichiers à Transférer

### Sur Votre Ordinateur

1. **Côté gauche de FileZilla** (Site Local)
2. Naviguez vers votre projet :
   ```
   C:\
   └── film\
       └── novair main\
           └── out\  ◄ C'EST CE DOSSIER !
               ├── 📄 index.html
               ├── 📄 404.html
               ├── 📄 .htaccess
               ├── 📁 _next\
               │   ├── 📁 static\
               │   └── (fichiers CSS, JS, etc.)
               └── 📁 images\ (si applicable)
   ```

3. **Double-cliquez** sur le dossier `out` pour entrer dedans

### Vue d'Ensemble Avant Transfert

```
┌──────────────────────────┬─────────────────────────────┐
│  SITE LOCAL              │  SITE DISTANT               │
│  novair main/out/        │  www/                       │
├──────────────────────────┼─────────────────────────────┤
│  📄 index.html           │  (vide ou ancien site)      │
│  📄 404.html             │                             │
│  📄 .htaccess            │                             │
│  📁 _next (25 MB)        │                             │
│  📁 images               │                             │
│                          │                             │
│  TOTAL : ~30 MB          │                             │
│  Fichiers : ~150         │                             │
└──────────────────────────┴─────────────────────────────┘
```

---

## 🚀 Étape 5 : Transférer les Fichiers

### Méthode 1 : Glisser-Déposer (Recommandé)

1. **Côté gauche** : Sélectionnez TOUT le contenu du dossier `out`
   - Utilisez **Ctrl+A** (Windows) ou **Cmd+A** (Mac)

2. **Glissez** les fichiers vers le panneau de droite (dans le dossier `www`)

3. Le transfert commence automatiquement !

### Méthode 2 : Clic Droit

1. **Sélectionnez** tous les fichiers (Ctrl+A)
2. **Clic droit** → **"Envoyer"**
3. Confirmez si demandé

### Pendant le Transfert

```
┌────────────────────────────────────────────────────────────┐
│  File d'attente des transferts                             │
├────────────────────────────────────────────────────────────┤
│  📄 index.html          ████████████████░░░░   82%  ↑     │
│  📄 404.html            ████████████████████  100%  ✓     │
│  📄 .htaccess           ████████████████████  100%  ✓     │
│  📁 _next/static/...    ████████░░░░░░░░░░░░   45%  ↑     │
│                                                             │
│  Transféré : 25.3 MB / 30 MB                               │
│  Vitesse : 2.5 MB/s                                        │
│  Temps restant : 00:02                                     │
│  Fichiers : 87 / 150                                       │
└────────────────────────────────────────────────────────────┘
```

### Indicateurs de Statut

- **✓** (vert) : Transfert réussi
- **↑** (bleu) : En cours de transfert
- **⚠** (jaune) : En attente
- **✗** (rouge) : Erreur

---

## ⏱️ Étape 6 : Attendre la Fin du Transfert

### Temps de Transfert Estimé

| Connexion | Taille | Temps Estimé |
|-----------|--------|--------------|
| ADSL (1 MB/s) | 30 MB | ~30 secondes |
| Fibre (10 MB/s) | 30 MB | ~3 secondes |
| 4G (5 MB/s) | 30 MB | ~6 secondes |

### Vérifier que Tout est Transféré

1. **Regardez en bas** de FileZilla
2. Attendez le message : **"Transferts terminés"**
3. Vérifiez qu'il n'y a pas de fichiers en rouge (erreur)

### En Cas d'Erreur

Si des fichiers n'ont pas été transférés (croix rouge) :

1. **Clic droit** sur les fichiers en erreur
2. **"Réinitialiser et réessayer les transferts en échec"**
3. Attendez le nouveau transfert

---

## 🔍 Étape 7 : Vérification Post-Transfert

### Vérifier sur le Serveur (Côté Droit)

```
📁 www/
├── ✓ 📄 index.html          (125 KB)
├── ✓ 📄 404.html            (15 KB)
├── ✓ 📄 .htaccess           (3 KB)
├── ✓ 📁 _next/              (25 MB)
│   ├── 📁 static/
│   │   ├── 📁 css/
│   │   ├── 📁 chunks/
│   │   └── 📁 media/
│   └── ...
└── ✓ 📁 images/             (si applicable)
```

### Checklist Visuelle

- [ ] `index.html` présent
- [ ] `.htaccess` présent (⚠️ peut être caché, activer "Afficher les fichiers cachés")
- [ ] Dossier `_next` avec tout son contenu
- [ ] Aucune erreur dans la file d'attente
- [ ] Message "Transferts terminés" affiché

### Afficher les Fichiers Cachés

Si `.htaccess` n'est pas visible :

1. Menu **Serveur** → **Forcer l'affichage des fichiers cachés**
2. Appuyez sur **F5** pour rafraîchir
3. Le fichier `.htaccess` devrait apparaître

---

## 🌐 Étape 8 : Tester Votre Site

### Ouvrir Votre Site

1. Ouvrez votre navigateur (Chrome, Firefox, Edge)
2. Tapez votre domaine : `http://votre-domaine.com`
3. Appuyez sur **Entrée**

### Ce Que Vous Devriez Voir

```
┌────────────────────────────────────────────────────┐
│  🌐 https://votre-domaine.com                      │
├────────────────────────────────────────────────────┤
│                                                    │
│           🟢  N  Novair                            │
│                                                    │
│     Donner une seconde vie aux téléphones          │
│           pour sauver des vies                     │
│                                                    │
│  [Donner un téléphone]  [Découvrir notre mission] │
│                                                    │
│     📱 500+         ❤️ 15         🛡️ 24/7         │
│  Téléphones    Associations   Accès aux urgences   │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Tests à Effectuer

1. **Navigation** : Cliquez sur les liens du menu
2. **Scroll** : Vérifiez que le smooth scroll fonctionne
3. **Mobile** : Testez avec DevTools (F12 → Mode mobile)
4. **Images** : Vérifiez que toutes les images s'affichent
5. **Animations** : Les animations Framer Motion doivent être fluides

---

## ❌ Résolution des Problèmes

### Problème 1 : Connexion Impossible

```
❌ Erreur : Échec de la connexion
```

**Solutions** :
- ✓ Vérifiez vos identifiants (login/mot de passe)
- ✓ Vérifiez l'adresse du serveur FTP
- ✓ Essayez le port 22 (SFTP) au lieu de 21
- ✓ Désactivez temporairement l'antivirus/firewall
- ✓ Attendez 10 minutes après un changement de mot de passe

### Problème 2 : Transfert Lent

```
⏱️ Vitesse : 50 KB/s (très lent)
```

**Solutions** :
- ✓ Changez le type de transfert : **Transfert** → **Type de transfert** → **Binaire**
- ✓ Limitez le nombre de connexions simultanées : **Édition** → **Paramètres** → **Transferts** → "2" connexions max
- ✓ Essayez à un autre moment (heures creuses)
- ✓ Vérifiez votre connexion Internet

### Problème 3 : Le .htaccess n'Apparaît Pas

```
❌ Fichier .htaccess introuvable sur le serveur
```

**Solutions** :
- ✓ Menu **Serveur** → **Forcer l'affichage des fichiers cachés**
- ✓ Rafraîchir (F5)
- ✓ Transférer manuellement depuis `public/.htaccess`
- ✓ Vérifier les permissions (doit être 644)

### Problème 4 : Site Affiche une Page Blanche

```
❌ Page blanche ou erreur 500
```

**Solutions** :
- ✓ Vérifiez que `index.html` est à la racine de `www`
- ✓ Vérifiez les permissions (644 pour fichiers, 755 pour dossiers)
- ✓ Renommez `.htaccess` temporairement en `.htaccess.bak` pour tester
- ✓ Consultez les logs d'erreur dans votre espace OVH

### Problème 5 : Erreur 404 sur les Pages

```
❌ Erreur 404 - Page non trouvée
```

**Solutions** :
- ✓ Vérifiez que tous les fichiers du dossier `_next` sont transférés
- ✓ Vérifiez le fichier `.htaccess` (redirection)
- ✓ Videz le cache du navigateur (Ctrl+Shift+Delete)

---

## 🔐 Bonnes Pratiques de Sécurité

### 1. Sécuriser Vos Identifiants

```
✓ Utilisez un mot de passe fort
✓ Ne partagez jamais vos identifiants
✓ Changez le mot de passe régulièrement
✓ Utilisez un gestionnaire de mots de passe
```

### 2. Préférer SFTP à FTP

```
FTP  (Port 21)  : ❌ Non chiffré
SFTP (Port 22)  : ✓ Chiffré et sécurisé
```

**Pour utiliser SFTP** :
- Protocole : **SFTP**
- Port : **22**
- Tout le reste identique

### 3. Vérifier le Certificat

```
⚠️ Toujours vérifier l'authenticité du certificat SSL
✓ Acceptez seulement si vous reconnaissez le serveur
```

### 4. Sauvegardes

```
✓ Toujours faire une sauvegarde avant de transférer
✓ Téléchargez l'ancien site depuis le serveur
✓ Conservez plusieurs versions localement
```

---

## 💡 Astuces et Raccourcis

### Raccourcis Clavier Utiles

| Raccourci | Action |
|-----------|--------|
| **Ctrl+S** | Gestionnaire de sites |
| **Ctrl+R** ou **F5** | Rafraîchir la liste |
| **Ctrl+A** | Tout sélectionner |
| **F2** | Renommer un fichier |
| **Suppr** | Supprimer |
| **Ctrl+Q** | Quitter FileZilla |

### Options Avancées

**Transfert automatique** :
- Menu **Transfert** → **Traiter la file d'attente**
- Utile pour les transferts programmés

**Comparaison de fichiers** :
- Menu **Affichage** → **Comparaison de répertoires**
- **Activer** → Montre les différences entre local et distant

**Filtres de fichiers** :
- Menu **Affichage** → **Filtres de noms de fichiers**
- Masquer certains types de fichiers

---

## 📊 Tableau Récapitulatif

| Étape | Action | Temps |
|-------|--------|-------|
| 0 | Télécharger et installer FileZilla | 5 min |
| 1 | Récupérer identifiants OVH | 2 min |
| 2 | Configurer FileZilla | 3 min |
| 3 | Se connecter au serveur | 1 min |
| 4 | Préparer les fichiers | 1 min |
| 5 | Transférer les fichiers | 5-15 min |
| 6 | Vérifier le transfert | 2 min |
| 7 | Tester le site | 3 min |
| **TOTAL** | | **20-30 min** |

---

## ✅ Checklist Finale

### Avant le Transfert
- [ ] FileZilla installé
- [ ] Identifiants OVH récupérés
- [ ] Site buildé (`npm run build`)
- [ ] Dossier `out` vérifié
- [ ] Sauvegarde de l'ancien site (si existe)

### Pendant le Transfert
- [ ] Connexion établie
- [ ] Dans le bon dossier (`www`)
- [ ] Tous les fichiers sélectionnés
- [ ] Transfert lancé
- [ ] Aucune erreur

### Après le Transfert
- [ ] Tous les fichiers transférés
- [ ] `.htaccess` présent
- [ ] Site accessible sur le domaine
- [ ] Navigation fonctionne
- [ ] Images s'affichent
- [ ] Animations actives
- [ ] Responsive OK

---

## 📞 Besoin d'Aide ?

### Support FileZilla
- **Forum** : https://forum.filezilla-project.org/
- **Wiki** : https://wiki.filezilla-project.org/

### Support OVH
- **Téléphone** : 1007 (France)
- **Email** : Via l'espace client
- **Guides** : https://docs.ovh.com/

### Documentation Novair
- **README.md** : Documentation complète
- **DEPLOIEMENT_OVH.md** : Guide détaillé
- **DEMARRAGE_RAPIDE.md** : Quick start

---

## 🎉 Félicitations !

Vous savez maintenant utiliser FileZilla comme un pro ! 🚀

**Votre site Novair est en ligne et accessible au monde entier ! 🌍**

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**

_Guide FileZilla - Version 1.0 - Janvier 2024_