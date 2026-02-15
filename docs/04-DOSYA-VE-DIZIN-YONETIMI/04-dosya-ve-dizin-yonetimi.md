# Bölüm 04: Gelişmiş Dosya ve Dizin Yönetimi

> **Giriş:** Pipeline (|) ve Redirect (>) kullanımı terminaldeki gerçek gücünüzdür.



---

## 1. Dosya İçeriği ve Manipülasyon Sanatı
Dosyayı açmak (edit etmek) her zaman mümkün veya pratik değildir. İçeriği terminalden yönetmek hız kazandırır.

### A. Görüntüleme ve Kaydırma (cat, less, more)
* **cat (Concatenate):** Sadece dosya içeriğini basmakla kalmaz, dosyaları birleştirmek için de kullanılır.
    * `cat dosya1 dosya2 > birlesik.txt`: İki dosyayı tek dosyada birleştirir.
    * `cat -n dosya.txt`: Satır numaralarıyla birlikte gösterir.
* **less:** Sistemin "kaynak dostu" okuyucusudur. `more` komutunun aksine hem ileri hem geri gitmenizi sağlar.
    * `/kelime`: Dosya içinde ileriye doğru arama yapar.
    * `?kelime`: Geriye doğru arama yapar.
    * `G`: Dosyanın sonuna, `g`: Başına gider.

### B. Baş ve Son Analizi (head, tail)
Log analizi yaparken tüm dosyayı okumak vakit kaybıdır.
* **head -n 20:** Dosyanın sadece ilk 20 satırını gösterir.
* **tail -n 20:** Dosyanın son 20 satırını gösterir.
* **tail -f (Follow):** Bu parametre hayati önem taşır. Dosyayı kapatmaz, açık tutar ve yeni satır eklendikçe (örneğin birisi sitenize eriştiğinde oluşan log) ekrana anlık basar. Hata ayıklamanın 1 numaralı aracıdır.

---

## 2. Gelişmiş Arama Stratejileri: Find ve Locate
Dosyanın nerede olduğunu bilmediğinizde sistemde dedektiflik yapmanız gerekir.

### A. Locate: Işık Hızıyla Arama
* `locate config.php`: Veritabanından (mlocate.db) arar ve saniyeler içinde sonuç verir.
* **Kritik Not:** Yeni oluşturduğunuz bir dosyayı bulamazsa `sudo updatedb` komutuyla veritabanını elle güncellemeniz gerekir.

### B. Find: Cerrahi Hassasiyette Arama
Find komutu sadece isimle değil, özniteliklerle arar. Formül: `find [nerede] [kriterler] [aksiyon]`
* **Zamana Göre:** `find /var/log -mtime -2`: Son 48 saatte değişen logları bulur.
* **Boyuta Göre:** `find /home -size +50M -size -100M`: 50MB ile 100MB arasındaki dosyaları bulur.
* **İzinlere Göre:** `find / -perm 777`: Güvenlik riski olan, herkese açık dosyaları yakalar.
* **Komut Çalıştırma (-exec):** `find /tmp -name "*.tmp" -exec rm -rf {} \;`: Bulduğu tüm geçici dosyaları otomatik olarak siler. `{}` ifadesi bulunan dosyayı temsil eder.



---

## 3. Standard Giriş/Çıkış ve Yönlendirme (Redirection)
Linux terminalinde üç temel akış (stream) vardır: `stdin (0)`, `stdout (1)`, `stderr (2)`.

* **Output Yönlendirme (`>` ve `>>`):** * `ls > liste.txt`: Mevcut içeriği siler, yeni listeyi yazar.
    * `ls >> liste.txt`: Mevcut içeriğe dokunmaz, altına ekleme yapar.
* **Error Yönlendirme (`2>`):** Sadece hataları kaydetmek için kullanılır.
    * `komut 2> hatalar.log`: Başarılı sonuçları ekrana basar, hataları dosyaya yazar.
    * `komut > dosya.txt 2>&1`: Hem hataları hem çıktıları aynı dosyaya yazar.
* **Input Yönlendirme (`<`):** Dosya içeriğini bir komuta girdi olarak verir.

---

## 4. Boru Hattı (Pipeline) ve Filtreler
Pipeline (`|`), bir komutun çıktısını diğerinin girdisi yaparak "komut zincirleri" kurmanızı sağlar.

* **grep (Global Regular Expression Print):** Metin içinde süzgeç görevi görür.
    * `cat /etc/passwd | grep "/bin/bash"`: Sadece Bash kabuğunu kullanan kullanıcıları ayıklar.
* **sort ve uniq:**
    * `cat liste.txt | sort | uniq`: Listeyi sıralar ve tekrar eden satırları temizler.
* **wc (Word Count):**
    * `ls -l /etc | wc -l`: `/etc` altında kaç tane nesne olduğunu sayar.

---

## 5. Arşivleme ve Sıkıştırma (Tar, Gzip, Bzip2)
Linux'ta yedekleme yaparken "paketleme" ve "sıkıştırma" arasındaki farkı bilmelisiniz.

* **tar (Tape Archiver):** Klasör yapısını bozmadan dosyaları birleştirir.
    * `tar -cvf yedek.tar /home/user`: Sadece paketler (Sıkıştırmaz).
* **Sıkıştırma Algoritmaları:**
    * **Gzip:** Hızlıdır, orta derece sıkıştırır (`.tar.gz`).
    * **Bzip2:** Yavaştır ama çok daha iyi sıkıştırır (`.tar.bz2`).
* **Profesyonel Kullanım:** `tar -xvzf dosya.tar.gz`
    * `x`: Extract (Çıkar)
    * `v`: Verbose (Detayları göster)
    * `z`: Gzip filtresini kullan
    * `f`: Dosya adını belirt

---

<details>
<summary>SORU: "grep" ile bir klasörün içindeki tüm dosyalarda kelime nasıl aranır?</summary>
<div class="answer-content">
`grep -r "aranacak_kelime" /yol/` komutunu kullanmalısınız. `-r` (recursive) parametresi, belirtilen klasör ve altındaki tüm dosyaların içeriğini tarar. Eğer büyük-küçük harf duyarlılığını kapatmak isterseniz `-i` parametresini de ekleyebilirsiniz.
</div>
</details>
