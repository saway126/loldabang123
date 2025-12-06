# Requires: vercel CLI installed and logged in
Write-Host "=== Riot API Key Update (Vercel) ===" -ForegroundColor Cyan
$key = Read-Host "Enter new RIOT_API_KEY"
if ([string]::IsNullOrWhiteSpace($key)) {
    Write-Host "No key provided. Aborting." -ForegroundColor Yellow
    exit 1
}

# Add/replace env on Vercel (production scope; add --env=development if needed)
Write-Host "Updating Vercel env RIOT_API_KEY (production)..." -ForegroundColor Cyan
echo $key | vercel env add RIOT_API_KEY production --force

# Optional: pull env to local .env (comment out if undesired)
# vercel env pull .env.local

# Trigger deploy
Write-Host "Deploying..." -ForegroundColor Cyan
vercel deploy

Write-Host "Done." -ForegroundColor Green

