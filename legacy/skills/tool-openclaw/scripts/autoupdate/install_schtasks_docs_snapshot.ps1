<#
Install Windows Task Scheduler job for docs snapshot auto-update.
Run in PowerShell (non-admin is fine) from the skill repo root OR anywhere.

This creates a daily task by default. Adjust -Trigger as needed.
#>

param(
  [string]$RepoRoot = "",
  [string]$NodePath = "node",
  [string]$TaskName = "OpenClaw-DocsSnapshot-AutoUpdate",
  [string]$Args = "scripts/update_docs_snapshot.mjs --mode seed",
  [string]$Schedule = "Daily",
  [string]$At = "03:15"
)

if ([string]::IsNullOrEmpty($RepoRoot)) {
  $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $ScriptDir "..\..") | Select-Object -ExpandProperty Path
}

$Action = New-ScheduledTaskAction -Execute $NodePath -Argument $Args -WorkingDirectory $RepoRoot

if ($Schedule -eq "Hourly") {
  $Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).Date.AddMinutes(5) -RepetitionInterval (New-TimeSpan -Hours 6) -RepetitionDuration ([TimeSpan]::MaxValue)
} else {
  $Trigger = New-ScheduledTaskTrigger -Daily -At $At
}

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Force | Out-Null
Write-Host "Installed task: $TaskName"
Write-Host "RepoRoot: $RepoRoot"
Write-Host "Action: $NodePath $Args"
