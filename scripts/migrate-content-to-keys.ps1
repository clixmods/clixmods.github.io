# Migration Script: Convert content files to use i18n keys instead of French names
# 
# This script migrates all content files (projects, educations, experiences) to use
# i18n keys (e.g., "lang_csharp", "fw_unity") instead of French names (e.g., "C#", "Unity").
# 
# Usage: .\scripts\migrate-content-to-keys.ps1

$ErrorActionPreference = "Stop"

# Load the name-to-key mapping
$mappingPath = Join-Path $PSScriptRoot "..\data\name-to-key-mapping.json"
$mappingJson = Get-Content $mappingPath -Raw | ConvertFrom-Json

# Content directories to process
$contentDirs = @(
    (Join-Path $PSScriptRoot "..\content\projects"),
    (Join-Path $PSScriptRoot "..\content\educations"),
    (Join-Path $PSScriptRoot "..\content\experiences")
)

# Statistics
$totalFilesProcessed = 0
$totalReplacements = 0

Write-Host "[START] Content migration to i18n keys`n" -ForegroundColor Cyan

# Process a single content file
function Process-ContentFile {
    param(
        [string]$FilePath,
        [hashtable]$Mappings
    )
    
    # Skip English files
    if ($FilePath -match '\.en\.md$') {
        Write-Host "  [SKIP] English file: $(Split-Path $FilePath -Leaf)" -ForegroundColor Gray
        return 0
    }
    
    $script:totalFilesProcessed++
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    Write-Host "`n[FILE] Processing: $(Split-Path $FilePath -Leaf)" -ForegroundColor Yellow
    
    # Process each category
    foreach ($category in @('programming_languages', 'frameworks_engines', 'specialties', 'soft_skills', 'tools')) {
        $categoryMap = $Mappings[$category]
        
        if (-not $categoryMap) { continue }
        
        # Sort by length (longest first) to avoid partial replacements
        $sortedNames = $categoryMap.PSObject.Properties.Name | Sort-Object -Property Length -Descending
        
        foreach ($frenchName in $sortedNames) {
            $key = $categoryMap.$frenchName
            
            # Escape special regex characters
            $escapedName = [regex]::Escape($frenchName)
            
            # Pattern for TOML arrays: "Name" or 'Name'
            $tomlPattern = "[`"']$escapedName[`"']"
            if ($content -match $tomlPattern) {
                $content = $content -replace $tomlPattern, "`"$key`""
                Write-Host "  [REPLACE] $category : $frenchName -> $key" -ForegroundColor Green
                $fileReplacements++
            }
            
            # Pattern for YAML arrays: - Name or - "Name" or - 'Name'
            $yamlPattern = "(?m)^(\s*)-\s+[`"']?$escapedName[`"']?\s*$"
            if ($content -match $yamlPattern) {
                $content = $content -replace $yamlPattern, "`$1- $key"
                Write-Host "  [REPLACE] $category : $frenchName -> $key" -ForegroundColor Green
                $fileReplacements++
            }
        }
    }
    
    # Write back if modified
    if ($content -ne $originalContent) {
        Set-Content -Path $FilePath -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  [OK] File updated - $fileReplacements replacements" -ForegroundColor Green
        $script:totalReplacements += $fileReplacements
    } else {
        Write-Host "  [SKIP] No changes needed" -ForegroundColor Gray
    }
    
    return $fileReplacements
}

# Process all files in a directory recursively
function Process-Directory {
    param(
        [string]$DirPath,
        [hashtable]$Mappings
    )
    
    if (-not (Test-Path $DirPath)) {
        Write-Host "[WARN] Directory not found: $DirPath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n[DIR] Processing directory: $($DirPath -replace [regex]::Escape($PSScriptRoot) + '\\..\\', '')" -ForegroundColor Cyan
    
    Get-ChildItem -Path $DirPath -Recurse -Filter "*.md" | ForEach-Object {
        Process-ContentFile -FilePath $_.FullName -Mappings $Mappings
    }
}

# Convert JSON to hashtable for easier access
$mappings = @{
    programming_languages = $mappingJson.programming_languages.fr
    frameworks_engines = $mappingJson.frameworks_engines.fr
    specialties = $mappingJson.specialties.fr
    soft_skills = $mappingJson.soft_skills.fr
    tools = $mappingJson.tools.fr
}

# Process each content directory
foreach ($dir in $contentDirs) {
    Process-Directory -DirPath $dir -Mappings $mappings
}

Write-Host "`n`n[DONE] Migration complete!" -ForegroundColor Green
Write-Host "[STATS] Statistics:" -ForegroundColor Cyan
Write-Host "   - Files processed: $totalFilesProcessed" -ForegroundColor White
Write-Host "   - Total replacements: $totalReplacements" -ForegroundColor White
Write-Host "`n[WARN] Important: Review the changes and test your site before committing." -ForegroundColor Yellow
