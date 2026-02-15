# Bölüm 03: Dosya Sistemi ve Disk Mantığı

> **Giriş:** Hangi dosyanın nerede olduğunu bilmek, sorun anında müdahale süresini yarıya indirir.



---

## 1. FHS (Filesystem Hierarchy Standard) Derinlemesine Bakış
Linux dünyasında kaos yoktur, standart vardır. Her dizinin kendine has bir görevi vardır:

* **/ (Root):** Her şeyin başladığı en tepedeki noktadır.
* **/bin & /sbin:** Sistemin çalışması için hayati önem taşıyan komutlar burada durur. `/sbin` genellikle sadece root'un kullanabileceği komutları (reboot, fdisk) içerir.
* **/etc:** Sistemin "Ayar Odası"dır. Yazılımların tüm konfigürasyon dosyaları burada `.conf` veya `.rc` formatında saklanır.
* **/var:** "Variable" (Değişken) kelimesinden gelir. Log dosyaları (`/var/log`), veritabanları ve mail kuyrukları gibi boyutu sürekli değişen veriler buradadır.
* **/proc & /sys:** Bunlar "Sanal Dosya Sistemleri"dir. Disk üzerinde yer kaplamazlar. RAM'deki süreçler (processes) ve Kernel ayarları hakkında anlık bilgi sunarlar. Örneğin; `cat /proc/cpuinfo` işlemci bilginizi buradan okur.
* **/boot:** Kernel (çekirdek) ve önyükleyici (Grub) dosyalarını içerir. Bu dizindeki bir hata sistemin açılmasını engeller.
* **/opt:** "Optional" yazılımlar içindir. Sisteme sonradan kurulan devasa paketler (Google Chrome, IntelliJ vb.) genellikle buraya yerleşir.



---

## 2. Inode ve Dosya Metaverisi
Bir dosya sadece "isim" ve "içerik"ten oluşmaz. Linux'ta her dosyanın bir **Inode** (Index Node) numarası vardır. Inode şunları tutar:
* Dosya tipi ve izinleri.
* Sahibi ve grubu (UID/GID).
* Dosyanın boyutu.
* Diskteki fiziksel blokların adresi.
* **Önemli:** Inode dosyanın ismini tutmaz! İsimler dizin dosyalarında saklanır.

---

## 3. Linkler: Soft Link vs Hard Link
Linux'ta dosyaları birbirine bağlamak için iki yöntem kullanılır:

1.  **Hard Link:** Dosyanın diskteki fiziksel verisine giden ikinci bir yoldur. Asıl dosyayı silseniz bile veri silinmez, çünkü Inode numarası hala başka bir isimle eşleşiyordur. (Sadece aynı disk bölümünde çalışır).
2.  **Soft (Symbolic) Link:** Windows'taki "Kısayol"dur. Farklı bir Inode numarasına sahiptir ve sadece hedef dosyanın yolunu işaret eder. Hedef silinirse link "kırılır" (Broken link).



---

<details>
<summary>SORU: Disk dolu görünüyor ama dosya yok, neden?</summary>
<div class="answer-content">
Bunun sebebi "Inode tükenmesi" olabilir. Her dosya bir Inode numarası kullanır. Eğer milyonlarca çok küçük dosyanız varsa, diskte GB'larca yer olsa bile yeni Inode kalmadığı için "Disk Dolu" hatası alırsınız. `df -i` komutuyla kontrol edebilirsiniz.
</div>
</details>
