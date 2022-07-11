---
title: "Arch Linux Secure Boot Tutorial"
date: "2021-09-23"
desc: "Configure Secure Boot on Arch Linux."
tag:
  - "arch"
  - "linux"
---

# Abstract

Secure boot is a security standard developed by members of the PC industry to help make sure that a device boots using only software that is trusted by the Original Equipment Manufacturer (OEM). When the PC starts, the firmware checks the signature of each piece of boot software, including UEFI firmware drivers (also known as Option ROMs), EFI applications, and the operating system. If the signatures are valid, the PC boots, and the firmware gives control to the operating system.

# Implementing Secure Boot

## Disclaimer

> I am not responsible for any hardware bricks. You do it on yourself, you agree to be responsible on what you do.

## Before you do anything

Install `efitools` package as it will be needed throughout the tutorial. You also have to install `sbsigntools` and `openssl` as it'll be needed for the tutorial. Make sure your Secure Boot is still disabled and you have done nothing to it aside from disabling it.

### Backup all old stuffs

```bash
mkdir -p SB/old && cd SB
efi-readvar -v PK -o old_PK.esl
efi-readvar -v KEK -o old_KEK.esl
efi-readvar -v db -o old_db.esl
efi-readvar -v dbx -o old_dbx.esl
```

### Create your own keys

You'll find these kinds of file: _.key_, _.crt_, _.cer_, _.esl_, _.auth_ commonly throughout the tutorial.  
As per Arch Wiki's reference:

- `.key` : PEM format private keys for EFI binary and EFI signature list signing.
- `.crt` : PEM format certificates for `sbsign`, `sbvarsign` and `sign-efi-sig-list`.
- `.cer` : DER format certificates for firmware.
- `.esl` : Certificates in an EFI Signature List for `sbvarsign`, `efi-updatevar`, KeyTool and firmware.
- `.auth` : Certificates in an EFI Signature List with an authentication header (i.e. a signed certificate update file) for `efi-updatevar`, `sbkeysync`, KeyTool and firmware.

First, create a GUID for owner identification:

```bash
uuidgen --random > GUID.txt
```

Platform Key:

```bash
openssl req -newkey rsa:4096 -nodes -keyout PK.key -new -x509 -sha256 -days 3650 -subj "/CN=my Platform Key/" -out PK.crt
openssl x509 -outform DER -in PK.crt -out PK.cer
cert-to-efi-sig-list -g "$(< GUID.txt)" PK.crt PK.esl
sign-efi-sig-list -g "$(< GUID.txt)" -k PK.key -c PK.crt PK PK.esl PK.auth
```

Sign an empty file to allow removing Platform Key when in "User Mode":

```bash
sign-efi-sig-list -g "$(< GUID.txt)" -c PK.crt -k PK.key PK /dev/null rm_PK.auth
```

Key Exchange Key:

```bash
openssl req -newkey rsa:4096 -nodes -keyout KEK.key -new -x509 -sha256 -days 3650 -subj "/CN=my Key Exchange Key/" -out KEK.crt
openssl x509 -outform DER -in KEK.crt -out KEK.cer
cert-to-efi-sig-list -g "$(< GUID.txt)" KEK.crt KEK.esl
sign-efi-sig-list -g "$(< GUID.txt)" -k PK.key -c PK.crt KEK KEK.esl KEK.auth
```

Signature Database Key:

```bash
openssl req -newkey rsa:4096 -nodes -keyout db.key -new -x509 -sha256 -days 3650 -subj "/CN=my Signature Database key/" -out db.crt
openssl x509 -outform DER -in db.crt -out db.cer
cert-to-efi-sig-list -g "$(< GUID.txt)" db.crt db.esl
sign-efi-sig-list -g "$(< GUID.txt)" -k KEK.key -c KEK.crt db db.esl db.auth
```

### Optional: Adding Microsoft keys

This is useful when you're dualbooting Windows.

Download this stuffs and copy it to the SB folder we made previously:

- [Microsoft Windows Production PCA 2011 for Windows](https://www.microsoft.com/pkiops/certs/MicWinProPCA2011_2011-10-19.crt)
- [Microsoft Corporation UEFI CA 2011 for third-party binaries like UEFI drivers, option ROMs etc.](https://www.microsoft.com/pkiops/certs/MicCorUEFCA2011_2011-06-27.crt)

Create EFI Signature Lists from Microsoft's DER format certificates using Microsoft's GUID (`77fa9abd-0359-4d32-bd60-28f4e78f784b`) and combine them in one file for simplicity:

```bash
sbsiglist --owner 77fa9abd-0359-4d32-bd60-28f4e78f784b --type x509 --output MS_Win_db.esl MicWinProPCA2011_2011-10-19.crt
sbsiglist --owner 77fa9abd-0359-4d32-bd60-28f4e78f784b --type x509 --output MS_UEFI_db.esl MicCorUEFCA2011_2011-06-27.crt
cat MS_Win_db.esl MS_UEFI_db.esl > MS_db.esl
```

Sign a db update with your KEK. Use `sign-efi-sig-list` with option `-a` to add not replace a db certificate:

```bash
sign-efi-sig-list -a -g 77fa9abd-0359-4d32-bd60-28f4e78f784b -k KEK.key -c KEK.crt db MS_db.esl add_MS_db.auth
```

### Reinstalling GRUB

There are some issues in Arch's GRUB currently that throws `Error : verification requested but nobody cares.` and to fix that, you need to reinstall GRUB first with `tpm` module and shim lock disabled:

```bash
sudo grub-install --target=x86_64-efi --efi-directory=your-esp --bootloader-id=Arch --modules="tpm" --disable-shim-lock
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> Change your-esp to, well, your esp path.

See [references](#references) for more info.

### Signing EFI binaries

```bash
sudo sbsign --key db.key --cert db.crt --output /boot/vmlinuz-linux /boot/vmlinuz-linux # You can do others too
sudo sbsign --key db.key --cert db.crt --output /path/to/esp/Arch/grubx64.efi /path/to/esp/EFI/Arch/grubx64.efi
```

> Change accordingly into your esp partition path e.g mine's /boot/EFI and your EFI path.

### Prepare pacman hook for automatic kernel signing

```bash
sudo mkdir -p /etc/pacman.d/hooks && sudo mkdir -p /usr/share/libalpm/scripts
sudo cp /usr/share/libalpm/hooks/90-mkinitcpio-install.hook /etc/pacman.d/hooks/
sudo cp /usr/share/libalpm/scripts/mkinitcpio-install /usr/local/share/libalpm/scripts/
```

Edit `/etc/pacman.d/hooks/90-mkinitcpio-install.hook` and replace:

```bash
Exec = /usr/share/libalpm/scripts/mkinitcpio-install
```

with:

```bash
Exec = /usr/local/share/libalpm/scripts/mkinitcpio-install
```

Edit `/usr/local/share/libalpm/scripts/mkinitcpio-install` and replace:

```bash
install -Dm644 "${line}" "/boot/vmlinuz-${pkgbase}"
```

with:

```bash
sbsign --key /path/to/db.key --cert /path/to/db.crt --output "/boot/vmlinuz-${pkgbase}" "${line}"
```

### Put your firmware to "Setup Mode"

Go to firmware settings and erase all certificates. This will put Secure Boot into setup mode. You can verify that by booting to the OS and run `bootctl status`.

### Enroll your keys

Create the necessary folders then get in to the SB directory we created previously (since you're rebooting, duh):

```bash
sudo mkdir -p /etc/secureboot/keys/{db,dbx,KEK,PK}
cd SB
```

Then copy all the `.auth` files into their respective directory:

```bash
sudo cp PK.auth /etc/secureboot/keys/PK/
sudo cp KEK.auth /etc/secureboot/keys/KEK/
sudo cp db.auth /etc/secureboot/keys/db/

# If you're doing Windows keys
sudo cp add_MS_db.auth /etc/secureboot/keys/db/
```

See what changes will `sbkeysync` shall do to your system's UEFI keystore:

```bash
sudo sbkeysync --pk --dry-run --verbose
```

Before enrolling, change efivars file attributes so that no write errors are present using:

```bash
sudo chattr -i /sys/firmware/efi/efivars/{PK,KEK,db}*
```

Finally, use `sbkeysync` to enroll your keys.

```bash
sudo sbkeysync --verbose
```

We're not enrolling the PK yet, so in order to avoid some invalid arguments issues, use `efi-updatevar` instead:

```bash
sudo efi-updatevar -f PK.auth PK
```

> If you got write errors when doing `efi-updatevar` then do `sudo chattr -i /sys/firmware/efi/efivars/{PK,KEK,db}*` once again before enrolling PK.

After enrolling your PK, Secure Boot will enter "User Mode" again.

## Finishing Touch

After all the hassles, you might want to get into your firmware settings and enable Secure Boot. Try booting your Arch Linux now with Secure Boot enabled. It should be all good.

# Verdict

Well, no more words to say. Enjoy playing Valorant if you have Windows 11 installed!

# References

- <https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot> - Unified Extensible Firmware Interface/Secure Boot - Arch Wiki
- <https://www.mail-archive.com/bug-grub@gnu.org/msg17028.html> - [bug #60211] error: verification requested but nobody cares | Reported by Giancarlo Razzolini - bug-grub - The Mail Archive
