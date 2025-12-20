# Migration script for missing English skill names in .en.md files
# This script covers additional skills that were not in the first migration

# Define additional mappings
$mappings = @{
    # Specialties (additional)
    '"Lighting"' = '"spec_lighting"'
    '"Environment Building"' = '"spec_environment_building"'
    '"Modding"' = '"spec_modding"'
    '"3D Modeling"' = '"spec_3d_modeling"'
    '"Animation"' = '"spec_animation"'
    '"Sound Design"' = '"spec_sound_design"'
    '"Video Editing"' = '"spec_video_editing"'
    '"Graphic Design"' = '"spec_graphic_design"'
    '"Concept Art"' = '"spec_concept_art"'
    '"Technical Art"' = '"spec_technical_art"'
    '"Performance Optimization"' = '"spec_performance_optimization"'
    '"Memory Management"' = '"spec_memory_management"'
    '"Multiplayer Programming"' = '"spec_multiplayer_programming"'
    '"AI Programming"' = '"spec_ai_programming"'
    '"Physics Programming"' = '"spec_physics_programming"'
    '"Procedural Generation"' = '"spec_procedural_generation"'
    '"Scripting"' = '"spec_scripting"'
    
    # Programming Languages (additional)
    '"GSC"' = '"lang_gsc"'
    '"Lua Scripting"' = '"lang_lua"'
    '"C"' = '"lang_c"'
    '"Kotlin"' = '"lang_kotlin"'
    '"Swift"' = '"lang_swift"'
    '"Rust"' = '"lang_rust"'
    '"Go"' = '"lang_go"'
    '"Ruby"' = '"lang_ruby"'
    
    # Frameworks & Engines (additional)
    '"Black Ops III engine"' = '"fw_blackops3"'
    '"Source Engine"' = '"fw_source_engine"'
    '"CryEngine"' = '"fw_cryengine"'
    '"Frostbite"' = '"fw_frostbite"'
    '"RPG Maker"' = '"fw_rpgmaker"'
    '"Construct"' = '"fw_construct"'
    '"Phaser"' = '"fw_phaser"'
    '"Three\.js"' = '"fw_threejs"'
    '"Babylon\.js"' = '"fw_babylonjs"'
    
    # Tools (additional)
    '"Visual Studio Code"' = '"tool_vscode"'
    '"Sublime Text"' = '"tool_sublime"'
    '"Atom"' = '"tool_atom"'
    '"Notepad\+\+"' = '"tool_notepadpp"'
    '"AutoDesk Maya"' = '"tool_maya"'
    '"3ds Max"' = '"tool_3dsmax"'
    '"ZBrush"' = '"tool_zbrush"'
    '"Substance Painter"' = '"tool_substancepainter"'
    '"Substance Designer"' = '"tool_substancedesigner"'
    '"Houdini"' = '"tool_houdini"'
    '"Radiant"' = '"tool_radiant"'
    '"Hammer Editor"' = '"tool_hammer"'
    '"Unreal Editor"' = '"tool_unrealeditor"'
    '"Unity Editor"' = '"tool_unityeditor"'
    '"Perforce"' = '"tool_perforce"'
    '"Sourcetree"' = '"tool_sourcetree"'
    '"Gimp"' = '"tool_gimp"'
    '"Inkscape"' = '"tool_inkscape"'
    '"Audacity"' = '"tool_audacity"'
    '"FL Studio"' = '"tool_flstudio"'
    '"Ableton Live"' = '"tool_ableton"'
    '"Reaper"' = '"tool_reaper"'
    '"FMOD"' = '"tool_fmod"'
    '"Wwise"' = '"tool_wwise"'
    '"Premiere Pro"' = '"tool_premiere"'
    '"After Effects"' = '"tool_aftereffects"'
    '"DaVinci Resolve"' = '"tool_davinci"'
    '"OBS Studio"' = '"tool_obs"'
    '"Streamlabs"' = '"tool_streamlabs"'
    '"Confluence"' = '"tool_confluence"'
    '"Asana"' = '"tool_asana"'
    '"Monday\.com"' = '"tool_monday"'
    '"Linear"' = '"tool_linear"'
    
    # Soft Skills (additional - if any were missed)
    '"Collaboration"' = '"skill_collaboration"'
    '"Mentoring"' = '"skill_mentoring"'
    '"Teaching"' = '"skill_teaching"'
    '"Public Speaking"' = '"skill_public_speaking"'
    '"Customer Service"' = '"skill_customer_service"'
    '"Sales"' = '"skill_sales"'
    '"Marketing"' = '"skill_marketing"'
}

# Get all .en.md files
$files = Get-ChildItem -Path "c:\Projects\portfolio\content" -Filter "*.en.md" -Recurse

$totalReplacements = 0
$filesProcessed = 0

Write-Host "Starting migration of missing keys in .en.md files..." -ForegroundColor Cyan
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
Write-Host "Missing keys migration completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
