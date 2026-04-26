# Install the integrity-framework CLI on Windows.
# Usage:
#   irm https://theintegrityframework.org/install.ps1 | iex
#
# Clones the directory repo to $env:INTEGRITY_HOME (default $HOME\.integrity-framework)
# and writes a wrapper integrity.cmd to a PATH location.

$ErrorActionPreference = 'Stop'

$repoUrl    = if ($env:INTEGRITY_REPO_URL) { $env:INTEGRITY_REPO_URL } else { 'https://github.com/Startvest-LLC/theintegrityframework.git' }
$installDir = if ($env:INTEGRITY_HOME)     { $env:INTEGRITY_HOME }     else { Join-Path $HOME '.integrity-framework' }
$binDir     = if ($env:INTEGRITY_BIN_DIR)  { $env:INTEGRITY_BIN_DIR }  else { Join-Path $HOME 'bin' }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'git is required but not installed.'
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'node is required but not installed. Need Node 20+.'
}

$nodeMajor = [int](& node -p 'process.versions.node.split(".")[0]')
if ($nodeMajor -lt 20) {
  throw "node 20+ is required (you have $(& node --version))."
}

if (Test-Path (Join-Path $installDir '.git')) {
  Write-Host "Updating existing checkout at $installDir..."
  git -C $installDir pull --ff-only --quiet
} else {
  Write-Host "Cloning into $installDir..."
  git clone --quiet --depth 1 $repoUrl $installDir
}

if (-not (Test-Path $binDir)) {
  New-Item -ItemType Directory -Path $binDir -Force | Out-Null
}

$wrapperPath = Join-Path $binDir 'integrity.cmd'
$nodePath    = (Get-Command node).Source
$cliPath     = Join-Path $installDir 'cli\bin\integrity.mjs'

@"
@echo off
"$nodePath" "$cliPath" %*
"@ | Set-Content -Path $wrapperPath -Encoding ASCII

Write-Host ""
Write-Host "  installed: $wrapperPath -> $cliPath"
Write-Host ""

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$binDir*") {
  Write-Host "  $binDir is not on your PATH."
  Write-Host "  Add it (one-time, persists across sessions):"
  Write-Host ""
  Write-Host "    [Environment]::SetEnvironmentVariable('Path', `"`$env:Path;$binDir`", 'User')"
  Write-Host ""
}

Write-Host "Try it:"
Write-Host "  integrity --version"
Write-Host "  integrity directory list"
Write-Host ""
