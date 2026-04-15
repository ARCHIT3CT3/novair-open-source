# ========================================
# Script de Build et Déploiement - Novair
# ========================================
# Ce script automatise le processus de build pour le déploiement sur OVH
# Usage: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Novair - Script de Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Node.js est installé
Write-Host "[1/6] Vérification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js n'est pas installé!" -ForegroundColor Red
    Write-Host "Téléchargez-le sur: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier si le dossier node_modules existe
Write-Host ""
Write-Host "[2/6] Vérification des dépendances..." -ForegroundColor Yellow
if (-Not (Test-Path "node_modules")) {
    Write-Host "Les dépendances ne sont pas installées." -ForegroundColor Yellow
    Write-Host "Installation en cours..." -ForegroundColor Yellow

    # Détecter le gestionnaire de packages
    if (Test-Path "pnpm-lock.yaml") {
        Write-Host "Utilisation de pnpm..." -ForegroundColor Cyan
        pnpm install
    } elseif (Test-Path "yarn.lock") {
        Write-Host "Utilisation de yarn..." -ForegroundColor Cyan
        yarn install
    } else {
        Write-Host "Utilisation de npm..." -ForegroundColor Cyan
        npm install
    }

    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dépendances installées avec succès" -ForegroundColor Green
} else {
    Write-Host "✓ Dépendances déjà installées" -ForegroundColor Green
}

# Nettoyer les anciens builds
Write-Host ""
Write-Host "[3/6] Nettoyage des anciens builds..." -ForegroundColor Yellow
if (Test-Path "out") {
    Remove-Item -Path "out" -Recurse -Force
    Write-Host "✓ Dossier 'out' supprimé" -ForegroundColor Green
}
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "✓ Dossier '.next' supprimé" -ForegroundColor Green
}

# Builder le projet
Write-Host ""
Write-Host "[4/6] Build du projet en cours..." -ForegroundColor Yellow
Write-Host "Cela peut prendre quelques minutes..." -ForegroundColor Cyan

# Détecter le gestionnaire de packages
if (Test-Path "pnpm-lock.yaml") {
    pnpm build
} elseif (Test-Path "yarn.lock") {
    yarn build
} else {
    npm run build
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Erreur lors du build" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build terminé avec succès" -ForegroundColor Green

# Copier le fichier .htaccess
Write-Host ""
Write-Host "[5/6] Copie du fichier .htaccess..." -ForegroundColor Yellow
$htaccessSource = "public\.htaccess"
$htaccessDest = "out\.htaccess"

if (Test-Path $htaccessSource) {
    Copy-Item -Path $htaccessSource -Destination $htaccessDest -Force
    Write-Host "✓ Fichier .htaccess copié dans le dossier 'out'" -ForegroundColor Green
} else {
    Write-Host "! Fichier .htaccess non trouvé dans 'public'" -ForegroundColor Yellow
    Write-Host "  Le site fonctionnera quand même, mais sans optimisations serveur" -ForegroundColor Yellow
}

# Vérifier le contenu du dossier out
Write-Host ""
Write-Host "[6/6] Vérification du build..." -ForegroundColor Yellow
if (Test-Path "out\index.html") {
    Write-Host "✓ index.html trouvé" -ForegroundColor Green
} else {
    Write-Host "✗ index.html non trouvé!" -ForegroundColor Red
    exit 1
}

if (Test-Path "out\_next") {
    Write-Host "✓ Dossier _next trouvé" -ForegroundColor Green
} else {
    Write-Host "! Dossier _next non trouvé" -ForegroundColor Yellow
}

# Calculer la taille du build
$outSize = (Get-ChildItem -Path "out" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "✓ Taille du build: $([math]::Round($outSize, 2)) MB" -ForegroundColor Green

# Afficher le résumé
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Build terminé avec succès! 🚀" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Ouvrez FileZilla" -ForegroundColor White
Write-Host "2. Connectez-vous à votre serveur OVH" -ForegroundColor White
Write-Host "3. Naviguez vers le dossier 'out' en local" -ForegroundColor White
Write-Host "4. Transférez TOUT le contenu vers le dossier 'www' ou 'public_html' sur le serveur" -ForegroundColor White
Write-Host "5. Attendez la fin du transfert" -ForegroundColor White
Write-Host "6. Accédez à votre site: http://votre-domaine.com" -ForegroundColor White
Write-Host ""
Write-Host "Pour plus de détails, consultez: DEPLOIEMENT_OVH.md" -ForegroundColor Cyan
Write-Host ""

# Ouvrir le dossier out dans l'explorateur
Write-Host "Voulez-vous ouvrir le dossier 'out' dans l'explorateur? (O/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "O" -or $response -eq "o") {
    Invoke-Item "out"
    Write-Host "✓ Dossier 'out' ouvert" -ForegroundColor Green
}

Write-Host ""
Write-Host "Bon déploiement! 🎉" -ForegroundColor Magenta
