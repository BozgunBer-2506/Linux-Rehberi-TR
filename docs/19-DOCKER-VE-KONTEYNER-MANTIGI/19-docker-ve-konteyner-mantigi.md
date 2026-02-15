# Bölüm 19: Docker ve Konteyner Teknolojisi

> **Giriş:** "Benim bilgisayarımda çalışıyordu" sorununu bitiren teknolojidir. Uygulamayı ve tüm ortamını bir kutuya (konteyner) hapseder.

---

## 1. İmaj (Image) ve Konteyner Farkı

* **İmaj:** Uygulamanın çalışması için gereken her şeyin (kod, kütüphane, ayarlar) bulunduğu salt okunur bir kalıptır.
* **Konteyner:** İmajın bellek üzerinde çalışan canlı örneğidir.

---

## 2. Temel Docker Operasyonları

* `docker run -d --name web-sunucu -p 8080:80 nginx`: Nginx imajını indirir, "web-sunucu" adıyla arka planda çalıştırır ve sunucunun 8080 portunu konteynerin 80 portuna bağlar.
* `docker exec -it [konteyner_id] bash`: Çalışan bir konteynerin içine girip komut çalıştırmanızı sağlar.
* `docker logs [id]`: Konteyner içinde patlayan hataları görmenizi sağlar.

<details>
<summary>SORU: Bir konteyner silindiğinde içindeki veriler ne olur?</summary>
<div class="answer-content">
Varsayılan olarak konteyner silindiğinde içindeki tüm veriler de yok olur. Verilerin kalıcı olması için "Volume" (Hacim) yapısı kullanılarak veriler fiziksel diske bağlanmalıdır.
</div>
</details>