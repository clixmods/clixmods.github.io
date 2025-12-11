Param(
    [string]$ContentPath = 'content/projects'
)

$ErrorActionPreference = 'Stop'

$fields = [ordered]@{
    programming_languages = 'data/programming_languages.json'
    frameworks_engines   = 'data/frameworks_engines.json'
    specialties          = 'data/specialties.json'
    soft_skills          = 'data/soft_skills.json'
    tools                = 'data/tools.json'
}

$validMap = @{}
foreach ($field in $fields.Keys) {
    $items = Get-Content -Path $fields[$field] | ConvertFrom-Json
    $set = [System.Collections.Generic.HashSet[string]]::new()
    foreach ($item in $items) {
        if ($item.PSObject.Properties.Name -contains 'key' -and $item.key) {
            [void]$set.Add([string]$item.key)
        }
    }
    $validMap[$field] = $set
}

$projectFiles = Get-ChildItem -Path $ContentPath -Recurse -Filter '*.md'
$invalid = @()

foreach ($file in $projectFiles) {
    $lines = Get-Content -Path $file.FullName
    for ($i = 0; $i -lt $lines.Length; $i++) {
        foreach ($field in $fields.Keys) {
            if ($lines[$i] -match "^$field\s*=\s*\[") {
                $j = $i
                $values = @()
                while ($j -lt $lines.Length) {
                    $line = $lines[$j]
                    $matches = [regex]::Matches($line, '"([^"]+)"')
                    foreach ($match in $matches) {
                        $values += $match.Groups[1].Value
                    }
                    if ($line -match '\]') { break }
                    $j++
                }
                foreach ($value in $values) {
                    if (-not $validMap[$field].Contains($value)) {
                        $invalid += [pscustomobject]@{
                            File  = $file.FullName
                            Field = $field
                            Value = $value
                        }
                    }
                }
                $i = $j
                break
            }
        }
    }
}

if ($invalid.Count -eq 0) {
    Write-Host 'No invalid references found.'
} else {
    $invalid | Sort-Object File, Field, Value | Format-Table -AutoSize
}
