---
title: "Arch Linux - Btrfs Installation (Dual Boot)"
description: "Arch Linux installation with btrfs filesystem dual booting with Windows."
publishDate: "07 Jun 2021"
tags: ["linux"]
---

## Abstract

So I want to show you how to install Arch Linux with btrfs dual booting with Windows. You can read about Arch here: [Arch Wiki - Arch Linux](https://wiki.archlinux.org/title/Arch_Linux).

## Prerequisite

- A USB drive for Arch ISO (8 GB recommended)
- Arch ISO ([Get it here](https://archlinux.org/download/))
- x86_64 device
- UEFI
- Minimum 512 MB of RAM (more than 2 GB recommended)
- 20-30 GB free disk space (60 GB upwards recommended)
- Internet connection

## Installation Process

Even tho I'll show you how-to, Arch Wiki itself has substantial informations regarding the installation. Be sure to check out the official wiki for reference while also following this guide: [Arch Wiki - Installation Guide](https://wiki.archlinux.org/title/Installation_guide).

### Preparing installation medium

At this step, I assume you already have the Arch ISO and know how to burn ISO files to USB. Now, burn the ISO to your USB using Etcher, Rufus, or any tools that you like. I recommend Ventoy as you only need to copy the ISO to your flashdisk.

Make sure to shrink your Windows partition and then create 3 empty partitions from Windows Partition Manager (or something like that idk) consisting of:

- 512 MB empty partition (EFI partition)
- 20-30 GB or more empty partition (root partition)
- 4 GB or more empty partition (Swap partition)

### Keymapping (Optional)

> Note: If you use standard QWERTY layout, skip this step.

Check the list of keymaps available using:

```bash
localectl list-keymaps
```

Then set your preferred keymap by using:

```bash
loadkeys [your-keymap]
```

### Connecting to the internet

Arch uses `iwctl` for connecting to the internet via Wifi. If you're using USB tethering or Ethernet, skip this step.\
Run `iwctl` by issuing:

```bash
iwctl
```

First, if you do not know your wireless device name, list all Wi-Fi devices:

```markdown
[iwd]# device list
```

Then, to scan for networks:

```markdown
[iwd]# station _device_ scan
```

You can then list all available networks:

```markdown
[iwd]# station _device_ get-networks
```

Finally, to connect to a network:

```markdown
[iwd]# station _device_ connect _SSID_
```

You can check your network by just:

```bash
ping 8.8.8.8 -c 3
```

### Set time

Use `timedatectl` to ensure the system clock is accurate:

```bash
timedatectl set-ntp true
```

### Partitioning

Since we've already created 3 partitions in Windows, we can just jump on to formatting the partitions. But first, you must check which partitions are going to be used.\
The command is:

```bash
fdisk -l
```

For example, my layout looks like this:

- /dev/nvme0n1p6 | 512 MB => This is going to be the EFI partition.
- /dev/nvme0n1p7 | 4 GB => This will be the swap partition.
- /dev/nvme0n1p8 | 71.7 GB => This is going to be the root partition.

Yours might look different, but the concept is the same.\
Then we format our partitions using `mkfs` and `mkswap`.

For the EFI boot entry:

```bash
mkfs.fat -F32 /dev/nvme0n1p6
```

For the swap partition, we need to make and also activate it:

```bash
mkswap /dev/nvme0n1p7
swapon /dev/nvme0n1p7
```

For the root partition, we need to format it as btrfs:

```bash
mkfs.btrfs /dev/nvme0n1p8
```

### Mounting the partitions

Now that we have formatted the partitions, we need to mount it (exception for swap).

#### Mounting the root partition

To mount the root partition, issue the command:

```bash
mount /dev/nvme0n1p8 /mnt
```

#### Creating and mounting btrfs subvolumes

Since we've mounted the root partition, we can proceed into creating btrfs subvolumes.\
We'll create 6 different subvolumes:

- @ => root directory.
- @home => home directory. Contains all your personal data.
- @var => var directory. Contains logs, etc.
- @opt => opt directory. Contains third party products.
- @tmp => tmp directory. Contains temp files, etc.
- @.snapshot => snapshot directory. Contains btrfs snapshots. (Can be excluded if you want to use Timeshift)

Create the subvolumes:

```bash
btrfs su cr /mnt/@
btrfs su cr /mnt/@home
btrfs su cr /mnt/@var
btrfs su cr /mnt/@opt
btrfs su cr /mnt/@tmp
btrfs su cr /mnt/@.snapshots
umount /mnt
```

Now to mount them:

```bash
mount -o noatime,commit=120,compress-force=zstd:7,discard=async,space_cache,subvol=@ /dev/nvme0n1p8 /mnt
mkdir /mnt/{boot,home,var,opt,tmp,.snapshots} # You must create the folders before proceeding
mount -o noatime,commit=120,compress-force=zstd:7,discard=async,space_cache,subvol=@home /dev/nvme0n1p8 /mnt/home
mount -o noatime,commit=120,compress-force=zstd:7,discard=async,space_cache,subvol=@tmp /dev/nvme0n1p8 /mnt/tmp
mount -o noatime,commit=120,compress-force=zstd:7,discard=async,space_cache,subvol=@opt /dev/nvme0n1p8 /mnt/opt
mount -o noatime,commit=120,compress-force=zstd:7,discard=async,space_cache,subvol=@.snapshots /dev/nvme0n1p8 /mnt/.snapshots
mount -o discard=async,subvol=@var /dev/nvme0n1p8 /mnt/var
```

A little review about the options:

- noatime: No access time. Improves performance by not writing time when the file was accessed.
- commit: Perodic interval (in seconds) in which data is synchronized to permanent storage.
- compress-force: Activating forced compression and choosing the algorithm for compression. (Believe me, this is good, no joke)
- discard=async: Frees unused block from an SSD drive supporting the command. With discard=async, freed extents are not discarded immediately, but grouped together and trimmed later by a separate worker thread, improving commit latency. You can opt out of this if you use HDD.
- space_cache: Enables kernel to know where block of free space is on a disk to enable it to write data immediately after file creation.
- subvol: Choosing the subvolume to mount.

#### Mounting the EFI (boot) partition

To mount it, just issue:

```bash
mount /dev/nvme0n1p6 /mnt/boot
```

#### Verify if you are doing it correctly

To check what is being mounted, issue:

```bash
lsblk
```

### Base system installation

For AMD CPUs:

```bash
pacstrap /mnt base linux linux-firmware nano amd-ucode btrfs-progs
```

For Intel CPUs:

```bash
pacstrap /mnt base linux linux-firmware nano intel-ucode btrfs-progs
```

### Generating fstab

After the base system installation is done, now we need to generate the fstab to define what and how partitions should be mounted.\
Generate it by issuing:

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Verify it by issuing:

```bash
cat /mnt/etc/fstab
```

### Chroot into the root partition

Now enter your Arch install:

```bash
arch-chroot /mnt
```

#### Setting up timezone

Before you set up timezone, you might want to check which timezones are available by issuing:

```bash
timedatectl list-timezones
```

> Press 'q' to quit the list.

Now set up your timezone by using:

```bash
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

#### Sync hardware and system clock

Issue this command:

```bash
hwclock --systohc
```

#### Generating system locale

Issue this command to edit the locale.gen:

```bash
nano /etc/locale.gen
```

Scroll and uncomment your language. Most people would prefer US English so scroll down and uncomment this line:

```bash
en_US.UTF-8 UTF8
```

Save the file by using CTRL + S and exit it with CTRL + X.

Now generate locale:

```bash
locale-gen
```

Set the locale in locale.conf file:

```bash
echo LANG=en_US.UTF-8 >> /etc/locale.conf
```

> Change en_US.UTF-8 to your preferred language (if true).

#### Setting keymap

> Note: This is only if you use keymaps other than the standard QWERTY.

```bash
echo KEYMAP=[keymap] >> /etc/vconsole.conf
```

Replace [keymap] with the ones you choose before.

#### Setting network configuration

Set your hostname with:

```bash
echo example >> /etc/hostname
```

Replace the `example` with anything you want.

Now for the hostfile:

```bash
nano /etc/hosts
```

Reffering to Arch Wiki, the format should look like this:

```bash
127.0.0.1   localhost
::1         localhost
127.0.1.1   example.localdomain example
```

Save the file by using CTRL + S and exit it with CTRL + X.

#### Setting up the root user

Set up password for the root user with:

```bash
passwd
```

> Note: Visual feedbacks are disabled by default in Linux because of security reasons.

#### Installing remaining essentials

```bash
pacman -S grub grub-btrfs efibootmgr base-devel linux-headers networkmanager network-manager-applet wpa_supplicant dialog os-prober mtools dosfstools reflector git
```

These are some basic sets of packages you will need if you plan to use Arch in the long run. I would recommend that you google all packages to understand what they do. After entering the command, press Enter to select all of the base-devel packages to install. Then wait for the installation to finish.

#### Modifying mkinitcpio

```bash
nano /etc/mkinitcpio.conf
```

Add btrfs into MODULES so that it looks like:

```bash
...
MODULES=(btrfs)
...
```

Save the file by using CTRL + S and exit it with CTRL + X.

#### Installing GRUB

To install GRUB into the /boot partition, issue these commands:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=Arch
grub-mkconfig -o /boot/grub/grub.cfg
```

#### Creating a user

Issue this command to create a new user:

```bash
useradd -mG wheel example
```

Above command creates a user with name `example` and adds the user to the `wheel` group (for sudo privileges). Replace `example` with whatever name you want.

Then create the password for the user:

```bash
passwd example
```

#### Giving user sudo permission

```bash
EDITOR=nano visudo
```

Uncomment the line `%wheel ALL=(ALL) ALL`

#### Enabling NetworkManager

```bash
systemctl enable NetworkManager.service
```

### Finishing and restarting

Issue these commands to finish installation:

```bash
exit
umount -l /mnt
reboot
```

## Post Installation

Ah yes, the pain is gone ultimately. You've installed Arch Linux successfully! Go ahead and install some DE or WM on top.

For some post install recommendations:\
[Arch Wiki - General Recommendations](https://wiki.archlinux.org/index.php/General_recommendations)

As always, thank you for your time!

## References

- https://www.nishantnadkarni.tech/posts/arch_installation/ - Arch Linux with BTRFS Installation (Base) - NishantN
- https://wiki.archlinux.org/title/Installation_guide - Installation Guide - Arch Wiki
- https://wiki.archlinux.org/title/btrfs - Btrfs - Arch Wiki
- https://wiki.archlinux.org/title/Iwd#iwctl - Iwd/iwctl - Arch Wiki
