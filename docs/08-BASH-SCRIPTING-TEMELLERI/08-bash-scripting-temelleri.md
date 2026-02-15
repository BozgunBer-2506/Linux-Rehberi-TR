# Bölüm 08: Bash Scripting'e Giriş

> **Giriş:** Shebang (#! /bin/bash) satırını asla unutmayın, aksi halde script sapıtabilir.

---

## 1. Script Yazım Kuralları ve Shebang
Her Bash scripti belirli bir disiplinle başlar.
* **Shebang (#!):** Dosyanın ilk satırıdır. İşletim sistemine bu kodu kimin yorumlayacağını söyler.
    * `#!/bin/bash` -> En standart Bash yorumlayıcısı.
* **Yorum Satırları (#):** Kodun ne iş yaptığını açıklamak için kullanılır. Bilgisayar bu satırları okumaz.

---

## 2. Değişkenler (Variables)
Verileri geçici olarak saklamak için kullanılır.
* **Tanımlama:** `DEGISKEN_ADI="Deger"` (Eşittir işaretinin sağında ve solunda boşluk OLMAZ!).
* **Kullanma:** Değişkeni çağırırken başına `$` işareti konur. `echo $DEGISKEN_ADI`.
* **Komut Çıktısını Değişkene Atama:** `TARIH=$(date)` -> Tarih komutunun sonucunu TARIH değişkenine hapseder.

---

## 3. Girdi ve Çıktı Yönetimi
Scriptin kullanıcıyla etkileşime girmesi gerekir:
* **read:** Kullanıcıdan klavye girdisi alır.
    * `read -p "Adınızı girin: " ISIM`
* **echo:** Ekrana çıktı verir.
    * `echo -e "Satir\nAtla"` -> `-e` parametresi özel karakterleri (ters bölü n gibi) yorumlar.

---

## 4. Script Çalıştırma ve İzinler (Hayati Adım)
Bir metin dosyasının "program"a dönüşmesi için iki yol vardır:
1. **Yorumlayıcı ile çağırma:** `bash script.sh`
2. **Doğrudan çalıştırma:** * Önce yetki ver: `chmod +x script.sh`
    * Sonra çalıştır: `./script.sh`



---

## 5. Basit Bir Örnek: Sistem Bilgi Scripti
Aşağıdaki kodları bir dosyaya kaydedip çalıştırdığınızda size sistem özeti sunar:
```bash
#!/bin/bash
USER=$(whoami)
UPTIME=$(uptime -p)
DISK=$(df -h | grep '^/dev/' | head -1)

echo "--- SISTEM OZETI ---"
echo "Kullanıcı: $USER"
echo "Çalışma Süresi: $UPTIME"
echo "Ana Disk Durumu: $DISK"
```
<details>
<summary>SORU: Scriptin ilk satırındaki #!/bin/bash (Shebang) ifadesini yazmazsak ne olur?</summary>
<div class="answer-content">

Eğer Shebang satırı yoksa, işletim sistemi kodu hangi yorumlayıcıyla (Bash, Python, Perl vb.) çalıştıracağını bilemez ve varsayılan kabuğu kullanmaya çalışır. Bu durum, özellikle Bash'e özgü komutlar kullandığınızda scriptin hata vermesine veya sapıtmasına neden olur.
</div>
</details>