# Bölüm 11: Kritik Sistem Dosyaları ve Yapılandırma

> **Giriş:** Linux'ta "Her şey bir dosyadır." Sistemin tüm ayarları `/etc` dizini altındaki metin dosyalarında saklanır.

---

## 1. Ağ Yapılandırma Dosyaları

Sistemin ağ üzerindeki kimliğini ve yolunu belirler.

* **/etc/hostname:** Bilgisayarın ağdaki adını tutar.
* **/etc/hosts:** IP adreslerini isimlerle eşleştirir (Yerel DNS).
* **/etc/resolv.conf:** DNS sunucu adreslerini belirler.

---

## 2. Kullanıcı ve Şifre Dosyaları

Kimlik yönetiminin yapıldığı dosyalardır.

* **/etc/passwd:** Kullanıcıların temel bilgilerini (UID, Shell, Ev Dizini) tutar.
* **/etc/shadow:** Kullanıcı şifrelerinin güvenli (hash) hallerini saklar.

---

## 3. Dosya Sistemi ve Montaj (/etc/fstab)

Sistem açılırken hangi diskin nereye bağlanacağını belirler.

* **UUID:** Disklerin değişmez benzersiz kimlik numarasıdır.
* **Mount Point:** Diskin hangi klasör altında erişilebilir olacağını tanımlar.

---

## 4. Zaman ve Bölge Ayarları

* **/etc/timezone:** Sistemin zaman dilimini belirler.
* **/etc/localtime:** Bölgesel saat bilgilerini içeren dosyadır.

<details>
<summary>SORU: /etc/hosts dosyasına bir kayıt eklemek, DNS sorgu sırasını nasıl etkiler?</summary>
<div class="answer-content">
Sistem genellikle önce /etc/hosts dosyasına bakar, orada bir karşılık bulamazsa dış DNS sunucularına (Google, Cloudflare vb.) sorar. Yani bir siteyi engellemek veya yönlendirmek için en hızlı yol bu dosyayı düzenlemektir.
</div>
</details>