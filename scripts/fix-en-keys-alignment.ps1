# Critical fix: Align .en.md files to use the SAME keys as .md files
# Keys must be identical across languages, only translations differ

$mappings = @{
    # Programming Languages - fix to match French keys
    '"lang_csharp"' = '"lang_csharp"'  # Already correct
    '"lang_cpp"' = '"lang_cpp"'  # Already correct
    '"lang_gsc"' = '"lang_gsc"'  # Already correct
    '"lang_lua"' = '"lang_lua"'  # Already correct
    
    # Frameworks - fix to match French keys
    '"fw_unity"' = '"fw_unity"'  # Already correct
    '"fw_blackops3"' = '"fw_blackops3"'  # Already correct
    
    # Specialties - CRITICAL FIXES NEEDED
    '"spec_oop"' = '"spec_programmation_orientee_objet"'
    '"spec_software_architecture"' = '"spec_architecture_logicielle"'
    '"spec_security_optimization"' = '"spec_securite_et_optimisation"'
    '"spec_git"' = '"spec_gestion_de_versions_avec_git"'
    '"spec_design_patterns"' = '"spec_design_pattern_et_refactoring"'
    '"spec_api_development"' = '"spec_developpement_dapi"'
    '"spec_game_design"' = '"spec_game_design"'  # Already correct
    '"spec_level_design"' = '"spec_level_design"'  # Already correct
    '"spec_tools_development"' = '"spec_developpement_outils"'
    '"spec_gameplay_development"' = '"spec_developpement_gameplay"'
    '"spec_shaders"' = '"spec_shaders"'  # Already correct
    '"spec_optimization"' = '"spec_optimisation"'
    '"spec_ui"' = '"spec_interface_utilisateur"'
    '"spec_ux"' = '"spec_experience_utilisateur"'
    '"spec_maintenance_debugging"' = '"spec_maintenance_et_debogage"'
    '"spec_realtime"' = '"spec_temps_reel"'
    '"spec_audio_integration"' = '"spec_integration_audio"'
    '"spec_community_management"' = '"spec_gestion_de_communaute"'
    '"spec_lighting"' = '"spec_eclairage"'
    '"spec_environment_building"' = '"spec_construction_denvironnements"'
    '"spec_modding"' = '"spec_modding"'  # Already correct
    '"spec_concept_art"' = '"spec_concept_art"'  # Already correct
    '"spec_algorithms"' = '"spec_algorithmes"'
    '"spec_temps_reel"' = '"spec_temps_reel"'  # Already correct if used
    '"spec_file_management"' = '"spec_gestion_de_fichiers"'
    '"spec_console_porting"' = '"spec_portage_console"'
    
    # Soft Skills - fix to match French keys
    '"skill_problem_solving"' = '"skill_resolution_problemes"'
    '"skill_communication"' = '"skill_communication"'  # Already correct
    '"skill_teamwork"' = '"skill_travail_dequipe"'
    '"skill_leadership"' = '"skill_leadership"'  # Already correct
    '"skill_project_management"' = '"skill_gestion_de_projet"'
    '"skill_vision"' = '"skill_vision_visualisation"'
    '"skill_creativity"' = '"skill_creativite"'
    '"skill_autonomy"' = '"skill_autonomie"'
    '"skill_adaptability"' = '"skill_adaptabilite"'
    '"skill_critical_thinking"' = '"skill_esprit_critique"'
    '"skill_time_management"' = '"skill_gestion_du_temps"'
    '"skill_organization"' = '"skill_organisation"'
    '"skill_active_listening"' = '"skill_ecoute_active"'
    '"skill_research"' = '"skill_recherche"'
    '"skill_analysis"' = '"skill_analyse"'
    '"skill_synthesis"' = '"skill_synthese"'
    '"skill_writing"' = '"skill_redaction"'
    
    # Tools - most should be correct already, but verify
    '"tool_fork"' = '"tool_fork"'
    '"tool_jetbrains"' = '"tool_jetbrains"'
    '"tool_visual_studio"' = '"tool_visual_studio"'
    '"tool_visual_studio_code"' = '"tool_visual_studio_code"'
    '"tool_github"' = '"tool_github"'
    '"tool_gitlab"' = '"tool_gitlab"'
    '"tool_discord"' = '"tool_discord"'
    '"tool_notion"' = '"tool_notion"'
    '"tool_trello"' = '"tool_trello"'
    '"tool_clickup"' = '"tool_clickup"'
    '"tool_photoshop"' = '"tool_photoshop"'
    '"tool_azure"' = '"tool_azure"'
    '"tool_radiant"' = '"tool_radiant"'
    '"tool_autodesk_maya"' = '"tool_autodesk_maya"'
    '"tool_sublime_text"' = '"tool_sublime_text"'
    '"tool_hacknplan"' = '"tool_hacknplan"'
    '"tool_sonyvegas"' = '"tool_sonyvegas"'
    '"tool_copilot"' = '"tool_copilot"'
}

# Get all .en.md files
$files = Get-ChildItem -Path "c:\Projects\portfolio\content" -Filter "*.en.md" -Recurse

$totalReplacements = 0
$filesProcessed = 0

Write-Host "CRITICAL FIX: Aligning .en.md keys to match .md files..." -ForegroundColor Red
Write-Host "Keys MUST be identical across languages!" -ForegroundColor Yellow
Write-Host "Found $($files.Count) .en.md files to process" -ForegroundColor Yellow
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
        
        # Skip if key and value are the same (already correct)
        if ($key -eq $value) {
            continue
        }
        
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
Write-Host "================================================" -ForegroundColor Red
Write-Host "CRITICAL FIX completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Red
