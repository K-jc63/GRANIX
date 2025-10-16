$ErrorActionPreference = "Stop"

# Usage: powershell -ExecutionPolicy Bypass -File tools/export_profile.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$project = Resolve-Path (Join-Path $root "..")
$htmlPath = Join-Path $project "company-profile.html"
$outDir = Join-Path $project "exports"
$outPdf = Join-Path $outDir "Granix_Company_Profile_2025.pdf"

if (-not (Test-Path $htmlPath)) { throw "Profile HTML not found: $htmlPath" }
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# Use Microsoft Edge to print to PDF in headless mode
$edge = "$Env:ProgramFiles (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $edge)) { throw "Microsoft Edge not found. Please install Edge." }

# Use file:/// URL for local rendering and allow brief time to paint
$fileUrl = "file:///" + ($htmlPath -replace "\\","/")
$args = "--headless=new --disable-gpu --no-sandbox --run-all-compositor-stages-before-draw --virtual-time-budget=2500 --print-to-pdf=`"$outPdf`" `"$fileUrl`""
Write-Host "Exporting to PDF -> $outPdf"
Start-Process -FilePath $edge -ArgumentList $args -Wait

if (-not (Test-Path $outPdf)) { throw "Failed to export PDF." }
Write-Host "Done: $outPdf"


