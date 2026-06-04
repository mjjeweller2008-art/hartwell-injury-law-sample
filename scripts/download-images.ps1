$ErrorActionPreference = "Continue"
$outDir = Join-Path $PSScriptRoot "..\assets\images"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$images = @{
  "hero-bg.jpg" = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80&fit=crop"
  "hero-attorney.jpg" = "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&fit=crop"
  "hero-attorney-thumb.jpg" = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop"
  "hero-consult-1.jpg" = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&fit=crop"
  "hero-consult-2.jpg" = "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80&fit=crop"
  "form-bg.jpg" = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fit=crop"
  "form-team.jpg" = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop"
  "result-truck.jpg" = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&fit=crop"
  "result-car.jpg" = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&fit=crop"
  "result-workplace.jpg" = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop"
  "result-slip.jpg" = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop"
  "avatar-1.jpg" = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop"
  "avatar-2.jpg" = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop"
  "avatar-3.jpg" = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop"
  "why-law-library.jpg" = "https://images.unsplash.com/photo-1505663694778-aac9f732a057?w=1000&q=80&fit=crop"
  "why-medical.jpg" = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80&fit=crop"
  "why-documents.jpg" = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&q=80&fit=crop"
  "practice-car.jpg" = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&fit=crop"
  "practice-truck.jpg" = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&fit=crop"
  "practice-motorcycle.jpg" = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&q=80&fit=crop"
  "practice-wrongful-death.jpg" = "https://images.unsplash.com/photo-1516541195162-ef8968a430d0?w=900&q=80&fit=crop"
  "practice-slip.jpg" = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop"
  "practice-workplace.jpg" = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop"
  "attorney-james.jpg" = "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&fit=crop"
  "attorney-elena.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&fit=crop"
  "process-phone.jpg" = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80&fit=crop"
  "process-investigate.jpg" = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&fit=crop"
  "process-insurance.jpg" = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop"
  "process-recovery.jpg" = "https://images.unsplash.com/photo-1573497019940-1c28c88b329e?w=800&q=80&fit=crop"
  "faq-courthouse.jpg" = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&q=80&fit=crop"
  "contact-skyline.jpg" = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&fit=crop"
  "office-about.jpg" = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80&fit=crop"
  "car-accident-hero.jpg" = "https://images.unsplash.com/photo-1489824904134-891ab84532f1?w=1200&q=80&fit=crop"
}
$ok = 0; $fail = 0
foreach ($kv in $images.GetEnumerator()) {
  $dest = Join-Path $outDir $kv.Key
  $tmp = Join-Path $outDir ("_" + $kv.Key)
  try {
    Invoke-WebRequest -Uri $kv.Value -OutFile $tmp -UseBasicParsing
    Move-Item -Force $tmp $dest
    $ok++
    Write-Host "OK $($kv.Key)"
  } catch {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    $fail++
    Write-Warning "FAIL $($kv.Key)"
  }
}
Write-Host "Done: $ok ok, $fail failed"
