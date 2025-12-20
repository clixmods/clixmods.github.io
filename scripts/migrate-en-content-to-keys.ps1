# Migration script for .en.md content files to use i18n keys
# This script replaces English skill names with their corresponding keys

# Define mappings from English names to keys
$mappings = @{
    # Programming Languages
    '"C#"' = '"lang_csharp"'
    '"C\+\+"' = '"lang_cpp"'
    '"Python"' = '"lang_python"'
    '"JavaScript"' = '"lang_javascript"'
    '"TypeScript"' = '"lang_typescript"'
    '"HTML"' = '"lang_html"'
    '"CSS"' = '"lang_css"'
    '"SQL"' = '"lang_sql"'
    '"MySQL"' = '"lang_mysql"'
    '"Java"' = '"lang_java"'
    '"PHP"' = '"lang_php"'
    '"Lua"' = '"lang_lua"'
    '"HLSL"' = '"lang_hlsl"'
    '"GLSL"' = '"lang_glsl"'
    '"Markdown"' = '"lang_markdown"'
    '"JSON"' = '"lang_json"'
    '"YAML"' = '"lang_yaml"'
    '"XML"' = '"lang_xml"'
    '"Bash"' = '"lang_bash"'
    '"PowerShell"' = '"lang_powershell"'
    
    # Frameworks & Engines
    '"Unity"' = '"fw_unity"'
    '"\.NET"' = '"fw_dotnet"'
    '"Blazor"' = '"fw_blazor"'
    '"ASP\.NET"' = '"fw_aspnet"'
    '"FastEndpoint"' = '"fw_fastendpoint"'
    '"SignalR"' = '"fw_signalr"'
    '"Entity Framework"' = '"fw_entityframework"'
    '"Symfony"' = '"fw_symfony"'
    '"Vue\.js"' = '"fw_vuejs"'
    '"React"' = '"fw_react"'
    '"Node\.js"' = '"fw_nodejs"'
    '"Express"' = '"fw_express"'
    '"Angular"' = '"fw_angular"'
    '"Bootstrap"' = '"fw_bootstrap"'
    '"Tailwind CSS"' = '"fw_tailwindcss"'
    '"jQuery"' = '"fw_jquery"'
    '"Laravel"' = '"fw_laravel"'
    '"Django"' = '"fw_django"'
    '"Flask"' = '"fw_flask"'
    '"Spring Boot"' = '"fw_springboot"'
    '"Unreal Engine"' = '"fw_unrealengine"'
    '"Godot"' = '"fw_godot"'
    '"GameMaker"' = '"fw_gamemaker"'
    '"TagLib#"' = '"fw_taglibsharp"'
    
    # Specialties
    '"Game Design"' = '"spec_game_design"'
    '"Level Design"' = '"spec_level_design"'
    '"Tools Development"' = '"spec_tools_development"'
    '"Gameplay Development"' = '"spec_gameplay_development"'
    '"Shaders"' = '"spec_shaders"'
    '"Software Architecture"' = '"spec_software_architecture"'
    '"Optimization"' = '"spec_optimization"'
    '"Security & Optimization"' = '"spec_security_optimization"'
    '"Object-Oriented Programming"' = '"spec_oop"'
    '"User Interface"' = '"spec_ui"'
    '"User Experience \(UX\)"' = '"spec_ux"'
    '"Version Control with Git"' = '"spec_git"'
    '"Maintenance & Debugging"' = '"spec_maintenance_debugging"'
    '"Real-time Development"' = '"spec_realtime"'
    '"Real-time"' = '"spec_realtime"'
    '"Real Time"' = '"spec_realtime"'
    '"API Development"' = '"spec_api_development"'
    '"Community Management"' = '"spec_community_management"'
    '"Problem Solving"' = '"skill_problem_solving"'
    '"Audio Integration"' = '"spec_audio_integration"'
    
    # Soft Skills
    '"Leadership"' = '"skill_leadership"'
    '"Project Management"' = '"skill_project_management"'
    '"Communication"' = '"skill_communication"'
    '"Vision/Visualization"' = '"skill_vision"'
    '"Teamwork"' = '"skill_teamwork"'
    '"Autonomy"' = '"skill_autonomy"'
    '"Adaptability"' = '"skill_adaptability"'
    '"Creativity"' = '"skill_creativity"'
    '"Critical Thinking"' = '"skill_critical_thinking"'
    '"Time Management"' = '"skill_time_management"'
    '"Continuous Learning"' = '"skill_continuous_learning"'
    '"Attention to Detail"' = '"skill_attention_to_detail"'
    '"Stress Management"' = '"skill_stress_management"'
    '"Active Listening"' = '"skill_active_listening"'
    '"Empathy"' = '"skill_empathy"'
    '"Conflict Resolution"' = '"skill_conflict_resolution"'
    '"Decision Making"' = '"skill_decision_making"'
    '"Organization"' = '"skill_organization"'
    '"Presentation"' = '"skill_presentation"'
    '"Negotiation"' = '"skill_negotiation"'
    
    # Tools
    '"Fork"' = '"tool_fork"'
    '"JetBrains"' = '"tool_jetbrains"'
    '"Trello"' = '"tool_trello"'
    '"Discord"' = '"tool_discord"'
    '"Photoshop"' = '"tool_photoshop"'
    '"Azure"' = '"tool_azure"'
    '"ClickUp"' = '"tool_clickup"'
    '"GitHub"' = '"tool_github"'
    '"Notion"' = '"tool_notion"'
    '"GitLab"' = '"tool_gitlab"'
    '"Bitbucket"' = '"tool_bitbucket"'
    '"Jira"' = '"tool_jira"'
    '"Slack"' = '"tool_slack"'
    '"Figma"' = '"tool_figma"'
    '"Blender"' = '"tool_blender"'
    '"Unity Hub"' = '"tool_unityhub"'
    '"Visual Studio"' = '"tool_visualstudio"'
    '"VS Code"' = '"tool_vscode"'
    '"IntelliJ IDEA"' = '"tool_intellij"'
    '"PyCharm"' = '"tool_pycharm"'
    '"WebStorm"' = '"tool_webstorm"'
    '"Rider"' = '"tool_rider"'
    '"Postman"' = '"tool_postman"'
    '"Docker"' = '"tool_docker"'
    '"Kubernetes"' = '"tool_kubernetes"'
    '"Jenkins"' = '"tool_jenkins"'
    '"Travis CI"' = '"tool_travisci"'
    '"CircleCI"' = '"tool_circleci"'
    '"AWS"' = '"tool_aws"'
    '"Google Cloud"' = '"tool_googlecloud"'
    '"Heroku"' = '"tool_heroku"'
    '"Vercel"' = '"tool_vercel"'
    '"Netlify"' = '"tool_netlify"'
}

# Get all .en.md files
$files = Get-ChildItem -Path "c:\Projects\portfolio\content" -Filter "*.en.md" -Recurse

$totalReplacements = 0
$filesProcessed = 0

Write-Host "Starting migration of .en.md content files..." -ForegroundColor Cyan
Write-Host "Found $($files.Count) .en.md files to process" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
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
Write-Host "Migration completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
