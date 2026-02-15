# Bölüm 09: Bash Değişkenleri ve Kontrol Yapıları

> **Giriş:** Statik bir script sadece tek bir işi yapar. Kontrol yapıları ise scriptin sistemin durumuna göre karar vermesini sağlar.

---

## 1. Sayısal ve Metinsel Karşılaştırmalar

Bash'te sayılar ve metinler farklı operatörlerle kontrol edilir.

* **Sayılar:** `-eq` (eşit), `-ne` (farklı), `-gt` (büyük), `-lt` (küçük).
* **Metinler:** `==` (aynı), `!=` (farklı), `-z` (değişken boş mu).
* **Dosya Testleri:**
* `-f` -> Normal dosya mı?
* `-d` -> Dizin mi?
* `-e` -> Dosya/dizin var mı?


---

## 2. Karar Yapıları (If-Else)

Belirli şartlar sağlandığında kodun dallanmasını sağlar.

* **Önemli:** Köşeli parantezlerin `[ ]` içindeki boşluklar zorunludur.

```bash
if [ "$USER" == "root" ]; then
    echo "Yetkili kullanıcı: Root"
else
    echo "Standart kullanıcı: $USER"
fi

```

---

## 3. Döngüler (Loops)

Tekrarlayan işleri otomatize etmek için kullanılır.

* **For:** Belirli bir listedeki elemanlar üzerinde döner.
* **While:** Koşul doğru olduğu sürece çalışır.

```bash
# 1'den 5'e kadar sayma
for i in {1..5}; do
    echo "Sayı: $i"
done

```

---

## 4. Case Yapısı

Bir değişkenin alabileceği farklı değerlere göre hızlıca işlem seçmek için kullanılır.

```bash
case "$1" in
    baslat) echo "Servis açılıyor..." ;;
    durdur) echo "Servis kapatılıyor..." ;;
    *) echo "Hatalı komut!" ;;
esac

```

<details>
<summary>SORU: [[ ]] çift parantez kullanmak neden tek parantezden [ ] daha güvenlidir?</summary>
<div class="answer-content">
[[ ]] modern Bash'e özgü bir yapıdır. Değişkenler boş gelse bile scriptin çökmesini engeller ve içinde mantıksal operatörleri (&&, ||) tırnak işareti kullanmadan daha güvenli ve okunaklı şekilde kullanmanıza izin verir.
</div>
</details>