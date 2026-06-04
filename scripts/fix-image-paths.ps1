# Maps broken Unsplash URL substrings to local assets (run once after download)
$root = Split-Path $PSScriptRoot -Parent
$map = [ordered]@{
  "photo-1542314851-5c92d860550b" = "assets/images/hero-bg.jpg"
  "photo-1556157382-97eda2d62296" = "assets/images/hero-attorney.jpg"
  "photo-1600880292203-cef84b4f7f58" = "assets/images/hero-consult-1.jpg"
  "photo-1521791136064-7986c2920216" = "assets/images/form-team.jpg"
  "photo-1573496359142-b8d87734a5a2" = "assets/images/hero-attorney-thumb.jpg"
  "photo-1497366216548-37526070297c" = "assets/images/form-bg.jpg"
  "photo-1601584111047-7c73b92f977f" = "assets/images/result-truck.jpg"
  "photo-1449965408860-46064d859563" = "assets/images/result-car.jpg"
  "photo-1504307651254-35680f356dfd" = "assets/images/result-workplace.jpg"
  "photo-1582719478250-c89cae4dc85b" = "assets/images/result-slip.jpg"
  "photo-1438761681033-6461ffad8d80" = "assets/images/avatar-1.jpg"
  "photo-1500648767791-00dcc994a43e" = "assets/images/avatar-2.jpg"
  "photo-1544005313-94ddf0286df2" = "assets/images/avatar-3.jpg"
  "photo-1589829545855-d10d557cf95f" = "assets/images/why-law-library.jpg"
  "photo-1576091160550-2173dba999ef" = "assets/images/why-medical.jpg"
  "photo-1450101499163-c8848c66ca85" = "assets/images/why-documents.jpg"
  "photo-1558981806-ec527fa84c39" = "assets/images/practice-motorcycle.jpg"
  "photo-1516579225092-944c34c106ab" = "assets/images/practice-wrongful-death.jpg"
  "photo-1560250097-0b93528c311a" = "assets/images/attorney-james.jpg"
  "photo-1423666639041-f56000c27a9a" = "assets/images/process-phone.jpg"
  "photo-1454165804606-c3d57bc86b40" = "assets/images/process-insurance.jpg"
  "photo-1576091160399-017baef87937" = "assets/images/process-recovery.jpg"
  "photo-1589994965851-a8f479c573a9" = "assets/images/faq-courthouse.jpg"
  "photo-1486406146926-c627a92fd1ab" = "assets/images/contact-skyline.jpg"
  "photo-1492144534655-ae79c964c9d7" = "assets/images/practice-car.jpg"
  "photo-1586528116311-ad8dd3c8310d" = "assets/images/practice-truck.jpg"
  "photo-1600880292089-90a7e086ee0c" = "assets/images/hero-consult-2.jpg"
  "photo-1517048676732-d65bc937f952" = "assets/images/hero-consult-1.jpg"
  "photo-1529156069898-49953e39b3ac" = "assets/images/practice-wrongful-death.jpg"
  "photo-1571019613454-1cb2f99b2d8b" = "assets/images/process-recovery.jpg"
  "photo-1541339907198-e08756dedf3f" = "assets/images/contact-skyline.jpg"
}

Get-ChildItem -Path $root -Filter "*.html" | ForEach-Object {
  $content = Get-Content $_.FullName -Raw -Encoding UTF8
  $changed = $false
  foreach ($key in $map.Keys) {
    if ($content -match [regex]::Escape($key)) {
      $content = [regex]::Replace(
        $content,
        "https://images\.unsplash\.com/$([regex]::Escape($key))[^`"]*",
        $map[$key]
      )
      $changed = $true
    }
  }
  if ($changed) {
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Output "Updated $($_.Name)"
  }
}
