# Bölüm 07: Metin Editörleri ve Düzenleme Teknikleri

> **Giriş:** Uygulamalı pratik yapmadan sadece okumak kalıcı öğrenme sağlamaz.



---

## 1. GNU Nano: Basitlik ve Pratiklik
Nano, terminale yeni başlayanlar için en kullanıcı dostu editördür. Komutlar ekranın alt kısmında her zaman listelenir.
* **Açma:** `nano dosya.txt`
* **Kaydetme:** `Ctrl + O` (WriteOut)
* **Çıkış:** `Ctrl + X` (Exit)
* **Arama:** `Ctrl + W` (Where is)
* **Özellik:** Satır numaralarını görmek için `nano -c` komutuyla başlatabilirsiniz.

---

## 2. Vim (Vi Improved): Güç ve Hızın Zirvesi
Vim bir editörden ziyade bir "yaşam tarzıdır". Öğrenme eğrisi diktir ancak bir kez ustalaşıldığında klavyeden elinizi kaldırmadan mucizeler yaratmanızı sağlar.

### Vim'in 4 Ana Modu
Vim'de yazmaya başlamadan önce hangi modda olduğunuzu bilmelisiniz:
1. **Normal Mod (Esc):** Varsayılan moddur. Hareket etmek, silmek, kopyalamak içindir.
2. **Insert (Ekleme) Modu (i):** Metin yazmak içindir.
3. **Visual (Görsel) Mod (v):** Metin bloklarını seçmek içindir.
4. **Komut Modu (:):** Dosyayı kaydetmek veya çıkmak için kullanılır.



### Kritik Vim Komutları (Hile Kağıdı)
* `:w` -> Kaydet.
* `:q!` -> Kaydetmeden zorla çık.
* `:wq` -> Kaydet ve çık.
* `dd` -> Tüm satırı siler.
* `yy` -> Satırı kopyalar (yank).
* `p` -> Yapıştır (paste).
* `u` -> Geri al (undo).
* `:/kelime` -> Dosya içinde arama yapar.

---

## 3. Akış Düzenleyiciler: sed ve awk
Büyük dosyalarda elinizle tek tek değişiklik yapamazsınız. Burada "Stream Editor"lar devreye girer.
* **sed:** Metin üzerinde toplu değişim yapar.
    * `sed -i 's/eski/yeni/g' dosya.txt`: Dosyadaki tüm "eski" kelimelerini "yeni" ile değiştirir.
* **awk:** Dosyaları sütun sütun işler.
    * `awk -F: '{ print $1 }' /etc/passwd`: Passwd dosyasındaki sadece kullanıcı adlarını (ilk sütun) çekip alır.

---

<details>
<summary>SORU: Sunucuda neden Vim yüklüdür de VS Code yoktur?</summary>
<div class="answer-content">
Sunucular genellikle "Headless" (ekransız) çalışır. Grafik arayüz sistem kaynaklarını (RAM, CPU) boşuna harcar ve güvenlik açığı yaratır. Vim, sadece birkaç kilobayt yer kaplar ve SSH üzerinden her bağlantıda kusursuz çalışır.
</div>
</details>
