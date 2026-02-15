# Bölüm 20: Sistem Yedekleme Stratejileri

> **Giriş:** Bir sistem yöneticisinin başarısı, sistemin ne kadar iyi çalıştığıyla değil, çöktüğünde ne kadar hızlı geri döndürülebildiğiyle ölçülür.

---

## 1. Tar ile Arşivleme

Linux'un en eski ve güvenilir aracıdır:

* `tar -cvzf yedek_$(date +%F).tar.gz /home/baris`: Barış kullanıcısının ana dizini, bugünün tarihiyle sıkıştırılarak yedeklenir.

---

## 2. Rsync ile Akıllı Senkronizasyon

Tüm dosyaları kopyalamak yerine sadece değişen "byte"ları kopyalar:

* `rsync -avz --delete /yerel/dizin/ kullanıcı@uzak-ip:/yedek/dizin/`: Yerel dizini uzak sunucuya yedekler. Eğer yerelde bir dosya silinmişse, uzak taraftan da siler (`--delete`).

<details>
<summary>SORU: 'tar' ile yedek alırken '-v' (verbose) parametresini kullanmak büyük dosyalarda neden önerilmez?</summary>
<div class="answer-content">
Çünkü '-v' parametresi işlenen her dosyayı ekrana basar. Milyonlarca küçük dosyanız varsa, ekrana yazı yazma işlemi yedekleme süresini ciddi şekilde uzatabilir ve sistem kaynaklarını gereksiz tüketir.
</div>
</details>