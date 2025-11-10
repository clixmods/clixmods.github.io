param(
  [string]$Path
)
if (-not (Test-Path $Path)) { Write-Host "File not found: $Path"; exit 1 }
$raw = Get-Content -Raw $Path
$start = $raw.IndexOf('Madame, Monsieur,')
$endMarker = 'Clément GARCIA'
$end = $raw.LastIndexOf($endMarker)
if ($start -lt 0 -or $end -lt 0) { Write-Host 'Markers not found'; exit 2 }
$body = $raw.Substring($start, ($end + $endMarker.Length) - $start)
Write-Host ("BodyLength={0}" -f $body.Length)
