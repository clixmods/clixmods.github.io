# Migration script for education .en.md files with object format
# These files use { language: "...", framework: "...", etc. } format

# Define mappings from English names to keys
$mappings = @{
    # Programming Languages
    'language: C#' = 'language: lang_csharp'
    'language: C\+\+' = 'language: lang_cpp'
    'language: Python' = 'language: lang_python'
    'language: JavaScript' = 'language: lang_javascript'
    'language: TypeScript' = 'language: lang_typescript'
    'language: HTML' = 'language: lang_html'
    'language: CSS' = 'language: lang_css'
    'language: SQL' = 'language: lang_sql'
    'language: MySQL' = 'language: lang_mysql'
    'language: Java' = 'language: lang_java'
    'language: PHP' = 'language: lang_php'
    
    # Frameworks & Engines
    'framework: Unity' = 'framework: fw_unity'
    'framework: Unreal Engine' = 'framework: fw_unrealengine'
    'framework: \.NET' = 'framework: fw_dotnet'
    'framework: ASP\.NET' = 'framework: fw_aspnet'
    'framework: Blazor' = 'framework: fw_blazor'
    'framework: Symfony' = 'framework: fw_symfony'
    'framework: Vue\.js' = 'framework: fw_vuejs'
    'framework: React' = 'framework: fw_react'
    'framework: Angular' = 'framework: fw_angular'
    'framework: Laravel' = 'framework: fw_laravel'
    'framework: Entity Framework' = 'framework: fw_entityframework'
    
    # Specialties
    'specialty: Video Game Development' = 'specialty: spec_game_development'
    'specialty: Web Development' = 'specialty: spec_web_development'
    'specialty: Software Development' = 'specialty: spec_software_development'
    'specialty: Full-Stack Development' = 'specialty: spec_fullstack_development'
    'specialty: Frontend Development' = 'specialty: spec_frontend_development'
    'specialty: Backend Development' = 'specialty: spec_backend_development'
    'specialty: Database Management' = 'specialty: spec_database_management'
    'specialty: Data Modeling' = 'specialty: spec_data_modeling'
    'specialty: UML Modeling' = 'specialty: spec_uml_modeling'
    'specialty: Project Management' = 'specialty: spec_project_management_specialty'
    'specialty: Requirements Analysis' = 'specialty: spec_requirements_analysis'
    'specialty: Software Architecture' = 'specialty: spec_software_architecture'
    'specialty: Network Administration' = 'specialty: spec_network_administration'
    'specialty: System Administration' = 'specialty: spec_system_administration'
    'specialty: Application Integration' = 'specialty: spec_application_integration'
    'specialty: Game Design' = 'specialty: spec_game_design'
    'specialty: Level Design' = 'specialty: spec_level_design'
    'specialty: Technical Documentation' = 'specialty: spec_technical_documentation'
    'specialty: User Interface' = 'specialty: spec_ui'
    'specialty: User Experience \(UX\)' = 'specialty: spec_ux'
    'specialty: Quality Assurance' = 'specialty: spec_quality_assurance'
    'specialty: Testing' = 'specialty: spec_testing'
    'specialty: Agile Methodologies' = 'specialty: spec_agile'
    'specialty: Version Control with Git' = 'specialty: spec_git'
    
    # Soft Skills
    'skill: Teamwork' = 'skill: skill_teamwork'
    'skill: Creativity' = 'skill: skill_creativity'
    'skill: Problem Solving' = 'skill: skill_problem_solving'
    'skill: Project Management' = 'skill: skill_project_management'
    'skill: Autonomy' = 'skill: skill_autonomy'
    'skill: Communication' = 'skill: skill_communication'
    'skill: Adaptability' = 'skill: skill_adaptability'
    'skill: Leadership' = 'skill: skill_leadership'
    'skill: Critical Thinking' = 'skill: skill_critical_thinking'
    'skill: Time Management' = 'skill: skill_time_management'
    'skill: Organization' = 'skill: skill_organization'
    'skill: Active Listening' = 'skill: skill_active_listening'
    'skill: Research' = 'skill: skill_research'
    'skill: Analysis' = 'skill: skill_analysis'
    'skill: Synthesis' = 'skill: skill_synthesis'
    'skill: Writing' = 'skill: skill_writing'
    
    # Tools
    'tool: Fork' = 'tool: tool_fork'
    'tool: JetBrains' = 'tool: tool_jetbrains'
    'tool: Visual Studio' = 'tool: tool_visualstudio'
    'tool: VS Code' = 'tool: tool_vscode'
    'tool: GitHub' = 'tool: tool_github'
    'tool: GitLab' = 'tool: tool_gitlab'
    'tool: Trello' = 'tool: tool_trello'
    'tool: Jira' = 'tool: tool_jira'
    'tool: Discord' = 'tool: tool_discord'
    'tool: Notion' = 'tool: tool_notion'
    'tool: Figma' = 'tool: tool_figma'
    'tool: Photoshop' = 'tool: tool_photoshop'
    'tool: Docker' = 'tool: tool_docker'
    'tool: MySQL Workbench' = 'tool: tool_mysqlworkbench'
    'tool: phpMyAdmin' = 'tool: tool_phpmyadmin'
    'tool: Postman' = 'tool: tool_postman'
    'tool: Eclipse' = 'tool: tool_eclipse'
    'tool: NetBeans' = 'tool: tool_netbeans'
}

# Get education .en.md files
$files = Get-ChildItem -Path "c:\Projects\portfolio\content\educations" -Filter "*.en.md" -Recurse

$totalReplacements = 0
$filesProcessed = 0

Write-Host "Starting migration of education .en.md files..." -ForegroundColor Cyan
Write-Host "Found $($files.Count) files to process" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    # Skip _index.en.md files
    if ($file.Name -eq "_index.en.md") {
        Write-Host "Skipping: $($file.FullName)" -ForegroundColor DarkGray
        continue
    }
    
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Gray
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($key in $mappings.Keys) {
        $value = $mappings[$key]
        $pattern = $key
        
        # Count occurrences before replacement
        $matches = [regex]::Matches($content, $pattern)
        if ($matches.Count -gt 0) {
            Write-Host "  - Replacing $pattern with $value ($($matches.Count) occurrence(s))" -ForegroundColor DarkGray
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
    Write-Host ""
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Education migration completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
