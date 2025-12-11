Param(
    [string]$ContentPath = 'content/projects'
)

# Maps legacy or invalid references in project front matter to the authoritative data keys
$replacements = [ordered]@{
    '"spec_algorithmes"' = '"spec_algorithmique"'
    '"spec_construction_denvironnements"' = '"spec_environnement_building"'
    '"spec_eclairage"' = '"spec_lighting"'
    '"spec_experience_utilisateur"' = '"spec_experience_utilisateur_ux"'
    '"spec_maintenance_et_debogage"' = '"spec_maintenance_and_debogage"'
    '"Maintenance & Débogage"' = '"spec_maintenance_and_debogage"'
    '"spec_design_patterns_et_refactoring"' = '"spec_design_pattern_et_refactoring"'
    '"spec_gestion_de_communaute"' = '"skill_management_communaute"'
    '"skill_travail_dequipe"' = '"skill_travail_en_equipe"'
    '"CSS Grid"' = '"lang_css"'
    '"fw_blackops3"' = '"fw_black_ops_iii_engine"'
    '"fw_dotnet"' = '"fw_net"'
    '"fw_vuejs"' = '"fw_vue_js"'
    '"Hugo"' = '"fw_hugo"'
    '"JavaFX"' = '"fw_javafx"'
    '"TagLib#"' = '"fw_taglibsharp"'
    '"Editor Scripting"' = '"spec_developpement_outils"'
    'language: Java' = 'language: lang_java'
    'language: JavaScript' = 'language: lang_javascript'
    'language: lang_javaScript' = 'language: lang_javascript'
    'language: PHP' = 'language: lang_php'
    'language: SQL' = 'language: lang_sql'
    'language: C#' = 'language: lang_csharp'
    'language: C++' = 'language: lang_cpp'
    'language: CSS' = 'language: lang_css'
    'language: C' = 'language: lang_c'
    'language: lang_cSS' = 'language: lang_css'
    'language: Python' = 'language: lang_python'
    'language: HTML' = 'language: lang_html'
    'language: MySQL' = 'language: lang_mysql'
    'language: Oracle SQL' = 'language: lang_oracle_sql'
    'framework: Symfony' = 'framework: fw_symfony'
    'framework: Vue.js' = 'framework: fw_vue_js'
    'framework: fw_vuejs' = 'framework: fw_vue_js'
    'framework: JavaFX' = 'framework: fw_javafx'
    'framework: Cassandra' = 'framework: fw_cassandra'
    'framework: MongoDB' = 'framework: fw_mongodb'
    'framework: fw_unrealengine' = 'framework: fw_unreal_engine'
    'framework: Unity' = 'framework: fw_unity'
    'framework: Unreal Engine' = 'framework: fw_unreal_engine'
    'specialty: Data Management' = 'specialty: spec_gestion_des_donnees'
    'specialty: Gestion des données' = 'specialty: spec_gestion_des_donnees'
    'specialty: Application Development' = 'specialty: spec_developpement_dapplications'
    'specialty: Développement d''applications' = 'specialty: spec_developpement_dapplications'
    'specialty: Optimisation' = 'specialty: spec_optimisation'
    'specialty: Optimization' = 'specialty: spec_optimisation'
    'specialty: spec_ux' = 'specialty: spec_experience_utilisateur_ux'
    'specialty: spec_experience_utilisateur_ux_ux' = 'specialty: spec_experience_utilisateur_ux'
    'specialty: spec_experience_utilisateur_ux_ux_ux' = 'specialty: spec_experience_utilisateur_ux'
    'specialty: Algorithms' = 'specialty: spec_algorithmique'
    'specialty: spec_algorithmes' = 'specialty: spec_algorithmique'
    'specialty: Object-Oriented Programming' = 'specialty: spec_programmation_orientee_objet'
    'specialty: Security and Optimization' = 'specialty: spec_securite_et_optimisation'
    'specialty: API Development' = 'specialty: spec_developpement_dapi'
    'specialty: Design Patterns and Refactoring' = 'specialty: spec_design_pattern_et_refactoring'
    'specialty: Design Pattern et refactoring' = 'specialty: spec_design_pattern_et_refactoring'
    'specialty: Architecture Logicielle' = 'specialty: spec_architecture_logicielle'
    'specialty: spec_software_architecture' = 'specialty: spec_architecture_logicielle'
    'specialty: spec_game_development' = 'specialty: spec_developpement_de_jeux_video'
    'specialty: Développement de jeux vidéo' = 'specialty: spec_developpement_de_jeux_video'
    'specialty: spec_git' = 'specialty: spec_gestion_de_versions_avec_git'
    'skill: skill_teamwork' = 'skill: skill_travail_en_equipe'
    'skill: Travail en équipe' = 'skill: skill_travail_en_equipe'
    'skill: skill_project_management' = 'skill: skill_gestion_de_projet'
    'skill: Gestion de Projet' = 'skill: skill_gestion_de_projet'
    'skill: skill_problem_solving' = 'skill: skill_resolution_problemes'
    'skill: skill_creativity' = 'skill: skill_creativite'
    'skill: Créativité' = 'skill: skill_creativite'
    'skill: Management' = 'skill: skill_management_communaute'
    'skill: Critical Analysis' = 'skill: skill_analyse_critique'
    'skill: Analyse critique' = 'skill: skill_analyse_critique'
    'tool: Visual Studio' = 'tool: tool_visual_studio'
    'tool: tool_visualstudio' = 'tool: tool_visual_studio'
    'tool: SonarQube' = 'tool: tool_sonarqube'
    'tool: Trello' = 'tool: tool_trello'
    'tool: JetBrains' = 'tool: tool_jetbrains'
    'tool: GitLab' = 'tool: tool_gitlab'
    'tool: Photoshop' = 'tool: tool_photoshop'
    'tool: Davinci Resolve' = 'tool: tool_davinci_resolve'
}

$projectFiles = Get-ChildItem -Path $ContentPath -Recurse -Filter '*.md'
$changes = @()

foreach ($file in $projectFiles) {
    $original = Get-Content -Path $file.FullName -Raw
    $updated = $original
    $fileChanges = @()

    foreach ($entry in $replacements.GetEnumerator()) {
        $pattern = [regex]::Escape($entry.Key)
        $count = ([regex]::Matches($updated, $pattern)).Count
        if ($count -gt 0) {
            $updated = $updated.Replace($entry.Key, $entry.Value)
            $fileChanges += [pscustomobject]@{
                Pattern = $entry.Key
                Replacement = $entry.Value
                Count = $count
            }
        }
    }

    if ($updated -ne $original) {
        Set-Content -Path $file.FullName -Value $updated -Encoding UTF8
        $changes += [pscustomobject]@{
            File = $file.FullName
            Replacements = $fileChanges
        }
    }
}

if ($changes.Count -eq 0) {
    Write-Host 'No replacements were applied.'
} else {
    foreach ($change in $changes) {
        Write-Host "Updated $($change.File)"
        foreach ($detail in $change.Replacements) {
            Write-Host "  $($detail.Pattern) -> $($detail.Replacement) ($($detail.Count)x)"
        }
    }
}
