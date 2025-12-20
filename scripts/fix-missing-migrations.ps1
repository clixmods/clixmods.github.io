# Fix missing migrations for specific skills

$ErrorActionPreference = "Stop"

# Define the mappings that were missed
$replacements = @{
    # Soft Skills
    '"Résolution Problèmes"' = '"skill_resolution_problemes"'
    '- Résolution Problèmes' = '- skill_resolution_problemes'
    
    # Specialties
    '"Sécurité et optimisation"' = '"spec_securite_et_optimisation"'
    '- Sécurité et optimisation' = '- spec_securite_et_optimisation'
    
    '"Développement Outils"' = '"spec_developpement_outils"'
    '- Développement Outils' = '- spec_developpement_outils'
    
    '"Développement Gameplay"' = '"spec_developpement_gameplay"'
    '- Développement Gameplay' = '- spec_developpement_gameplay'
    
    '"Intégration Audio"' = '"spec_integration_audio"'
    '- Intégration Audio' = '- spec_integration_audio'
    
    '"Expérience utilisateur \(UX\)"' = '"spec_experience_utilisateur_ux"'
    '- Expérience utilisateur \(UX\)' = '- spec_experience_utilisateur_ux'
    
    '"Développement d''API"' = '"spec_developpement_dapi"'
    "- Développement d'API" = '- spec_developpement_dapi'
    
    '"Temps Réel"' = '"spec_temps_reel"'
    '- Temps Réel' = '- spec_temps_reel'
    
    '"Management Communauté"' = '"skill_management_communaute"'
    '- Management Communauté' = '- skill_management_communaute'
    
    '"Travail d''équipe"' = '"skill_travail_en_equipe"'
    "- Travail d'équipe" = '- skill_travail_en_equipe'
}

$contentDirs = @(
    (Join-Path $PSScriptRoot "..\content\projects"),
    (Join-Path $PSScriptRoot "..\content\educations"),
    (Join-Path $PSScriptRoot "..\content\experiences")
)

$totalReplacements = 0
$filesModified = 0

Write-Host "[START] Fixing missing migrations`n" -ForegroundColor Cyan

function Fix-File {
    param([string]$FilePath)
    
    # Skip English files
    if ($FilePath -match '\.en\.md$') {
        return 0
    }
    
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($pattern in $replacements.Keys) {
        $replacement = $replacements[$pattern]
        
        if ($content -match [regex]::Escape($pattern)) {
            $content = $content -replace [regex]::Escape($pattern), $replacement
            Write-Host "  [FIX] $(Split-Path $FilePath -Leaf): $pattern -> $replacement" -ForegroundColor Green
            $fileReplacements++
            $script:totalReplacements++
        }
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $FilePath -Value $content -Encoding UTF8 -NoNewline
        $script:filesModified++
        return 1
    }
    
    return 0
}

foreach ($dir in $contentDirs) {
    if (Test-Path $dir) {
        Write-Host "`n[DIR] Processing: $dir" -ForegroundColor Yellow
        Get-ChildItem -Path $dir -Recurse -Filter "*.md" | ForEach-Object {
            Fix-File -FilePath $_.FullName
        }
    }
}

Write-Host "`n`n[DONE] Fix complete!" -ForegroundColor Green
Write-Host "[STATS] Files modified: $filesModified" -ForegroundColor Cyan
Write-Host "[STATS] Total replacements: $totalReplacements" -ForegroundColor Cyan
