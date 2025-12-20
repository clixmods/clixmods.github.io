# Final migration script for remaining English names in .en.md files

# Define final mappings
$mappings = @{
    # Fix tool names to match existing i18n keys
    '"tool_vscode"' = '"tool_visual_studio_code"'
    '"tool_sublime"' = '"tool_sublime_text"'
    '"tool_maya"' = '"tool_autodesk_maya"'
    '"tool_visualstudio"' = '"tool_visual_studio"'
    
    # Additional specialties
    '"Design Patterns & Refactoring"' = '"spec_design_patterns"'
    '"Algorithms"' = '"spec_algorithms"'
    '"Real-Time"' = '"spec_temps_reel"'
    '"Real Time"' = '"spec_temps_reel"'
    '"File Management"' = '"spec_file_management"'
    '"Console Porting"' = '"spec_console_porting"'
    
    # Additional tools (that already exist in i18n)
    '"HacknPlan"' = '"tool_hacknplan"'
    '"SonyVegas"' = '"tool_sonyvegas"'
    '"Copilot"' = '"tool_copilot"'
    
    # Programming language fix
    '"LUA"' = '"lang_lua"'
}

# Get all .en.md files
$files = Get-ChildItem -Path "c:\Projects\portfolio\content" -Filter "*.en.md" -Recurse

$totalReplacements = 0
$filesProcessed = 0

Write-Host "Starting final migration of remaining keys in .en.md files..." -ForegroundColor Cyan
Write-Host "Found $($files.Count) .en.md files to process" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Gray
    
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
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Final migration completed!" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed / $($files.Count)" -ForegroundColor Yellow
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
