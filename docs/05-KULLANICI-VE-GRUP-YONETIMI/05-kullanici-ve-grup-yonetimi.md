# Bölüm 05: Kullanıcı ve Grup Yönetimi

> **Giriş:** Root yetkisiyle çalışmak (sudo) büyük sorumluluk getirir; dikkatli olun.



---

## 1. Kullanıcı Kimliklerinin Sınıflandırılması
Linux sisteminde her kullanıcının sayısal bir karşılığı (UID - User ID) vardır.

* **Root Kullanıcısı (UID: 0):** Sistemin mutlak hakimidir. Dosya izinlerini aşabilir, sistem yapılandırmasını değiştirebilir ve her şeyi silebilir. Linux felsefesinde root, "tanrısal" yetkilere sahiptir.
* **Sistem Kullanıcıları (UID: 1-999):** Fiziksel bir insan karşılığı olmayan kullanıcılardır. `apache`, `bin`, `daemon`, `messagebus` gibi servislerin kendi işlerini yürütmesi için oluşturulur. Güvenlik için bu kullanıcıların genellikle terminale giriş (login) yetkileri yoktur.
* **Normal Kullanıcılar (UID: 1000+):** Sisteme erişen gerçek bireylerdir. Kısıtlı yetkilere sahiptirler ve sadece kendi ev dizinlerinde (`/home/kullanici`) tam yetkilidirler.

---

## 2. Kullanıcı Veritabanı ve Dosya Yapıları
Kullanıcı bilgileri Linux'ta üç temel dosyada saklanır. Bu dosyaların formatını bilmek profesyonelliğin şartıdır:

### A. /etc/passwd: Kimlik Kartı
Bu dosya her kullanıcı için bir satır içerir ve alanlar `:` ile ayrılır:
`yavuz:x:1000:1000:Yavuz Baris,,,:/home/yavuz:/bin/bash`
1. **Username:** Giriş adı.
2. **Password:** 'x' işareti şifrenin gizli (shadow) olduğunu belirtir.
3. **UID:** Kullanıcı numarası.
4. **GID:** Birincil grup numarası.
5. **GECOS:** Kullanıcı hakkında ek bilgi (Ad soyad, oda no vb.).
6. **Home Directory:** Kullanıcının ana klasörü.
7. **Default Shell:** Giriş yapıldığında çalışacak kabuk programı.

### B. /etc/shadow: Şifre Kasası
Şifrelerin geri döndürülemez şekilde hash'lenmiş hallerini tutar.
* Sadece **root** tarafından okunabilir.
* Şifre değiştirme periyotları, hesabın geçerlilik süresi ve kilitlenme bilgileri buradadır.

### C. /etc/group: Grupların Listesi
`sudo:x:27:yavuz,ahmet` şeklinde bir yapısı vardır. Bir kullanıcı birden fazla gruba üye olabilir (İkincil Gruplar).

---

## 3. Gelişmiş Kullanıcı ve Grup Komutları
* **useradd -m -s /bin/bash -p $(openssl passwd -1 sifre) yeni_kullanici:** Kullanıcıyı ev diziniyle, shell tipiyle ve şifrelenmiş parolasıyla tek seferde oluşturur.
* **usermod -L [kullanici]:** Kullanıcı hesabını kilitler (Lock). Giriş yapmasını engeller.
* **usermod -U [kullanici]:** Kilidi açar (Unlock).
* **groupadd -g 1500 editorler:** Belirli bir GID numarasıyla grup oluşturur.
* **gpasswd -d kullanıcı grup:** Kullanıcıyı belirli bir gruptan çıkarır.

---

## 4. Sudoers ve Yetki Delegasyonu
Herkesin root şifresini bilmesi güvenlik açığıdır. Bunun yerine `sudo` (SuperUser Do) kullanılır.
* **visudo:** `/etc/sudoers` dosyasını düzenlemenin tek güvenli yoludur. Yazım hatası yaparsanız dosyayı kaydetmenize izin vermez, böylece root yetkisini kaybetmezsiniz.
* **Yapı:** `%admin ALL=(ALL) ALL` -> Admin grubundaki herkes, her bilgisayarda, her kullanıcı yetkisiyle, tüm komutları çalıştırabilir.

---

<details>
<summary>SORU: /etc/passwd içindeki 'x' işaretini silersek ne olur?</summary>
<div class="answer-content">
Eğer 'x' işaretini silerseniz, sistem şifreyi shadow dosyasında aramak yerine parola olmadığını varsayabilir. Bu çok eski bir yöntemdir ve modern sistemlerde büyük bir güvenlik açığıdır; genellikle sistem bu durumda girişi tamamen reddeder.
</div>
</details>
