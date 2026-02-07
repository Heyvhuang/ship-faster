<#
Install Windows Task Scheduler job for OpenClaw auto-update.
Note: Restart behavior depends on how you run OpenClaw on Windows/WSL2.
#>

param(
  [string]$RepoRoot = "",
  [string]$BashPath = "bash",
  [string]$TaskName = "OpenClaw-AutoUpdate",
  [string]$Args = "scripts/autoupdate/openclaw_autoupdate.sh",
  [string]$At = "04:10"
)

if ([string]::IsNullOrEmpty($RepoRoot)) {
  $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $ScriptDir "..\..") | Select-Object -ExpandProperty Path
}

$Action = New-ScheduledTaskAction -Execute $BashPath -Argument $Args -WorkingDirectory $RepoRoot
$Trigger = New-ScheduledTaskTrigger -Daily -At $At

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Force | Out-Null
Write-Host "Installed task: $TaskName"
Write-Host "RepoRoot: $RepoRoot"
Write-Host "Action: $BashPath $Args"
