# Bölüm 23: Linux Essentials Practice Test - (Standard Exam Format)

## Linux Sertifikası Neden Önemlidir?

Linux sertifikasına (özellikle LPI Linux Essentials gibi başlangıç seviyelerine) sahip olmak, bilişim kariyerinde şu kapıları açar:

1. **Temel Yetkinlik Kanıtı:** İşverenlere, komut satırı ve açık kaynak dünyası hakkında standart bir bilgi birikimine sahip olduğunuzu kanıtlar.
2. **Kariyer Basamağı:** Sistem yöneticiliği (SysAdmin), DevOps veya Siber Güvenlik gibi alanlara geçiş için en sağlam temeldir.
3. **Global Geçerlilik:** Bu sertifikalar dünya çapında tanınır ve özgeçmişinize profesyonel bir ağırlık katar.
4. **Açık Kaynak Kültürü:** Sadece komutları değil, lisanslama ve açık kaynak felsefesini de bildiğinizi gösterir.

---

## Practice Test

### Question 1

What is the primary function of the Linux kernel?

A) Managing hardware resources and communication

B) Displaying web pages

C) Providing a graphical user interface (GUI)

D) Deleting files automatically

<details><summary>Correct Answer</summary>A) Managing hardware resources and communication</details>

---

### Question 2

Which license requires that modified versions of the software remain open source?

A) Proprietary

B) MIT

C) GNU GPL

D) BSD

<details><summary>Correct Answer</summary>C) GNU GPL</details>

---

### Question 3

Which command is used to list all files, including hidden ones, in the current directory?

A) ls -l

B) ls -a

C) dir

D) list --all

<details><summary>Correct Answer</summary>B) ls -a</details>

---

### Question 4

Which command is used to access the manual pages of a specific tool?

A) help

B) info

C) man

D) guide

<details><summary>Correct Answer</summary>C) man</details>

---

### Question 5

Which of the following is NOT a Linux distribution?

A) Ubuntu

B) CentOS

C) Apache

D) Fedora

<details><summary>Correct Answer</summary>C) Apache</details>

---

### Question 6

Which directory contains system-wide configuration files?

A) /bin

B) /etc

C) /home

D) /var

<details><summary>Correct Answer</summary>B) /etc</details>

---

### Question 7

Which command is used to move or rename a file?

A) cp

B) mv

C) rn

D) transfer

<details><summary>Correct Answer</summary>B) mv</details>

---

### Question 8

Which command displays the full path of the current working directory?

A) whereami

B) path

C) pwd

D) dir -p

<details><summary>Correct Answer</summary>C) pwd</details>

---

### Question 9

How do you create a new directory?

A) mkfile

B) mkdir

C) newdir

D) create -d

<details><summary>Correct Answer</summary>B) mkdir</details>

---

### Question 10

Which command prints the entire content of a file to the terminal?

A) show

B) print

C) cat

D) view

<details><summary>Correct Answer</summary>C) cat</details>

---

### Question 11

What is the numeric value for the permissions 'rwxr-xr-x'?

A) 644

B) 755

C) 777

D) 700

<details><summary>Correct Answer</summary>B) 755</details>

---

### Question 12

Which symbol is used to redirect the output of one command to another command as input?

A) >

B) | (Pipe)

C) &

D) * <details><summary>Correct Answer</summary>B) | (Pipe)</details>

---

### Question 13

On a Debian-based system, which command is used to install a new package?

A) yum install

B) apt install

C) rpm -i

D) dnf upgrade

<details><summary>Correct Answer</summary>B) apt install</details>

---

### Question 14

Which command displays the amount of free and used memory (RAM) in the system?

A) df

B) free

C) top

D) vmstat

<details><summary>Correct Answer</summary>B) free</details>

---

### Question 15

Which command is used to search for a specific string within a file?

A) search

B) find

C) grep

D) locate

<details><summary>Correct Answer</summary>C) grep</details>

---

### Question 16

Which tool provides a real-time, dynamic view of running processes?

A) ps aux

B) top

C) kill

D) service

<details><summary>Correct Answer</summary>B) top</details>

---

### Question 17

Which command is used to change a user's password?

A) password

B) passwd

C) change -p

D) usermod

<details><summary>Correct Answer</summary>B) passwd</details>

---

### Question 18

What is a key difference between a hard link and a symbolic link?

A) There is no difference

B) Hard links point to the same inode; symbolic links point to a filename

C) Symbolic links are faster

D) Hard links can link directories easily

<details><summary>Correct Answer</summary>B) Hard links point to the same inode; symbolic links point to a filename</details>

---

### Question 19

Which command shows active network connections and listening ports?

A) netstat

B) ifconfig

C) ping

D) route

<details><summary>Correct Answer</summary>A) netstat</details>

---

### Question 20

Which character is used to reference the value of a variable in a Bash script?

A) #

B) @

C) $

D) %

<details><summary>Correct Answer</summary>C) $</details>

---

Dosya tam istediğin standartlara geldi. Başka bir bölümü düzenlememi ister misin, yoksa bu halini kaydedelim mi?

---

# Practical Exam Tips – Linux Essentials (Critical)

## 1. Exam Structure

* Questions: 40
* Duration: 60 minutes
* Passing score: ~500 / 800
* Question types:

  * Multiple choice
  * Single answer
  * Multiple answer (IMPORTANT: read carefully)

---

## 2. Most Frequently Asked Topics (High probability)

Memorize these commands:

```bash
ls
cp
mv
rm
chmod
chown
ps
top
kill
df
du
free
find
grep
cat
less
ssh
scp
```

And directories:

```bash
/etc
/home
/var
/proc
/tmp
/bin
/usr
```

And files:

```bash
/etc/passwd
/etc/shadow
/etc/group
```

---

## 3. Absolute Must-Know Concepts

You WILL get questions about:

* file permissions (rwx)
* octal permissions (755, 644)
* ownership
* hard vs symbolic links
* processes
* environment variables
* basic networking
* filesystem hierarchy

---

## 4. Trick Question Pattern (Very common)

Example:

```bash
ln file1 file2
```

Students pick symbolic link ❌
Correct answer: hard link ✅

Symbolic link requires:

```bash
ln -s file1 file2
```

---

## 5. Time Strategy

You have 60 min for 40 questions:

* target: 60–90 seconds per question
* skip difficult questions
* return later

Passing is not 100%, only ~65%

---

## 6. Golden Rule

If you understand these concepts, you will pass:

* permissions
* ownership
* processes
* basic commands
* filesystem structure

---

## 🏁 Online Exam Access

Sınava online olarak giriş yapmak ve resmi platforma erişmek için aşağıdaki bağlantıyı kullanabilirsiniz:

[Click Here to Start the Linux Essentials Online Exam](https://www.lpi.org/our-certifications/linux-essentials-overview)

---