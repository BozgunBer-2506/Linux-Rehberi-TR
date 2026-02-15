# Bölüm 14: Log Analizi ve İzleme

> **Giriş:** Linux'ta "Log" (Kayıt), sistemin kara kutusudur. Bir servis çalışmadığında veya bir saldırı olduğunda gidilecek tek yer `/var/log` dizinidir.

---

## 1. Kritik Log Dosyalarının Görevleri

Sistemdeki her olay, türüne göre farklı bir dosyaya yazılır:

* **/var/log/syslog:** Sistemin genel günlüğüdür. Çekirdek mesajlarından servis hatalarına kadar her şeyi barındırır.
* **/var/log/auth.log:** Güvenlik kalbidir. SSH girişleri, `sudo` kullanımları ve başarısız denemeler buraya düşer.
* **/var/log/kern.log:** Çekirdek (Kernel) seviyesindeki donanım hataları ve uyarıları saklar.
* **/var/log/apache2/ veya /var/log/nginx/:** Web sunucusu erişim ve hata kayıtları burada tutulur.

---

## 2. Log Okuma ve Filtreleme Teknikleri

Dosyaların içinde boğulmamak için şu komutlar hayati önem taşır:

* **tail -f /var/log/syslog:** Dosyayı canlı izler. Yeni bir satır eklendiği anda ekrana basar. Hata ayıklarken (debug) en çok kullanılan yöntemdir.
* **grep -i "error" /var/log/syslog:** Log içinde büyük/küçük harf duyarlılığı olmadan "error" kelimesini arar.
* **zgrep:** Sıkıştırılmış (arşivlenmiş) `.gz` uzantılı eski logların içinde dosya açmadan arama yapmanızı sağlar.

---

## 3. Logrotate Mekanizması

Log dosyaları zamanla GB'larca yer kaplayabilir. `logrotate` servisi, eski logları sıkıştırır, arşivler ve belirli bir süre sonra silerek diskin dolmasını engeller. Yapılandırması `/etc/logrotate.conf` dosyasında tutulur.

<details>
<summary>SORU: Çok büyük bir log dosyasının sadece son 50 satırında "ERROR" kelimesini nasıl ararsınız?</summary>
<div class="answer-content">
<b>tail -n 50 /var/log/syslog | grep "ERROR"</b> komutunu kullanarak tüm dosyayı taramak yerine sadece en güncel 50 satıra odaklanabilirsiniz.
</div>
</details>