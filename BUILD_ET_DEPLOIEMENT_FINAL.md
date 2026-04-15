# 🚀 Build et Déploiement Final - Novair

**Guide complet étape par étape pour mettre votre site en ligne**

---

## 📋 Vue d'Ensemble

Ce guide vous accompagne de A à Z pour :
1. ✅ Configurer l'envoi d'emails
2. ✅ Builder le projet
3. ✅ Vérifier que tout fonctionne
4. ✅ Déployer sur OVH
5. ✅ Tester le site en ligne

**⏱️ Temps estimé : 30-45 minutes**

---

## 🎯 Étape 0 : Prérequis

### Vérifiez que Vous Avez

- [ ] Node.js installé
- [ ] Projet dans `D:\film\novair main`
- [ ] FileZilla installé
- [ ] Identifiants OVH disponibles
- [ ] Accès à l'email `contact@novair-project.fr`

---

## 📧 ÉTAPE 1 : Configuration de l'Email (OBLIGATOIRE)

### 1.1 Créer un Compte Web3Forms

1. **Ouvrez votre navigateur** et allez sur :
   ```
   https://web3forms.com/
   ```

2. **Cliquez sur "Get Your Access Key"**

3. **Entrez votre email** :
   ```
   contact@novair-project.fr
   ```

4. **Cliquez sur "Create Access Key"**

### 1.2 Vérifier l'Email

1. **Ouvrez la boîte mail** `contact@your-email.com`

2. **Cherchez l'email** de Web3Forms (vérifiez les SPAM)

3. **Cliquez sur le lien de vérification**

4. **Vous recevrez une clé** qui ressemble à :
   ```
   a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

5. **⚠️ COPIEZ CETTE CLÉ** (gardez-la quelque part)

### 1.3 Intégrer la Clé dans le Code

1. **Ouvrez VS Code**

2. **Naviguez vers** :
   ```
   novair main\components\contact.tsx
   ```

3. **Cherchez la ligne 44** (ou utilisez Ctrl+F) :
   ```typescript
   access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // À remplacer
   ```

4. **Remplacez** `YOUR_WEB3FORMS_ACCESS_KEY` par votre vraie clé :
   ```typescript
   access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
   ```

5. **Sauvegardez** le fichier (Ctrl+S)

✅ **Email configuré !**

---

## 🏗️ ÉTAPE 2 : Build du Projet

### 2.1 Ouvrir PowerShell

1. **Ouvrez PowerShell** dans le dossier du projet
2. **Ou ouvrez le terminal** dans VS Code (Ctrl+`)

### 2.2 Naviguer vers le Projet

```powershell
cd "D:\film\novair main"
```

### 2.3 Lancer le Build

**Option A : Script Automatisé (Recommandé)**

```powershell
.\deploy.ps1
```

Le script fait tout automatiquement :
- ✅ Vérifie Node.js
- ✅ Installe les dépendances (si besoin)
- ✅ Nettoie les anciens builds
- ✅ Build le projet
- ✅ Copie le .htaccess
- ✅ Affiche le résultat

**Option B : Manuellement**

```powershell
# 1. Installer les dépendances (si pas déjà fait)
npm install

# 2. Nettoyer
npm run clean

# 3. Builder
npm run build
```

### 2.4 Attendre la Fin

⏱️ **Le build prend 1-3 minutes**

Vous devriez voir :
```
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization
```

✅ **Build terminé !**

---

## 🔍 ÉTAPE 3 : Vérifier le Build

### 3.1 Vérifier le Dossier `out`

1. **Ouvrez l'explorateur** de fichiers

2. **Naviguez vers** :
   ```
   D:\film\novair main\out
   ```

3. **Vérifiez que vous avez** :
   - ✅ `index.html`
   - ✅ `404.html`
   - ✅ `.htaccess`
   - ✅ Dossier `_next\`

### 3.2 Vérifier la Taille

Dans PowerShell :
```powershell
# Afficher la taille du dossier out
powershell -Command "'{0:N2} MB' -f ((Get-ChildItem -Path 'out' -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB)"
```

**Résultat attendu** : ~1.75 MB (bien en dessous de 100 MB)

### 3.3 Tester en Local (Optionnel)

```powershell
npm run preview
```

Ouvrez : http://localhost:3000

**Vérifiez** :
- ✅ Le site s'affiche
- ✅ Les animations fonctionnent
- ✅ Le menu de navigation fonctionne
- ✅ Le formulaire s'affiche

Appuyez sur **Ctrl+C** pour arrêter le serveur.

✅ **Build vérifié !**

---

## 📤 ÉTAPE 4 : Déploiement sur OVH

### 4.1 Ouvrir FileZilla

1. **Lancez FileZilla**

2. **Allez dans** : Fichier → Gestionnaire de sites

3. **Sélectionnez** votre site "Novair OVH" (ou créez-le)

### 4.2 Configurer la Connexion (Si Première Fois)

```
Protocole : FTP
Hôte : ftp.votre-domaine.com
Port : 21
Chiffrement : FTP explicite sur TLS si disponible
Type d'authentification : Normale
Identifiant : votre-login-ftp
Mot de passe : votre-mot-de-passe
```

### 4.3 Se Connecter

1. **Cliquez sur "Connexion"**

2. **Acceptez le certificat** (si demandé)

3. **Attendez** la connexion

### 4.4 Naviguer vers le Bon Dossier

**Côté distant (droite)** :
- Naviguez vers le dossier `www` ou `public_html`

### 4.5 Préparer le Transfert

**Côté local (gauche)** :
1. Naviguez vers `D:\film\novair main\out`
2. **Entrez dans le dossier `out`**
3. **Sélectionnez TOUT le contenu** (Ctrl+A)

### 4.6 Transférer les Fichiers

**Option A : Glisser-Déposer**
- Glissez tout vers le panneau de droite

**Option B : Clic Droit**
- Clic droit → "Envoyer"

### 4.7 Attendre le Transfert

⏱️ **Temps estimé : 10-30 secondes** (selon votre connexion)

Vérifiez en bas de FileZilla :
- ✅ "Transferts terminés"
- ✅ Aucun fichier en rouge

### 4.8 Vérifier sur le Serveur

**Côté distant**, vous devriez voir :
- ✅ `index.html`
- ✅ `404.html`
- ✅ `.htaccess` (activez "Afficher fichiers cachés" si invisible)
- ✅ Dossier `_next/`

✅ **Site transféré !**

---

## 🧪 ÉTAPE 5 : Tests Finaux

### 5.1 Accéder au Site

1. **Ouvrez votre navigateur** en **mode privé** (Ctrl+Shift+N)

2. **Tapez votre URL** :
   ```
   https://votre-domaine.com
   ```
   ou
   ```
   http://votre-domaine.com
   ```

3. **Appuyez sur Entrée**

### 5.2 Tests Visuels

**Vérifiez que** :
- [ ] ✅ La page d'accueil s'affiche
- [ ] ✅ Le header est visible
- [ ] ✅ Les animations fonctionnent (particules dans le Hero)
- [ ] ✅ Le menu de navigation fonctionne
- [ ] ✅ Les images s'affichent
- [ ] ✅ Le footer est complet

### 5.3 Test du Smooth Scroll

**Cliquez sur chaque lien** du menu :
- [ ] Histoire → Scroll vers la section
- [ ] Mission → Scroll vers la section
- [ ] Comment ça marche → Scroll vers la section
- [ ] Équipe → Scroll vers la section
- [ ] Impact → Scroll vers la section
- [ ] Contact → Scroll vers la section

### 5.4 Test du Formulaire de Contact ⚠️ IMPORTANT

1. **Scrollez vers le bas** jusqu'au formulaire

2. **Remplissez** :
   ```
   Nom : Test Novair
   Email : votre-email@exemple.com
   Téléphone : 06 12 34 56 78
   Message : Ceci est un test du formulaire de contact
   ```

3. **Cliquez sur "Envoyer le message"**

4. **Vérifiez** :
   - [ ] ⏳ "Envoi en cours..." s'affiche
   - [ ] ✅ "Message envoyé avec succès !" s'affiche (après 1-2s)

5. **Ouvrez** `contact@novair-project.fr`

6. **Vérifiez** que vous avez reçu l'email

### 5.5 Test Mobile

1. **Dans Chrome**, appuyez sur **F12**

2. **Cliquez sur l'icône mobile** (en haut à gauche)

3. **Testez** sur différentes tailles :
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)

4. **Vérifiez** :
   - [ ] Le menu mobile fonctionne
   - [ ] Le formulaire est lisible
   - [ ] Les animations sont fluides

### 5.6 Test des Liens du Footer

**Testez chaque lien** :
- [ ] Email → Ouvre le client mail
- [ ] Téléphone → Propose de lancer l'appel
- [ ] Adresse → Ouvre Google Maps
- [ ] Bouton "Retour en haut" → Scroll vers le top

✅ **Tous les tests passés !**

---

## 🎉 ÉTAPE 6 : Validation Finale

### Checklist Complète

#### Configuration
- [ ] ✅ Clé Web3Forms configurée
- [ ] ✅ Email vérifié
- [ ] ✅ Fichier contact.tsx sauvegardé

#### Build
- [ ] ✅ Build sans erreur
- [ ] ✅ Dossier `out/` créé
- [ ] ✅ Taille < 100 MB
- [ ] ✅ .htaccess présent

#### Déploiement
- [ ] ✅ Connexion FileZilla réussie
- [ ] ✅ Tous les fichiers transférés
- [ ] ✅ Aucune erreur de transfert

#### Tests
- [ ] ✅ Site accessible
- [ ] ✅ Animations fonctionnent
- [ ] ✅ Navigation smooth scroll OK
- [ ] ✅ Formulaire envoie des emails
- [ ] ✅ Email reçu sur contact@novair-project.fr
- [ ] ✅ Responsive mobile OK
- [ ] ✅ Liens footer fonctionnels

---

## 🎊 SUCCÈS !

**Votre site Novair est maintenant EN LIGNE ! 🚀**

### Ce Qui Fonctionne

✅ **Site web professionnel** avec animations fluides  
✅ **Formulaire de contact** qui envoie des vrais emails  
✅ **Navigation smooth scroll** optimisée  
✅ **Design responsive** sur tous les appareils  
✅ **Performance optimale** (< 2 MB, ultra rapide)  
✅ **SEO optimisé** pour Google  

### Prochaines Étapes

1. **Partagez** le lien avec votre équipe
2. **Testez** régulièrement le formulaire
3. **Surveillez** l'email contact@novair-project.fr
4. **Mettez à jour** le contenu si besoin
5. **Faites des sauvegardes** régulières

---

## 🆘 En Cas de Problème

### Le Formulaire N'Envoie Pas d'Email

**Causes possibles** :
- ❌ Clé Web3Forms incorrecte
- ❌ Email non vérifié
- ❌ Fichier pas rebuilder après modification

**Solutions** :
1. Vérifiez la clé dans `contact.tsx`
2. Vérifiez l'email de confirmation Web3Forms
3. Rebuilder : `npm run build`
4. Retransférer les fichiers

### Le Site Ne S'Affiche Pas

**Solutions** :
1. Videz le cache (Ctrl+Shift+Delete)
2. Essayez en mode privé
3. Vérifiez que `index.html` est à la racine de `www`
4. Attendez 5-10 minutes (propagation DNS)

### Les Styles Ne S'Appliquent Pas

**Solutions** :
1. Ctrl+F5 (hard refresh)
2. Vérifiez que le dossier `_next` est transféré
3. Vérifiez que `.htaccess` est présent

### Erreur 500

**Solutions** :
1. Renommez `.htaccess` en `.htaccess.bak` temporairement
2. Testez si le site fonctionne
3. Si oui, problème dans `.htaccess`
4. Contactez le support OVH

---

## 📞 Support

### Documentation
- **Email** : `CONFIGURATION_EMAIL.md`
- **Déploiement** : `DEPLOIEMENT_OVH.md`
- **FileZilla** : `GUIDE_FILEZILLA.md`
- **Améliorations** : `DERNIERES_AMELIORATIONS.md`

### Contact
- **Email** : contact@novair-project.fr
- **Support OVH** : 1007 (France)

---

## 📊 Résumé des Actions

| Étape | Action | Durée |
|-------|--------|-------|
| 1 | Configuration email Web3Forms | 5 min |
| 2 | Build du projet | 3 min |
| 3 | Vérification | 2 min |
| 4 | Déploiement FileZilla | 5 min |
| 5 | Tests | 10 min |
| **TOTAL** | | **~25 min** |

---

## 🎯 Points Clés à Retenir

1. **⚠️ NE PAS OUBLIER** de configurer Web3Forms avant le build
2. **✅ TOUJOURS** vérifier que le formulaire fonctionne
3. **📧 SURVEILLER** l'email contact@your-email.com
4. **💾 FAIRE** des sauvegardes régulières
5. **🔄 METTRE À JOUR** le site facilement en rebuildant et retransférant

---

## 🌟 Félicitations !

Vous avez déployé avec succès un site web professionnel et fonctionnel !

**Novair est maintenant prêt à changer des vies ! 💚📱**

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**

_Guide Final - Version 2.0 - Mars 2026_
