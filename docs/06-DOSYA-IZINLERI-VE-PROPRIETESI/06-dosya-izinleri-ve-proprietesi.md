# Bölüm 06: Dosya İzinleri ve Sahiplik

> **Giriş:** 777 izni vermeden önce iki kez düşünün; güvenlik burada başlar.



---

## 1. İzinlerin Sembolik ve Sayısal Mantığı
`ls -l` çıktısındaki `-rwxr-xr--` gibi 10 karakterlik diziyi analiz edelim:

### A. Simgesel Gösterim
* `r` (Read): Dosyayı okuma / Klasör içeriğini listeleme.
* `w` (Write): Dosyayı değiştirme / Klasörde dosya oluşturma-silme.
* `x` (Execute): Dosyayı çalıştırma / Klasörün içine girebilme (`cd`).

### B. Sayısal (Octal) Karşılıklar
Sistem yöneticileri genellikle sayıları kullanır:
* **r=4, w=2, x=1**
* **7 (4+2+1):** Tam yetki.
* **6 (4+2):** Okuma ve Yazma.
* **5 (4+1):** Okuma ve Çalıştırma.
* Örnek: `chmod 755 script.sh` (Sahibi her şeyi yapar, diğerleri sadece okur ve çalıştırır).

---

## 2. Sahiplik ve Grup Değiştirme (chown, chgrp)
Dosyanın yetkileri ne kadar kısıtlı olursa olsun, sahibi o yetkileri değiştirebilir.
* **chown -R yavuz:www-data /var/www/html:** Belirtilen klasörün sahibini yavuz, grubunu www-data yapar. `-R` (Recursive) parametresi tüm alt dosyalara uygular.
* **chgrp:** Sadece grubunu değiştirmek için kullanılır.

---

## 3. Özel İzinler: Sistemin Gizli Güçleri
Standart `rwx` yetkilerinin yetmediği durumlarda devreye girer:

1.  **SUID (Set User ID - Sayısal değeri: 4000):** Bir dosya çalıştırıldığında, onu çalıştıran kişinin değil, **dosya sahibinin** yetkileriyle çalışır.
    * Örnek: `/usr/bin/passwd`. Normal bir kullanıcı kendi şifresini değiştirmek için root'un okuyabildiği `/etc/shadow` dosyasına yazmak zorundadır. SUID sayesinde bu komut root yetkisiyle çalışır.
2.  **SGID (Set Group ID - Sayısal değeri: 2000):** Klasör düzeyinde uygulanırsa, o klasörde oluşturulan her yeni dosya, oluşturun kişinin grubunu değil, klasörün grubunu miras alır. Ortak çalışma alanları için zorunludur.
3.  **Sticky Bit (Sayısal değeri: 1000):** "Yapışkan Bit". Sadece klasörlere uygulanır. Herkes dosya oluşturabilir ama **sadece kendi oluşturduğu dosyayı silebilir**.
    * Örnek: `/tmp` dizini.

---

## 4. ACL (Access Control Lists) - Gelişmiş İzinler
Standart Linux izinleri (Sahibi-Grup-Diğerleri) bazen yetersiz kalır. "Dosyayı A kullanıcısı okusun, B kullanıcısı okumasın ama C grubu yazabilsin" gibi karmaşık senaryolar için ACL kullanılır.
* **getfacl [dosya]:** Detaylı izin listesini gösterir.
* **setfacl -m u:ahmet:rwx dosya.txt:** Sadece ahmet kullanıcısına o dosya için özel yetki verir.

---

## 5. Umask Mantığı: Varsayılan İzinler
Yeni bir dosya oluşturduğunuzda neden hep `644` ile oluşur? Bunu `umask` belirler.
* Varsayılan izin maskesidir. Klasörler (777) ve dosyalar (666) için başlangıç değerinden umask çıkarılır.
* `umask 0022` ise; dosyalar `666 - 022 = 644` olarak doğar.

---

<details>
<summary>SORU: Bir klasöre 'x' izni vermezseniz ne olur?</summary>
<div class="answer-content">
O klasörün içine `cd` komutuyla giremezsiniz. 'r' izniniz olsa bile içerideki dosyaların detaylarını göremezsiniz. Klasörler için 'x' izni "içinden geçebilme" yetkisidir.
</div>
</details>
