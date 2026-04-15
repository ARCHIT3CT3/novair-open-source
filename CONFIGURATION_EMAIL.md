# 📧 Configuration de l'Envoi d'Emails - Novair

**Guide complet pour configurer l'envoi d'emails depuis le formulaire de contact**

---

## 🎯 Objectif

Recevoir les messages du formulaire de contact directement sur **contact@novair-project.fr**

---

## ✅ Solution Recommandée : Web3Forms

**Pourquoi Web3Forms ?**
- ✅ **100% Gratuit** (jusqu'à 250 emails/mois)
- ✅ **Pas de serveur requis** (fonctionne en statique)
- ✅ **Configuration en 5 minutes**
- ✅ **Pas de compte à créer**
- ✅ **Compatible OVH**
- ✅ **Spam protection incluse**

---

## 📝 Étape 1 : Obtenir une Clé API

### 1.1 Aller sur Web3Forms

Ouvrez votre navigateur et allez sur :
👉 **https://web3forms.com/**

### 1.2 Créer une Clé d'Accès

1. Cliquez sur **"Get Your Access Key"**
2. Entrez votre email : **contact@novair-project.fr**
3. Cliquez sur **"Create Access Key"**

### 1.3 Vérifier Votre Email

1. Ouvrez la boîte mail **contact@your-email.com**
2. Cherchez l'email de Web3Forms
3. Cliquez sur le lien de vérification

### 1.4 Copier la Clé

Vous recevrez une clé qui ressemble à :
```
a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**⚠️ GARDEZ CETTE CLÉ EN SÉCURITÉ !**

---

## 🔧 Étape 2 : Intégrer la Clé dans le Site

### 2.1 Ouvrir le Fichier

Ouvrez le fichier :
```
novair main\components\contact.tsx
```

### 2.2 Remplacer la Clé

Cherchez la ligne (environ ligne 44) :
```typescript
access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // À remplacer
```

Remplacez par votre vraie clé :
```typescript
access_key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
```

### 2.3 Vérifier l'Email de Destination

Ligne suivante, vérifiez que c'est bien :
```typescript
to_email: "contact@novair-project.fr",
```

✅ **C'est bon !**

---

## 🏗️ Étape 3 : Rebuilder le Site

### 3.1 Rebuild

```bash
# Dans PowerShell
.\deploy.ps1

# Ou manuellement
npm run build
```

### 3.2 Vérifier le Build

Le dossier `out/` doit être recréé avec le nouveau code.

---

## 📤 Étape 4 : Redéployer sur OVH

### 4.1 Ouvrir FileZilla

Connectez-vous à votre serveur OVH

### 4.2 Transférer les Nouveaux Fichiers

Transférez **TOUT le contenu** du dossier `out/` vers `www/`

⚠️ **Important** : Écrasez les anciens fichiers !

---

## ✅ Étape 5 : Tester le Formulaire

### 5.1 Aller sur Votre Site

```
https://votre-domaine.com/#contact
```

### 5.2 Remplir le Formulaire de Test

```
Nom : Test Novair
Email : votre-email@exemple.com
Téléphone : 06 12 34 56 78
Message : Test du formulaire de contact
```

### 5.3 Cliquer sur "Envoyer"

Vous devriez voir :
- ⏳ "Envoi en cours..."
- ✅ "Message envoyé avec succès !"

### 5.4 Vérifier la Réception

1. Ouvrez **contact@novair-project.fr**
2. Vous devriez recevoir un email avec :
   - Nom de l'expéditeur
   - Email
   - Téléphone
   - Message

---

## 🎨 Personnalisation (Optionnel)

### Modifier le Sujet de l'Email

Dans `contact.tsx`, ligne ~47 :
```typescript
subject: `Nouveau message de ${formData.name} via Novair`,
```

Changez le texte comme vous voulez.

### Ajouter un Message de Réponse Automatique

Ajoutez après `subject` :
```typescript
replyto: formData.email,
autoresponse: {
  enabled: true,
  subject: "Merci de nous avoir contactés - Novair",
  message: "Bonjour,\n\nNous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nL'équipe Novair"
}
```

---

## 🔐 Sécurité et Limites

### Limites Gratuites Web3Forms

| Fonctionnalité | Limite |
|----------------|--------|
| **Emails/mois** | 250 |
| **Taille max** | 5 MB |
| **Spam protection** | ✅ Inclus |
| **File uploads** | ✅ Possible |

### Que se Passe-t-il si Vous Dépassez ?

1. Les emails seront mis en attente
2. Vous recevrez un email d'avertissement
3. Options :
   - Attendre le mois suivant (gratuit)
   - Passer au plan payant ($5/mois = illimité)

### Protection Anti-Spam

Web3Forms inclut :
- ✅ **reCAPTCHA** (optionnel)
- ✅ **Honeypot** (piège à bots)
- ✅ **Rate limiting**
- ✅ **Email validation**

---

## 🆘 Dépannage

### Problème 1 : "Erreur lors de l'envoi"

**Causes possibles** :
- ❌ Mauvaise clé API
- ❌ Email non vérifié
- ❌ Connexion internet

**Solutions** :
1. Vérifiez la clé dans `contact.tsx`
2. Vérifiez l'email de confirmation Web3Forms
3. Testez votre connexion internet

### Problème 2 : "Email non reçu"

**Vérifiez** :
1. ✅ Dossier SPAM de contact@your-email.com
2. ✅ La clé est bien vérifiée sur Web3Forms
3. ✅ L'email de destination est correct

### Problème 3 : "Access key invalid"

**Solution** :
1. Retournez sur https://web3forms.com/
2. Créez une nouvelle clé
3. Remplacez dans le code
4. Rebuild et redéployez

---

## 📊 Alternatives à Web3Forms

Si Web3Forms ne vous convient pas :

### Option 1 : EmailJS (Populaire)

**Avantages** :
- 200 emails/mois gratuits
- Dashboard complet
- Templates d'emails

**Inconvénients** :
- Compte obligatoire
- Configuration plus complexe

**Lien** : https://www.emailjs.com/

### Option 2 : Formspree

**Avantages** :
- 50 emails/mois gratuits
- Simple et rapide

**Inconvénients** :
- Limite basse

**Lien** : https://formspree.io/

### Option 3 : Getform

**Avantages** :
- 50 emails/mois gratuits
- Dashboard élégant

**Inconvénients** :
- Limite basse

**Lien** : https://getform.io/

### Option 4 : Service OVH Mail

**Avantages** :
- Intégré à votre hébergement
- Illimité

**Inconvénients** :
- Nécessite un backend PHP/Node.js
- Plus complexe à configurer
- Pas compatible avec export statique

---

## 📧 Configuration Avancée Web3Forms

### Ajouter reCAPTCHA (Anti-Spam)

1. Allez sur https://www.google.com/recaptcha/
2. Créez une clé pour votre domaine
3. Dans `contact.tsx`, ajoutez :

```typescript
// Après l'installation de react-google-recaptcha
import ReCAPTCHA from "react-google-recaptcha";

// Dans le formulaire
<ReCAPTCHA
  sitekey="VOTRE_RECAPTCHA_SITE_KEY"
  onChange={(token) => {
    // Token à envoyer avec le formulaire
  }}
/>
```

### Ajouter un Upload de Fichiers

```typescript
// Dans le formulaire
<Input
  type="file"
  name="attachment"
  accept=".pdf,.doc,.docx,.jpg,.png"
/>
```

Web3Forms gère automatiquement les pièces jointes !

---

## 🎯 Checklist Finale

Avant de dire que c'est terminé :

- [ ] Clé Web3Forms obtenue
- [ ] Email contact@your-email.comr vérifié
- [ ] Clé intégrée dans `contact.tsx`
- [ ] Site rebuilder (`npm run build`)
- [ ] Fichiers transférés sur OVH
- [ ] Formulaire testé en ligne
- [ ] Email de test reçu sur contact@novair-project.fr
- [ ] Message de succès s'affiche
- [ ] Pas d'erreur dans la console

---

## 🎉 Félicitations !

Votre formulaire de contact est maintenant **100% fonctionnel** ! 📧✨

**Les messages arrivent directement sur contact@novair-project.fr**

---

## 📞 Support

### Web3Forms
- **Documentation** : https://docs.web3forms.com/
- **Support** : support@web3forms.com

### Novair
- **Email** : contact@novair-project.fr
- **Documentation** : Voir les autres fichiers .md

---

**Développé avec ❤️ par l'équipe Novair - Lycée Élisa Lemonnier**

_Guide Email - Version 1.0 - Mars 2026_
