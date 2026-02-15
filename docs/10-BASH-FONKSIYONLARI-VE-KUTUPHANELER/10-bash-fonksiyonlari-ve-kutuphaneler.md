# Bölüm 10: Bash Fonksiyonları ve Kütüphaneler

> **Giriş:** Fonksiyonlar, kodunuzu modüler parçalara bölerek aynı kodları tekrar tekrar yazmanızı engeller (DRY - Don't Repeat Yourself prensibi).

---

## 1. Fonksiyon Tanımlama ve Çağırma

Fonksiyonlar birer "mini script" gibidir. Script içinde çağrılmadan önce mutlaka tanımlanmış olmaları gerekir.

```bash
selamla() {
    echo "Merhaba Yavuz Barış, Linux Rehberi devam ediyor!"
}

# Fonksiyonu çalıştırmak için sadece adını yazın:
selamla

```

---

## 2. Parametre Kullanımı

Fonksiyonlar dışarıdan gelen verileri `$1`, `$2` gibi yerel değişkenlerle yakalar. Scriptin genel parametreleriyle karışmazlar.

```bash
topla() {
    SONUC=$(( $1 + $2 ))
    echo "Toplam: $SONUC"
}

topla 5 10

```

---

## 3. Yerel (Local) Değişkenler

Fonksiyon içindeki bir değişkenin ana scriptteki diğer değişkenleri bozmaması için `local` anahtar kelimesi kullanılır.

* **Önemli:** `local` kullanılmazsa değişken her yerde geçerli (global) olur ve hatalara yol açar.

```bash
hesapla() {
    local SAYI=$1
    echo "İşlem sonucu: $((SAYI * 2))"
}

```

---

## 4. Kütüphane Mantığı (Sourcing)

Sık kullandığınız fonksiyonları `ayarlar.sh` gibi ayrı bir dosyada tutup, ana scriptinize dahil ederek kullanabilirsiniz.

* **Komut:** `source dosya_adi` veya `. dosya_adi`

```bash
# Fonksiyonların olduğu dosyayı içeri aktar:
source ./kutuphane.sh

# Dosya içindeki fonksiyonu kullan:
sistem_kontrol

```

---

## 5. Çıkış ve Geri Dönüş (Return)

Fonksiyonlar işlem sonucunu bildirmek için `return` komutunu kullanır (0 başarılı, diğerleri hatadır).

<details>
<summary>SORU: 'source' komutu ile bir scripti çağırmak ile './script.sh' şeklinde çağırmak arasındaki fark nedir?</summary>
<div class="answer-content">
'./script.sh' komutu kodları yeni bir alt kabukta (sub-shell) çalıştırır ve bittiğinde değişkenler ölür. 'source' ise kodları mevcut kabukta çalıştırır, böylece kütüphane içindeki fonksiyonlar ve değişkenler ana scriptiniz tarafından erişilebilir hale gelir.
</div>
</details>