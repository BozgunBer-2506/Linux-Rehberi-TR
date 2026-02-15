# Bölüm 15: Ağ Yönetimi Temelleri

> **Giriş:** Bir Linux sunucusu, ağın bir parçası değilse sadece bir metal yığınıdır. Ağ yapılandırmasını bilmek, sunucuyu dış dünyaya bağlamaktır.

---

## 1. Ağ Arayüzlerini ve IP Yapısını Anlamak

* **ip addr:** Sisteme bağlı tüm fiziksel ve sanal ağ kartlarını (eth0, wlan0, lo vb.) ve bunlara atanmış IP adreslerini listeler.
* **ip route:** Sistemin trafiği hangi "Gateway" (Ağ Geçidi) üzerinden dışarı aktardığını gösterir.

---

## 2. Port İzleme ve Soket Yönetimi

Sunucuda hangi servislerin dışarıya kapı açtığını bilmek hem yönetim hem güvenlik için şarttır:

* **ss -tuln:** * `-t`: TCP bağlantıları.
* `-u`: UDP bağlantıları.
* `-l`: Dinleme (Listening) modundakiler.
* `-n`: İsim yerine sayısal (IP/Port) gösterim.


* **netstat -plnt:** Hangi portun hangi "PID" (Süreç Numarası) tarafından kullanıldığını gösterir.

---

## 3. Bağlantı Test Araçları

* **ping -c 4 8.8.8.8:** Karşı tarafa 4 paket göndererek gecikme (latency) ve paket kaybını test eder.
* **traceroute:** Paketlerin hedefe ulaşana kadar hangi sunuculardan (hop) geçtiğini haritalandırır.
* **dig / nslookup:** DNS sorgusu yaparak bir alan adının hangi IP'ye gittiğini kontrol eder.

<details>
<summary>SORU: Bir sunucuda 80 portunun dinlenip dinlenmediğini en hızlı nasıl kontrol edersiniz?</summary>
<div class="answer-content">
<b>ss -tuln | grep :80</b> komutu ile 80 portunun (HTTP) "LISTEN" durumunda olup olmadığını anında görebilirsiniz.
</div>
</details>