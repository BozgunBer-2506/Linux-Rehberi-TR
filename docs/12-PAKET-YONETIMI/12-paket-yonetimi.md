# Bölüm 12: Paket Yönetimi

> **Giriş:** Yazılımlar merkezi depolardan (Repository) çekilir. Paket yöneticileri bağımlılıkları otomatik çözer.

---

## 1. APT (Debian/Ubuntu) Temelleri

En yaygın kullanılan paket yönetim aracıdır.

* **update:** `sudo apt update` -> Depo listesini günceller.
* **install:** `sudo apt install [paket]` -> Yazılımı kurar.
* **remove:** `sudo apt remove [paket]` -> Yazılımı siler.
* **upgrade:** `sudo apt upgrade` -> Paketleri son sürüme yükseltir.

---

## 2. RHEL ve Fedora (DNF/YUM)

Kurumsal dağıtımların paket yöneticileridir.

* `dnf install [paket]` -> Kurulum yapar.
* `dnf search [kelime]` -> Depoda paket arar.

---

## 3. Sorgulama Komutları

Paketler hakkında bilgi almak için kullanılır:

* `dpkg -l`: Kurulu tüm paketleri listeler.
* `apt show [paket]`: Paket detaylarını gösterir.

---

## 4. Kaynak Koddan Kurulum (Manuel)

Eğer paket depoda yoksa şu üç adımla kurulur:

```bash
./configure
make
sudo make install

```

<details>
<summary>SORU: 'apt upgrade' yapmadan önce neden her zaman 'apt update' yapmalıyız?</summary>
<div class="answer-content">
'update' komutu uzak depolardaki paketlerin son sürümlerini içeren listeyi günceller. Eğer listeyi güncellemeden 'upgrade' derseniz, sistem yeni sürümlerden haberdar olmadığı için hiçbir şeyi yükseltmez.
</div>
</details>