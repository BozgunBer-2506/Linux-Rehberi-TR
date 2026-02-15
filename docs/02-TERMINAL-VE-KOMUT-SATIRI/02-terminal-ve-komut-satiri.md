# Bölüm 02: Terminal, Kabuk ve Navigasyon Sanatı

> **Giriş:** Hız her şeydir. TAB tamamlama ve kısayollar el alışkanlığı haline gelmeli.



---

## 1. Kabuk (Shell) ve Terminal Emülatörü
Çoğu kişi bu ikisini karıştırır:
* **Terminal:** Komutları yazdığınız "pencere" (Örn: GNOME Terminal, Alacritty).
* **Shell (Kabuk):** O pencerenin arkasında komutları işleyen "yazılım" (Örn: Bash, Zsh, Fish). Linux standart olarak **Bash** (Bourne Again SHell) kullanır.

---

## 2. Komutların Anatomisi
Bir Linux komutu genellikle üç parçadan oluşur:
`komut [seçenekler] [argümanlar]`
Örnek: `ls -l /var/log`
* `ls`: Komutun adı (List).
* `-l`: Seçenek/Opsiyon (Long format - detaylı liste).
* `/var/log`: Argüman (İşlemin yapılacağı hedef dizin).

---

## 3. Derinlemesine Navigasyon
Sistemde sadece gezmek değil, "hızlı" gezmek önemlidir:
* **pwd (Print Working Directory):** "Ben neredeyim?" sorusunun cevabıdır.
* **cd (Change Directory):**
    * `cd /`: Kök dizine gider.
    * `cd ~`: Kullanıcının ev dizine gider.
    * `cd -`: Bir önceki bulunduğunuz klasöre geri döner (Çok kullanışlıdır!).
* **ls (List):**
    * `ls -lh`: Dosya boyutlarını "İnsan tarafından okunabilir" (KB, MB, GB) şekilde gösterir.
    * `ls -lt`: Dosyaları değiştirilme zamanına göre sıralar (En yeni en üstte).
    * `ls -R`: Alt klasörlerin içeriğini de gösterir (Recursive).



---

## 4. Terminalin Güçlü Kısayolları
Hızlanmak için bu tuş kombinasyonlarını ezberlemelisiniz:
* **TAB:** Komutları ve dosya isimlerini tamamlar. İki kez basarsanız tüm seçenekleri listeler.
* **Ctrl + C:** Çalışan bir komutu anında durdurur (Kill).
* **Ctrl + L:** Ekranı temizler (`clear` komutuyla aynı).
* **Ctrl + A / E:** İmleci satırın başına (A) veya sonuna (E) götürür.
* **!! (Double Bang):** En son yazılan komutu tekrar çalıştırır (Örn: `sudo !!` unutulan sudo'yu ekler).

---

<details>
<summary>SORU: Man sayfaları (Kılavuzlar) nasıl okunur?</summary>
<div class="answer-content">
Linux'ta her komutun kendi "Kitabı" vardır. `man ls` yazdığınızda o komutun tüm seçeneklerini görebilirsiniz. `man` sayfasından çıkmak için `q` tuşuna basmanız yeterlidir. "Bilmiyorum" demek yerine `man` kullanmak sizi profesyonelleştirir.
</div>
</details>
