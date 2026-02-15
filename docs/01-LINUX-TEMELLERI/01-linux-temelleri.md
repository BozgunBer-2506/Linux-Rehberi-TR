# Bölüm 01: Linux Temelleri ve Mimari Yapısı

> **Giriş:** Bu bölüm teorik temeldir; burayı anlamadan komutlara geçmek ezberciliktir.



---

## 1. Linux'un Tarihçesi ve Felsefesi
Linux, 1991 yılında Linus Torvalds tarafından hobi projesi olarak başlatıldı. Ancak gücünü **GNU Tasarısı (GPL Lisansı)** ile birleşmesinden alır. 
* **Özgürlük:** Kodu görebilir, değiştirebilir ve dağıtabilirsiniz.
* **Açık Kaynak:** Binlerce geliştirici tarafından denetlendiği için en güvenli sistemlerden biridir.

---

## 2. Linux Katmanlı Mimari Yapısı
Linux'u bir soğan gibi düşünebilirsiniz. Her katman bir içtekine hizmet eder:

1. **Donanım Katmanı (Hardware):** CPU, RAM ve Diskler.
2. **Çekirdek (Kernel):** Sistemin beynidir. Donanım ve yazılım arasındaki tüm trafiği yönetir. Bellek yönetimi (Memory Management), Süreç yönetimi (Process Management) ve Sürücü desteği burada gerçekleşir.
3. **Kabuk (Shell):** Kullanıcı ile Kernel arasındaki tercümandır. Sizin yazdığınız komutu Kernel'ın anlayacağı makine diline çevirir.
4. **Kullanıcı Alanı (Application Layer):** Web sunucuları, veritabanları veya kullandığınız masaüstü arayüzleri bu katmandadır.



---

## 3. Kernel (Çekirdek) Görevleri Nelerdir?
Bir sistem yöneticisi olarak Kernel'ın nelerden sorumlu olduğunu bilmek kritiktir:
* **Hafıza Yönetimi:** Hangi programın ne kadar RAM kullanacağını ve verilerin nerede saklanacağını belirler.
* **Process Yönetimi:** CPU'nun aynı anda birden fazla işi nasıl yapacağını (Scheduling) organize eder.
* **Dosya Sistemi Yönetimi:** Verilerin diske nasıl yazılacağını ve okunacağını kontrol eder.
* **Ağ Yönetimi:** Gelen ve giden tüm veri paketlerini (TCP/IP) yönetir.

---

## 4. Linux Dağıtımları (Distros) ve Ekosistem
Linux tek bir tip değildir. İhtiyaca göre özelleşmiş yüzlerce "Dağıtım" vardır:
* **Sunucu Odaklı (Stability):** Debian, RHEL (Red Hat Enterprise Linux), CentOS, Rocky Linux. Bu sistemler çok nadir güncellenir ama asla çökmezler.
* **Kullanıcı/Masaüstü Odaklı:** Ubuntu, Linux Mint, Pop!_OS. Kullanım kolaylığı ve geniş donanım desteği sunarlar.
* **Siber Güvenlik/Pentest:** Kali Linux, Parrot OS. İçinde binlerce siber güvenlik aracıyla gelirler.
* **Rolling Release (Uç Nokta):** Arch Linux, Gentoo. Her zaman en güncel paketleri alırlar ama yönetimi zordur.



---

<details>
<summary>SORU: Linux neden "Hatalara Karşı Dirençli" kabul edilir?</summary>
<div class="answer-content">
Linux'ta "User Space" ve "Kernel Space" birbirinden izoledir. Bir uygulama (örneğin tarayıcı) çökerse, bu sadece o uygulamayı etkiler; sistemin geneli ve çekirdek (Kernel) çalışmaya devam eder. Windows'taki "Mavi Ekran" hatalarının Linux'ta çok daha nadir görülmesinin temel sebebi bu izolasyondur.
</div>
</details>
