# Bölüm 17: Disk Yönetimi ve LVM

> **Giriş:** Klasik disk bölümlendirmesi katıdır ve disk dolduğunda genişletmek zordur. LVM (Logical Volume Management) ise diski sanallaştırarak sunucuyu kapatmadan alan artırmayı sağlayan esnek bir yapıdır.

---

## 1. Disk Alanını Sorgulama

Sistemdeki doluluk oranını ve fiziksel disk yapısını anlamak için kullanılır.

* **df -h:** Bağlı olan tüm dosya sistemlerini "İnsan Okunabilir" (GB, MB) formatta listeler.
* **du -sh /var/log:** Belirli bir klasörün diskte ne kadar yer kapladığını hesaplar.
* **lsblk:** Disklerin fiziksel bölümlerini (partition) bir ağaç yapısı şeklinde gösterir.

---

## 2. LVM Katmanları ve Yapısı

LVM, fiziksel disk ile işletim sistemi arasında üç temel katmandan oluşur:

* **PV (Physical Volume):** Fiziksel diskin kendisi veya bir bölümüdür. LVM'nin temel taşıdır.
* **VG (Volume Group):** Birden fazla PV'nin birleşerek oluşturduğu devasa bir depolama havuzudur.
* **LV (Logical Volume):** Havuzdan (VG) ihtiyaca göre bölünen ve sistemde "sürücü" olarak görünen sanal disklerdir.

---

## 3. LVM Avantajları ve Genişletme

* **Online Resize:** Sunucuyu kapatmadan (unmount etmeden) disk alanını artırabilirsiniz.
* **Snapshots:** Diskin belirli bir andaki durumunun yedeğini hızlıca alabilirsiniz.
* **Disk Birleştirme:** Farklı fiziksel diskleri tek bir sanal disk gibi kullanabilirsiniz.

---

## 4. Temel LVM Komutları

* **Sorgulama:** `pvs`, `vgs`, `lvs` (Sırasıyla PV, VG ve LV durumlarını özetler).
* **Genişletme:** `lvextend -L +10G /dev/mapper/vg0-lv0` (Mantıksal sürücüye 10GB ekler).
* **Dosya Sistemini Güncelleme:** `resize2fs /dev/mapper/vg0-lv0` (Eklenen alanı sisteme tanıtır).

<details>
<summary>SORU: LVM yapısında bir VG (Volume Group) içine farklı boyutlarda diskler eklenebilir mi?</summary>
<div class="answer-content">
Evet, LVM'nin en büyük gücü budur. 100GB'lık bir diskle 500GB'lık bir diski aynı VG havuzuna ekleyip toplam 600GB'lık tek bir mantıksal alan oluşturabilirsiniz.
</div>
</details>