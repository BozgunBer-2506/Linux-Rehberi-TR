# Bölüm 18: Güvenlik Duvarı (Firewall)

> **Giriş:** Güvenlik duvarı, gelen trafiği "Allow" (İzin ver) veya "Deny" (Reddet) kuralları ile süzen bir kalkandır.

---

## 1. UFW (Uncomplicated Firewall) Kullanımı

Linux dünyasının en pratik duvarıdır:

* `ufw allow 22/tcp`: SSH portunu açar.
* `ufw allow 80,443/tcp`: Web trafiğini açar.
* `ufw deny from 192.168.1.50`: Belirli bir IP'yi tamamen bloklar.
* `ufw enable`: Duvarı ayağa kaldırır.

---

## 2. Iptables ve Kurallar Zinciri

UFW'nin arkasındaki asıl motor `iptables`'dır. Üç ana zincir (chain) üzerinden çalışır:

* **INPUT:** Sunucuya gelen trafik.
* **OUTPUT:** Sunucudan giden trafik.
* **FORWARD:** Sunucu üzerinden başka yere giden trafik.

<details>
<summary>SORU: 'ufw deny 22' komutu SSH bağlantınızı keser mi?</summary>
<div class="answer-content">
Evet, eğer SSH portunuz varsayılan 22 ise ve o an bağlıysanız, duvarı aktif ettiğiniz (enable) anda bağlantınız kopar ve bir daha erişemezsiniz. Bu yüzden kural eklerken çok dikkatli olunmalıdır.
</div>
</details>