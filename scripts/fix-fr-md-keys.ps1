# Fix French .md files to use keys instead of French names
# This mirrors what was done for .en.md files

$mappings = @{
    # Specialties - French names to keys
    '"Programmation orientée objet"' = '"spec_programmation_orientee_objet"'
    '"Architecture logicielle"' = '"spec_architecture_logicielle"'
    '"Sécurité et optimisation"' = '"spec_securite_et_optimisation"'
    '"Gestion de versions avec Git"' = '"spec_gestion_de_versions_avec_git"'
    '"Design Pattern et Refactoring"' = '"spec_design_pattern_et_refactoring"'
    '"Developpement d''API"' = '"spec_developpement_dapi"'
    '"Developpement API"' = '"spec_developpement_dapi"'
    '"Game Design"' = '"spec_game_design"'
    '"Level Design"' = '"spec_level_design"'
    '"Developpement outils"' = '"spec_developpement_outils"'
    '"Developpement Gameplay"' = '"spec_developpement_gameplay"'
    '"Shaders"' = '"spec_shaders"'
    '"Optimisation"' = '"spec_optimisation"'
    '"Interface utilisateur"' = '"spec_interface_utilisateur"'
    '"Experience utilisateur \(UX\)"' = '"spec_experience_utilisateur"'
    '"Maintenance et debogage"' = '"spec_maintenance_et_debogage"'
    '"Temps reel"' = '"spec_temps_reel"'
    '"Integration Audio"' = '"spec_integration_audio"'
    '"Gestion de communaute"' = '"spec_gestion_de_communaute"'
    '"Eclairage"' = '"spec_eclairage"'
    '"Construction environnements"' = '"spec_construction_denvironnements"'
    '"Modding"' = '"spec_modding"'
    '"Concept Art"' = '"spec_concept_art"'
    '"Algorithmes"' = '"spec_algorithmes"'
    '"Gestion de fichiers"' = '"spec_gestion_de_fichiers"'
    '"Portage console"' = '"spec_portage_console"'
    
    # Soft Skills - French names to keys
    '"Resolution de problemes"' = '"skill_resolution_de_problemes"'
    '"Communication"' = '"skill_communication"'
    '"Travail equipe"' = '"skill_travail_dequipe"'
    '"Leadership"' = '"skill_leadership"'
    '"Gestion de projet"' = '"skill_gestion_de_projet"'
    '"Vision/Visualisation"' = '"skill_vision_visualisation"'
    '"Creativite"' = '"skill_creativite"'
    '"Autonomie"' = '"skill_autonomie"'
    '"Adaptabilite"' = '"skill_adaptabilite"'
    '"Esprit critique"' = '"skill_esprit_critique"'
    '"Gestion du temps"' = '"skill_gestion_du_temps"'
    '"Organisation"' = '"skill_organisation"'
    '"Ecoute active"' = '"skill_ecoute_active"'
    '"Recherche"' = '"skill_recherche"'
    '"Analyse"' = '"skill_analyse"'
    '"Synthese"' = '"skill_synthese"'
    '"Redaction"' = '"skill_redaction"'
    
    # Also fix in education field formats
    'specialty: Programmation orientée objet' = 'specialty: spec_programmation_orientee_objet'
    'specialty: Architecture logicielle' = 'specialty: spec_architecture_logicielle'
    'specialty: Sécurité et optimisation' = 'specialty: spec_securite_et_optimisation'
    'specialty: Gestion de versions avec Git' = 'specialty: spec_gestion_de_versions_avec_git'
    'specialty: Developpement API' = 'specialty: spec_developpement_dapi'
    'specialty: Game Design' = 'specialty: spec_game_design'
    'specialty: Level Design' = 'specialty: spec_level_design'
    'specialty: Developpement outils' = 'specialty: spec_developpement_outils'
    'specialty: Interface utilisateur' = 'specialty: spec_interface_utilisateur'
    
    'skill: Resolution de problemes' = 'skill: skill_resolution_de_problemes'
    'skill: Communication' = 'skill: skill_communication'
    'skill: Travail equipe' = 'skill: skill_travail_dequipe'
    'skill: Leadership' = 'skill: skill_leadership'
    'skill: Gestion de projet' = 'skill: skill_gestion_de_projet'
    'skill: Creativite' = 'skill: skill_creativite'
    'skill: Autonomie' = 'skill: skill_autonomie'
}

# Get all .md files (French versions, excluding .en.md)
$files = Get-ChildItem -Path "c:\Projects\portfolio\content" -Filter "*.md" -Recurse | Where-Object { $_.Name -notmatch ".en.md" }

$totalReplacements = 0
$filesProcessed = 0

Write-Host "Fixing French .md files to use keys instead of names..." -ForegroundColor Cyan
Write-Host "Found $($files.Count) French .md files to process" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Gray
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    # Sort keys by length (longest first) to avoid partial replacements
    $sortedKeys = $mappings.Keys | Sort-Object -Property Length -Descending
    
    foreach ($key in $sortedKeys) {
        $value = $mappings[$key]
        $pattern = $key
        
        # Count occurrences before replacement
        $matches = [regex]::Matches($content, $pattern)
        if ($matches.Count -gt 0) {
            Write-Host "  - Replacing $pattern with $value ($($matches.Count) occurrence(s))" -ForegroundColor DarkCyan
            $content = $content -replace $pattern, $value
            $fileReplacements += $matches.Count
            $totalReplacements += $matches.Count
        }
    }
    
    # Write back if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $filesProcessed++
        Write-Host "  OK Updated with $fileReplacements replacement(s)" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "French .md files fix completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
