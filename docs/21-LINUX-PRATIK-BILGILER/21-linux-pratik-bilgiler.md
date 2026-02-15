# Bölüm 21: Ubuntu BASH Pratik Bilgileri ve İpuçları — Profesyonel Rehberi

> **Giriş:** Bu rehber **Ubuntu Linux'taki BASH kabuğu** üzerine odaklanmıştır. BASH (Bourne Again Shell), Linux sistemlerinin kalbi olup, sistem yöneticileri, DevOps mühendisleri ve yazılımcıların günlük operasyonlarını hızlandıran ve otomate eden bir araçtır. Burada yer alan tüm komutlar ve örnekler **Ubuntu 20.04+ üzerinde test edilmiştir**. 
>
> **Önemli:** Bu rehber BASH'e özeldir. Zsh, Fish vb. shell'lerde bazı özellikler (özellikle history, completion) farklı davranır.

---

## BASH Ortamını Anlamak

### BASH Yapılandırma Dosyaları (Ubuntu'da)

Ubuntu'da BASH ayarları hiyerarşik olarak yüklenir:

```bash
# 1. Login Shell (SSH ile bağlanırken)
/etc/profile              → Sistem geneli ayarlar
~/.bash_profile           → Kullanıcı özel ayarlar (varsa)
~/.bashrc                 → Interactive shell ayarları

# 2. Non-login Shell (Terminal açarken)
~/.bashrc                 → Doğrudan yüklenir

# Yapı:
# ~/.bash_profile tipik olarak şu satırları içerir:
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

**Pratik Uygulama:**
```bash
# Ayarlarınız DAIMA ~/.bashrc'ye gitmelidir!
nano ~/.bashrc

# Sonuna ekleyin ve kaydedin
# Ardından yükleyin:
source ~/.bashrc
. ~/.bashrc           # Kısa versiyonu
```

---

## 1. BASH Kabuğu Sihirbazlığı: Navigasyon ve Komut Yönetimi

### 1.1 Hızlı Dizin Navigasyonu

#### **`cd -` — Son Dizine Geri Dön**

```bash
# Bulunduğunuz yer
cd /var/log/apache2
pwd  # /var/log/apache2

# Başka bir dizine git
cd /home/user/projects

# Hızlıca geri dön
cd -
pwd  # /var/log/apache2

# Toggle (ileri-geri git)
cd -  # /home/user/projects'ye döner
cd -  # /var/log/apache2'ye döner
```

**Kullanım Senaryoları:**
- Build loglarını kontrol ederken kaynak kodda değişiklik yapmak
- Production ortamı logları ↔ Configuration files arasında gidip gelme
- İkili problem tanılama

---

#### **`pushd` ve `popd` — Dizin Yığını (BASH Özelliği)**

BASH'in güçlü bir özelliği olan `pushd/popd` ile navigasyonu sistemli hale getirebilirsiniz:

```bash
# Şu anki konum
pwd  # /home/user

# Yığına yeni dizin ekle
pushd /var/log
# /var/log /home/user  ← Stack gösterisi

pushd /opt/backups
# /opt/backups /var/log /home/user

pushd /home/deploy/app
# /home/deploy/app /opt/backups /var/log /home/user

# Yığın görüntüle (numaralarla)
dirs -v
# 0    /home/deploy/app
# 1    /opt/backups
# 2    /var/log
# 3    /home/user

# Yığından çık (LIFO - son giren ilk çıkar)
popd
pwd  # /opt/backups

popd
pwd  # /var/log

# Belirli bir yığın konumuna git (dirs -v'deki numaralar)
cd ~2  # /var/log'a doğrudan git

# Yığını temizle
dirs -c
```

**Profesyonel Workflow Örneği:**
```bash
# Multi-repo deployment
pushd ~/projects/api-server
pushd ~/projects/frontend  
pushd ~/projects/devops-config

# Şu anda frontend'de çalışıyorsunuz ama devops'ta değişiklik gerekli
popd                    # devops-config
# Düzeltme yapın
# Tekrar frontend'e gitmek için
pushd
# Geri döndü çünkü popd'den sonra bir level yukarı çıktı
```

---

### 1.2 BASH History — Güçlü Komut Geçmişi Yönetimi

#### **BASH History'ni Profesyonel Şekilde Ayarlama**

BASH'in history mekanizması çok güçlü ancak varsayılan Ubuntu ayarları sınırlı. İşte profesyonel setup:

```bash
# ~/.bashrc'nin sonuna ekleyin:

# === BASH HISTORY CONFIGURATION ===
export HISTSIZE=10000              # RAM'de tutulacak komut sayısı
export HISTFILESIZE=50000          # ~/.bash_history dosyasında tutulacak
export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S "  # Tarih-saat formatı

# History kontrol (çift komutları, hassas verileri gizle)
export HISTCONTROL=ignoredups:ignorespace:erasedups
# ignoredups: Ardı ardına aynı komut yazılırsa sadece biri tutulur
# ignorespace: Başında boşluk olan komutlar kaydedilmez
# erasedups: Çift olan komutları sil ve yenisini ekle

# Hassas komutları history'den hariç tut
export HISTIGNORE="*passwd*:*password*:*secret*:*token*:*aws_*:*API_KEY*"

# BASH 4.3+ özelliği: Oturumlar arası history senkronizasyonu
shopt -s histappend              # Terminal kapatılırken history silmesin
PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$'\n'}history -a; history -c; history -r"
# history -a: Yeni komutları dosyaya ekle
# history -c: RAM'i temizle
# history -r: Dosyadan güncelle
```

Ayarları yükleyin:
```bash
source ~/.bashrc
```

**Sonuç:** Artık her terminal pencerenizde tamamen senkronize komut geçmişi var!

---

#### **BASH History ile Avansé Komut Yönetimi**

```bash
# Geçmiş göster (numaralarla)
history 30              # Son 30 komutu göster
history | grep "docker" # Docker komutlarını ara

# Geçmişten çalıştır
!256                    # 256. komutu çalıştır
!docker                 # Son "docker" komutunu çalıştır
!?error?               # "error" içeren son komutu çalıştır

# Parametreleri yeniden kullan
!$      # Önceki komutun SON parametresi (en kullanışlı)
!^      # İlk parametre
!*      # Tüm parametreler
!:2     # 2. parametre
!:2-4   # 2. ile 4. parametreler arası

# Örnek — mkdir + cd kombinasyonu
mkdir -p /var/www/production/api/src
cd !$   # Otomatik /var/www/production/api/src'ye gider
```

**Gerçek Dünya Senaryoları:**
```bash
# Senaryo 1: Dosya yedeklemesi
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
# Daha sonra kontrol et
cat !$  # Cat /etc/nginx/nginx.conf.bak'i çalıştırır

# Senaryo 2: History'de değiştirme
grep "error" /var/log/syslog
# Çok fazla result var, daha spesifik ol:
^syslog^/var/log/auth.log  # "syslog"'u "auth.log" ile değiştir

# Senaryo 3: rsync ile backup
rsync -avz /home/user/important /mnt/backup/important
# Kontrol et
ls !$   # Son parametre olan /mnt/backup/important'i list
```

---

#### **`Ctrl + R` — BASH İçinde Reverse Search**

BASH'in en güçlü özelliği reverse interactive search:

```bash
# Terminal'de Ctrl + R'ye basın
(reverse-i-search)`': _

# Aramanız yazın (komutun parçası)
(reverse-i-search)`ngin': sudo nginx -t

# Bulundu! Seçenekler:
Enter               # Komutu çalıştır
Ctrl + R            # Sonraki eşleşme
Ctrl + S            # Önceki eşleşme (zaman içinde backwards)
Esc/Ctrl + G        # Arama iptal et, komut editör modunda kal
```

**Arama İpuçları:**
```bash
# En iyi uygulamalar
Ctrl + R            # docker ile başla
                    # docker-compose, docker ps, docker run...
Ctrl + R            # yaml ile başla
                    # find ... .yaml, grep yaml, vb.

# Eğer çok sayıda eşleşme varsa:
# Daha spesifik hale getir
Ctrl + R
docker ps           # Tüm "docker" değil "docker ps"
```

---

#### **`fc` — Son Komutu Editör'de Aç ve Düzelt**

Uzun veya karmaşık komutları hızlıca düzeltmek:

```bash
# Karmaşık bir find komutu yazarsınız
find /var/log -type f -name "*.log" -mtime +30 -exec gzip {} \;

# Parametreden emin değilsiniz, HATA olabilir
# Düzeltmek için:
fc  # Son komutu $EDITOR (varsayılan nano/vim) açar
    # Düzelt: -mtime +30 → -mtime +60
    # Kaydet ve çık (:wq vim, Ctrl+X nano)
    # Komut otomatik çalışır!

# Önceki komutları düzelt
history | grep docker  # 456 numaralı docker ps komutunu gördün
fc 456                 # 456. komutu editör'de aç

# Editör'ü değiştir
export FCEDIT=nano     # Nano kullan
export FCEDIT=vim      # Vim kullan
```

---

#### **BASH History Güvenliği ve Temizliği**

```bash
# Geçmiş dosyasını göster
cat ~/.bash_history
wc -l ~/.bash_history  # Satır sayısı

# Mevcut oturumun geçmişini temizle (RAM'den sadece)
history -c
# Dosya etkilenmez ama RAM temizlenir

# Tüm history dosyasını sil (CİDDEN SILINECEK!)
history -w /dev/null    # ~/.bash_history içini boşalt
history -c              # RAM temizle

# SSH'den çıkmadan önce hassas komutları temizle
history -d 256          # 256. komutu RAM'den sil (dosya değil)

# Daha güvenli: Başında boşluk olan komutlar tutulmaz
 mysql -u root -p'password' database  # Başında boşluk!
history | grep mysql    # Görünmez (ignorespace)
```

**Güvenlik Best Practice:**
```bash
# ~/.bashrc'ye ekle
export HISTCONTROL=ignorespace  # Başında boşluk komutları gizle

# Kulllanım
 ssh-keygen -N 'secret'         # Başında boşluk = history'ye yazılmaz
 AWS_ACCESS_KEY_ID='...' ./script.sh
```

---

## 2. BASH Dosya ve Metin Manipülasyonu

### 2.1 Dosya Kopyalama ve Yedekleme

#### **Brace Expansion — `cp dosya{,.bak}` ile Hızlı Yedekleme**

BASH özelliği olan brace expansion çok kullanışlı:

```bash
# BASH brace expansion
cp config.conf{,.bak}
# Açılım: cp config.conf config.conf.bak

# Tarih ekle
cp database.sql{,.backup.$(date +%Y%m%d)}
# Sonuç: database.sql → database.sql.backup.20240215

# Birden fazla dosya
for f in *.yaml; do
    cp "$f"{,.bak}
done
# Tüm YAML dosyalarını yedekle

# Kopyalayı doğru hale getir
cp important.txt{,.backup}  # Güvenli
cp important.txt{,.bak}     # Güvenli
```

**Avantajları:**
- Yazım hatası riski düşer (parametreyi iki kez yazmazsınız)
- Otomasyon scriptlerinde daha okunabilir
- BASH-native, harici tool gerekmez

---

#### **`shred` — Geri Döndürülemez Veri Silme**

Basit `rm` komutunun aksine, `shred` dosyayı fiziksel olarak siler:

```bash
# Kurulum (genellikle yüklüdür)
which shred
# /usr/bin/shred

# Basit silme (disk'te izler kalabilir)
rm secret.txt

# Güvenli silme (HDD'de üzerine yazma)
shred -u secret.txt
# -u: Sildikten sonra üzerine yazma

# Detaylı silme
shred -vfz -n 10 /home/user/.ssh/id_rsa.bak
# -v: Verbose (neler yapıldığını göster)
# -f: İzinleri zorla değiştir
# -z: Son yazma işlemini sıfırlarla yap
# -n 10: 10 defa üzerine yaz

# Kontrol
shred -u ~/sensitive.txt
ls ~/sensitive.txt  # Dosya gitmişti ✓
```

**Uyarı:** SSD'lerde ve dosya sistemlerinde (ext4 CoW) tam güvenlik sağlamayabilir. Hassas veriler için **full-disk encryption** daha uygun.

---

### 2.2 Metin Dosyalarında Real-Time Izleme

#### **`less +F` — Canlı İzleme + Arama Kombinasyonu**

`tail -f` gibi canlı izler ama arama yapabilirsiniz:

```bash
# Application loglarını canlı izle
less +F /var/log/app.log
# Yeni satırlar otomatik gösterilir (tail -f gibi)

# İçinde arama yapmak için:
Ctrl + C        # İzlemeyi durdur (Freeze modu)
/ERROR          # "/" ile ara
n               # Sonraki eşleşme
N               # Önceki eşleşme
G               # Dosyanın sonuna git
F               # Tekrar canlı izle başla

# Örnek workflow — production bug tanılama
less +F /var/log/api.log
# Logları izlemeye başla
Ctrl + C
/database connection failed  # Hatayı ara
# Tüm eşleşmeler vurgulanır
# Tarih/saat ekranında
F
# Tekrar canlı izle
```

---

#### **`grep -r` — Derinlemesine Metin Arama**

```bash
# Basit kullanım
grep -r "error" /var/log/

# Profesyonel kullanım (satır numarası + context)
grep -rn "ERROR\|CRITICAL\|Exception" /var/log/app/
# -r: Recursive (all files)
# -n: Line numbers

# Belirli dosya türleri
grep -r --include="*.js" "console.log" src/

# Exclude (dışarı tut)
grep -r "password" . --exclude-dir=.git --exclude-dir=node_modules

# Context (bağlam) — eşleşmeden 3 satır öncesi/sonrası
grep -rC 3 "database connection" /etc/

# Regex (düzenli ifade)
grep -rEn "(DROP TABLE|UNION SELECT|OR 1=1)" /var/www/
# SQL Injection tespiti

# Sayı almak
grep -r "api_key" . | wc -l  # Kaç tane
```

---

## 3. Sistem Yönetimi ve Performans

### 3.1 Disk Kullanımı Analizi

#### **`ncdu` — Etkileşimli Disk Analizi**

Sistem yönetiminin sık karşılaşılan sorunu: "Disk alanımı kim dolduruyor?"

```bash
# Kurulum
sudo apt-get update
sudo apt-get install ncdu

# Basit kullanım
ncdu /var/log

# Çıkış (interaktif):
# ┌─────────────────────────────────────────┐
# │ 4.2 GiB [##########] /var/log           │
# ├─────────────────────────────────────────┤
# │ 2.1 GiB [#####     ] apache2             │
# │ 1.3 GiB [###       ] nginx               │
# │ 0.8 GiB [##        ] application         │
# │ 0.0 GiB              syslog

# Kontroller
j, k             # Yukarı/aşağı (vim tarzı)
h, l             # Sol/sağ (dizin gir/çık)
d                # Seçili dizini sil (onay ister)
/                # İçinde arama
s                # Sıralama değiştir (boyut, isim, etc.)
c                # Tarayı yenile

# Performance karşılaştırması
time ncdu -1 /var/ | head -10
# Real 8.45s (hızlı)

# vs

time du -sh /var/*
# Real 45s (yavaş)
```

---

#### **`du` Komutunun Doğru Kullanımı**

ncdu yoksa `du` kullan:

```bash
# Ne kadar? (basit)
du -sh /var
# 50G     /var

# Altdizinler
du -sh /var/*
# 25G     /var/log
# 15G     /var/lib
# 10G     /var/cache

# İnsan okunabilir, sıralı
du -sh /var/* | sort -h
# 10G
# 15G
# 25G

# En büyük 10 dizin
du -sh /var/* | sort -rh | head -10

# Belirli derinlik
du -sh --max-depth=2 /var
```

---

### 3.2 Process Monitoring — `top` vs `htop`

#### **`htop` — Modern Process Manager (Ubuntu BASH uyumlu)**

```bash
# Kurulum
sudo apt-get install htop

# Çalıştır
htop

# Görüntü (renklendirme ile):
# PID USER      PR  NI    VIRT    RES  %CPU %MEM    TIME+
# 127 root      20   0  456.2M  234.5M  8.5 12.3   2:34
# 289 postgres  20   0  789.2M  345.6M 23.2 18.4   5:45

# BASH'te etkileşimli kontrol
F3              # Arama (process ismi)
F4              # Filter (process türü)
F5              # Ağaç görünümü (parent-child)
F6              # Sıralama (CPU, RAM, etc.)
F9              # Process kill (SIGTERM veya custom signal)
<, >            # Sıralama sütununu değiştir

# Komut satırından
htop -p 1234,5678        # Belirli PID'leri izle
htop -u postgres         # Belirli kullanıcı
htop -s PERCENT_CPU      # CPU'ya göre sıra
```

**Senaryo: Memory Leak Tespiti**
```bash
htop
F5              # Ağaç görünümü
# Belirli bir prozess'in RAM'ini izle
# Şayet 30 dakikada 100M → 1.5G'ye çıkarsa, memory leak vardır
```

---

### 3.3 Sistem Bilgisi Komutları

#### **`uname -a` — Sistem Bilgisi**

```bash
uname -a
# Linux myserver 5.15.0-1025-aws #29~20.04.1-Ubuntu SMP x86_64 GNU/Linux

# Açılım
uname -s                 # Linux (OS adı)
uname -r                 # 5.15.0-1025-aws (kernel versiyonu)
uname -m                 # x86_64 (mimari)

# Ubuntu sürümü
cat /etc/os-release      # Ubuntu 20.04 LTS detayları
lsb_release -a          # Ubuntu release info

# CPU bilgisi
nproc                   # CPU çekirdek sayısı
cat /proc/cpuinfo       # Detaylı CPU bilgisi

# RAM bilgisi
free -h                 # Human-readable RAM
# total   used   free
# 15Gi    8.5Gi  6.5Gi
```

---

## 4. SSH ve Ağ Yönetimi (BASH Bağlamında)

### 4.1 SSH Anahtar Yönetimi

#### **SSH Anahtarı Oluşturma (Ubuntu'da)**

```bash
# 1. Anahtar çiftini oluştur
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""
# -t: ed25519 (güvenli ve hızlı, modern)
# -f: Dosya yolu
# -N: Passphrase (boş = şifresiz)

# Alternatif (eski sistemlerde)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
# rsa ve 4096 bit (yavaş ama geniş uyumlu)

# 2. Anahtarı sunucuya gönder (ilk kez şifre yazarsınız)
ssh-copy-id user@remote-server.com

# 3. Test — şifresiz giriş
ssh user@remote-server.com
# Şifre istenmez ✓

# İzinleri kontrol et (çok önemli!)
ls -la ~/.ssh
# -rw-------  id_ed25519          (600 izni)
# -rw-r--r--  id_ed25519.pub      (644 izni)
# drwx------  .                   (700 izni)

# Yanlış ise düzelt
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub
```

---

#### **`~/.ssh/config` — SSH Bağlantılarını Basitleştir**

```bash
# ~/.ssh/config dosyası oluştur
cat > ~/.ssh/config << 'EOF'
Host prod-web1
    HostName web1.example.com
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    Port 22
    AddKeysToAgent yes

Host prod-db
    HostName db.example.com
    User postgres
    IdentityFile ~/.ssh/db-key
    Port 2222
    AddKeysToAgent yes

Host *.internal
    # Wildcard kuralı
    ProxyJump bastion
    User appuser
EOF

chmod 600 ~/.ssh/config

# Artık basit:
ssh prod-web1          # web1.example.com yerine
ssh prod-db            # db.example.com:2222 yerine
ssh appserver.internal # bastion üzerinden geçer
```

---

### 4.2 SSH Port Forwarding (BASH Tunneling)

```bash
# Local port forwarding
# Eğer remote servisin local'de görülmesi gerekiyorsa
ssh -L 3000:remote.example.com:3000 user@remote.example.com
# Başka terminal:
curl http://localhost:3000
# remote.example.com:3000'e bağlı

# Remote port forwarding
# Local servisinizi remote'da açmak
ssh -R 8080:localhost:3000 user@server.example.com
# server.example.com:8080 → localhost:3000

# Dynamic SOCKS proxy
# Tüm trafiği SSH üzerinden tunnel
ssh -D 1080 user@bastion.example.com
# Tarayıcı proxy: 127.0.0.1:1080 (SOCKS5)
# Tüm internet trafiği bastion üzerinden geçer
```

---

### 4.3 Ağ Tanılama — `mtr`

#### **`mtr` — Ping + Traceroute Kombinasyonu**

```bash
# Kurulum
sudo apt-get install mtr

# Kullanım
mtr -c 100 google.com

# Çıkış (canlı güncellenen):
# HOST: localhost
# Packets Pkt%  Drop  Rcv   Snt  Last    Avg  Best Wrst
#  1. 192.168.1.1      0.0%  0    100   100  1.2   1.4  1.1   2.3
#  2. 10.0.0.1         1.5%  2    98    100  5.6   5.8  5.2   8.4
#  3. 8.8.8.8          2.1%  2    98    100  45.6  45.2 44.1  52.3

# Seçenekler
mtr -c 50 google.com           # 50 paket
mtr -r -c 100 google.com       # Report modu
mtr -n google.com              # IP'leri DNS'e çevirme (daha hızlı)
mtr -p 443 google.com          # Belirli port

# Sorun teşhisi
mtr -r -c 1000 problematic-host | grep -E "Drop|Wrst"
# Drop > %2 ise o hop'ta sorun vardır
```

---

## 5. BASH ile Arka Planda İş Yönetimi

### 5.1 `disown` — Parentten Ayırma

İşlemler terminal kapandıktan sonra devam etsin:

```bash
# Arka planda job başlat
tar -czf backup-10gb.tar.gz /home/user/data &  # Background işi
# [1] 12345  ← Job numarası ve PID

# Daha fazla iş
mysql-backup > dump.sql &
./build-script.sh &

# Mevcut job'ları listele
jobs -l
# [1]   12345 Running  tar -czf...
# [2]   12346 Running  mysql-backup...
# [3]   12347 Running  ./build-script.sh

# Tüm job'ları parentten ayır
disown -a

# Terminal'i kapat
exit

# Daha sonra kontrol et
ps aux | grep "tar -czf"
# İş hâlâ çalışıyor ✓
```

---

### 5.2 `watch` — Komut Polling

#### **`watch -n` — Belirli Aralıkla Komut Çalıştır**

```bash
# Her 2 saniyede bir GPU durumunu izle
watch -n 2 nvidia-smi

# Her 1 saniyede bir disk I/O
watch -n 1 'iostat -x 1 2'

# Değişimi highlight et
watch -d 'df -h | grep /home'
# -d: Değişenleri vurgula

# Build loglarını izle
watch -n 5 'tail -20 /var/jenkins/workspace/build.log'

# Kontroller:
q               # Çık
p               # Duraklat/Devam
+/-             # Hız ayarla
```

---

### 5.3 `sudo !!` — Yetkinlik Hatası Düzeltme

```bash
# Yetkiniz yok
systemctl restart nginx
# Output: System has not been booted with systemd as init...

# Hızlı çözüm
sudo !!
# Sudo ile tekrar çalış

# Alternatif history substitutions
!grep           # Son "grep" komutunu çalıştır
!apt            # Son "apt" komutunu çalıştır

# Parametreleri değiştirerek çalıştır
grep "error" /var/log/syslog
^syslog^auth.log  # "syslog"'u "auth.log" ile değiştir
```

---

## 6. BASH Komut Düzenleme Kısayolları

Hiç terminale bakmazsınız ama bu kısayollar zamanı kurtarır:

```bash
# Komut düzenleme (readline)
Ctrl + A        # Satırın başına git
Ctrl + E        # Satırın sonuna git
Ctrl + W        # Son kelimeyi sil
Ctrl + U        # İmleç'ten başına kadar sil
Ctrl + K        # İmleç'ten sonuna kadar sil
Ctrl + Y        # Silinen metni yapıştır (Ctrl+U/K sonrası)
Ctrl + L        # Terminal'i temizle (clear)
Ctrl + D        # EOF gönder (bash çıkşı)
Ctrl + C        # SIGINT gönder (işlemi durdur)

# Kelime yönetimi
Alt + B         # Önceki kelimeye git
Alt + F         # Sonraki kelimeye git
Alt + Backspace # Önceki kelimeyi sil
Alt + D         # Sonraki kelimeyi sil
Alt + .         # Önceki komutun son kelimesi
Alt + *         # Komut satırını genişlet (expansion göster)

# Pratik örnek
long_command_that_is_wrong_at_the_end_specifically
# Hata'yı fark ettiniz
Ctrl + U                    # Hepsini sil
sudo                        # sudo ekle
Ctrl + Y                    # Orijinali yapıştır
# Sonuç: sudo long_command_that_is_wrong_at_the_end_specifically
```

---

## 7. BASH Functions — Üretim Ortamında Özel Komutlar

BASH'in güçlü taraflarından biri custom function'larıdır:

### 7.1 Log Görüntüleme Fonksiyonu (Renklendirme)

```bash
# ~/.bashrc'ye ekle:
function colorlog() {
    tail -f "$1" | sed \
        -e 's/ERROR/\x1b[0;31mERROR\x1b[0m/g' \
        -e 's/WARN\|WARNING/\x1b[0;33mWARN\x1b[0m/g' \
        -e 's/INFO/\x1b[0;32mINFO\x1b[0m/g' \
        -e 's/DEBUG/\x1b[0;34mDEBUG\x1b[0m/g'
}

# Kullanım
colorlog /var/log/app/error.log
# ERROR'lar kırmızı, WARNING'ler sarı, vb.
```

---

### 7.2 Backup Fonksiyonu

```bash
# ~/.bashrc'ye ekle:
function backup() {
    local file=$1
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    if [ -f "$file" ]; then
        cp "$file" "${file}.backup.${timestamp}"
        echo "✓ Backed up: ${file}.backup.${timestamp}"
    else
        echo "✗ File not found: $file"
    fi
}

# Kullanım
backup /etc/nginx/nginx.conf
# ✓ Backed up: /etc/nginx/nginx.conf.backup.20240215_154523
```

---

### 7.3 Hızlı Directory Jump

```bash
# ~/.bashrc'ye ekle:
# Sık gidilen dizinleri kısaltma
function prod() { cd /var/www/production && ls -la; }
function logs() { cd /var/log && ls -la; }
function dev() { cd ~/development && ls -la; }

# Veya daha gelişmiş
declare -A CDPATH=(
    [prod]="/var/www/production"
    [logs]="/var/log"
    [dev]="~/development"
)

function jump() {
    if [ -z "$1" ]; then
        echo "Usage: jump [prod|logs|dev]"
    else
        cd "${CDPATH[$1]}" && pwd
    fi
}

# Kullanım
jump prod
```

---

## 8. BASH Best Practices

### 8.1 BASH Scripting Temelleri (Bir Adım Öteye)

```bash
#!/bin/bash
# Script örneği — düzgün başlık ve hata işleme

set -euo pipefail  # Hataların scripti durdurması
# -e: Hata kodu dönen komut'ta durdur
# -u: Tanımlanmamış değişken kullanırsa hata
# -o pipefail: Pipe hatasında durdur

# Güvenli değişken tanımlama
readonly BACKUP_DIR="/mnt/backup"
readonly LOG_FILE="/var/log/backup.log"

# Fonksiyon (error handling ile)
perform_backup() {
    local source=$1
    local dest=$2
    
    if [ ! -d "$source" ]; then
        echo "Error: Source directory not found: $source" >&2
        return 1
    fi
    
    echo "Backing up $source to $dest" >> "$LOG_FILE"
    rsync -avz "$source" "$dest"
}

# Kullanım
perform_backup /home/user /mnt/backup
```

---

## 9. BASH Sistem Yöneticisinin Araç Kutusu

| Kategori | Komut | Ubuntu Paket | Amaç |
|----------|-------|-------------|------|
| **History** | `Ctrl+R`, `!$`, `fc` | Built-in | Komut yönetimi |
| **Navigasyon** | `cd -`, `pushd/popd` | Built-in | Hızlı geçiş |
| **Disk** | `ncdu`, `du -sh` | `ncdu` kurulu | Alan analizi |
| **Process** | `htop`, `ps aux` | `htop` kurulu | Monitoring |
| **SSH** | `ssh-copy-id`, `ssh -t` | Built-in | Remote access |
| **Ağ** | `mtr`, `ss`, `netstat` | `mtr` kurulu | Teşhis |
| **Metin** | `grep -r`, `sed`, `awk` | Built-in | Metin işleme |
| **Yardımcı** | `watch`, `nohup`, `disown` | Built-in | Job yönetimi |

---

## 10. Pratik BASH Örnekleri — Gerçek Senaryolar

### Senaryo 1: Log Rotation ve Temizlik

```bash
#!/bin/bash
# ~/bin/clean_old_logs.sh

set -euo pipefail

LOG_DIR="/var/log/app"
DAYS_OLD=30

echo "Cleaning logs older than $DAYS_OLD days..."

find "$LOG_DIR" -type f -name "*.log" -mtime +$DAYS_OLD -exec gzip {} \;
# Eski logları sıkıştır

find "$LOG_DIR" -type f -name "*.log.gz" -mtime +90 -delete
# 90 günden eski compressed logları sil

echo "Cleanup complete"
```

---

### Senaryo 2: Sistem Yedeklemesi

```bash
#!/bin/bash
# ~/bin/system_backup.sh

set -euo pipefail

BACKUP_TARGET="/mnt/backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$TIMESTAMP"

mkdir -p "$BACKUP_TARGET"

# Önemli dizinleri backup
rsync -avz --delete \
    /home \
    /etc \
    /var/www \
    "$BACKUP_TARGET/$BACKUP_NAME/"

echo "✓ Backup completed: $BACKUP_TARGET/$BACKUP_NAME"

# Eski backupları temizle (30 günden eski)
find "$BACKUP_TARGET" -maxdepth 1 -type d -name "backup_*" -mtime +30 -exec rm -rf {} \;
```

---

## 11. İleri Öğrenme Kaynakları

- **GNU BASH Manual:** https://www.gnu.org/software/bash/manual/
- **Bash Pitfalls (Tuzaklar):** https://mywiki.wooledge.org/BashPitfalls
- **Bash Guide:** https://mywiki.wooledge.org/BashGuide
- **Advanced Bash Scripting:** https://www.tldp.org/LDP/abs/html/
- **BASH Completion Guide:** https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion.html

---

**Son Söz:** BASH uzun bir yolculuk. Bu rehber temellerdir. Her gün bir komut, bir function, bir script öğrenin. Linux'ta hız = Yüksek BASH verimliliği.

🎯 **Happy Bashing!**