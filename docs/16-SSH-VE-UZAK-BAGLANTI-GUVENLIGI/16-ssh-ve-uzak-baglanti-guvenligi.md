# Bölüm 16: SSH ve Uzak Bağlantı Güvenliği

> **Giriş:** SSH (Secure Shell), uzak sunucu yönetiminin standartıdır. Ancak varsayılan ayarlar, kaba kuvvet (Brute Force) saldırıları için açık kapıdır.

---

## 1. Güvenli Yapılandırma (/etc/ssh/sshd_config)

Dosyayı düzenledikten sonra `systemctl restart ssh` komutu ile ayarlar aktif edilir:

* **Port Değişimi:** Port 22 yerine 4832 gibi yüksek bir port kullanmak bot saldırılarını %90 azaltır.
* **PermitRootLogin no:** Root kullanıcısının doğrudan şifreyle girmesini engeller.
* **MaxAuthTries 3:** Yanlış şifre deneme sınırını belirler.

---

## 2. SSH Key (Anahtar) Tabanlı Giriş

Şifre kullanmak yerine çok daha güvenli olan RSA/Ed25519 anahtarları kullanılır:

1. `ssh-keygen`: Kendi bilgisayarınızda bir anahtar çifti oluşturur.
2. `ssh-copy-id kullanıcı@sunucu`: Genel anahtarı sunucuya gönderir.
3. Artık şifresiz ama çok daha güvenli bir giriş sağlanır.

<details>
<summary>SORU: SSH anahtarı oluştururken kullanılan 'passphrase' nedir ve neden önemlidir?</summary>
<div class="answer-content">
Passphrase, SSH anahtarınızın üzerine eklenen bir şifredir. Eğer birisi özel anahtar dosyanızı (id_rsa) çalarsa, bu şifreyi bilmediği sürece anahtarı kullanamaz. Ek bir güvenlik katmanı sağlar.
</div>
</details>