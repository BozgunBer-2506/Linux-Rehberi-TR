# Bölüm 13: Süreç (Process) Yönetimi

> **Giriş:** Linux'ta çalışan her bir görev bir "Süreç"tir. Sistem kaynaklarını kimin kullandığını bilmek, sunucunun sağlığını korumanın ilk adımıdır.

> **Eğitim Notu:** Bir süreci sonlandırırken her zaman en yumuşak sinyalden (SIGTERM) başlayın. Hemen 'kill -9' yapmak verilerin diske düzgün yazılmasını engelleyebilir.

---

## 1. Süreçleri Görüntüleme
* **ps aux:** Sistemin o anki tüm süreçlerinin detaylı listesini verir.
* **top:** Canlı ve sürekli güncellenen bir izleme tablosu sunar.
* **htop:** Renkli ve interaktif, süreçleri yönetmek için en pratik araçtır.

## 2. Süreçleri Kontrol Etme (Kill ve Sinyaller)
Süreçlere sinyal göndererek onları yönetiriz:
* **kill -15 (SIGTERM):** "Lütfen kapan" mesajıdır. Güvenlidir.
* **kill -9 (SIGKILL):** "Hemen kapan" mesajıdır. Zorlayıcıdır.



## 3. Öncelik Ayarları: Nice ve Renice
İşlemcinin (CPU) hangi sürece daha çok vakit ayıracağını belirler.
* **Nice:** Bir süreç başlarken ona nezaket puanı veririz (-20 ile 19 arası).
* Sayı ne kadar küçükse (-20), süreç o kadar "kaba" davranır ve işlemciyi sahiplenir.

---

<details>
<summary>SORU: 'Load Average' değeri çekirdek sayısını geçerse ne olur?</summary>
<div class="answer-content">
Sistem darboğaza girer. İşlemci tüm görevlere yetişemediği için süreçler kuyrukta beklemeye başlar ve sistemde donmalar görülür.
</div>
</details>