---
title: "Linux Music App List"
date: "2021-05-03"
desc: "Collection of music apps for linux."
tag:
  - "linux"
  - "music"
---

# Abstract

Music is a thing we always hear to. It always accompanies us when we're happy, sad, angry, or just insert anything emotional here cause it's still makes sense. It also accompanies us when running our beloved Linux desktops, too. Okay so I want to share some music apps that I think is nice and excellent.

## Audacious

![audacious-img](/linux/applist/music/audacious.webp)

Who doesn't know of Audacious? Audacious is an open source media player that’s widely popular among audiophiles. It’s a no-nonsense software that stays low-resource and makes sure that even a PC with older specification doesn’t feel overwhelmed while playing music. It uses around 20-25MB RAM and supports all popular audio file formats.  
I myself personally use Audacious as my music player because of its low RAM consumption and simply does what I want from a music player. Really recommend using this.

Ubuntu:

```bash
sudo apt-get install audacious audacious-plugins
```

Arch:

```bash
sudo pacman -Syu audacious
```

## cmus

![cmus-img](/linux/applist/music/cmus.webp)

Well, this one does a different approach and rather unique. `cmus` is a small, fast, and powerful console music player for Unix-like operating systems. As you might have observed, `cmus` is devoid of any GUI tools and is basically a command-line media player. I used it for a while tho sometimes in the past and I'm quite satisfied with it.

Ubuntu:

```bash
sudo apt-get install cmus
```

Arch:

```bash
sudo pacman -Syu cmus
```

## Museeks

![museeks-img](/linux/applist/music/museeks.webp)

Museeks is another cross-platform simple and clean audio player that is lean on advanced features but still provides the simplicity in playing your music and creating playlists. This is by far the simplest of all the audio players in terms of features and functionality. Not quite in an idea to use it tho since it's an Electron app but its sleek and simple UI does make it one of the most recommended music player I would list.

Ubuntu:

```bash
wget https://github.com/martpie/museeks/releases/download/0.11.5/museeks-amd64.deb
sudo apt update && sudo apt install ./museeks-amd64.deb
```

Arch (AUR):

```bash
yay -Syu museeks-bin
```

## Musique

![musique-img](/linux/applist/music/musique.webp)

Musique is a music player built for speed, simplicity and style. It is written in C++ using the Qt framework. What I really like about this music player is that `(1.)` it uses Qt and `(2.)` it fetches your music album art and lyrics which is really useful. But I do get a long first start up tho since it checks the Music folder I use. Still highly recommend tho.

Ubuntu:

```bash
sudo apt-get install musique
```

Arch (AUR):

```bash
yay -Syu musique-bin
```

## QMMP

![qmmp-img](/linux/applist/music/qmmp.webp)

This music player reminds me of my old days using Winamp. The interface is so similar to Winamp. It is written in C++ using the Qt widget toolkit for the user interface. It is the only audio player not featuring a database that uses the Qt library. It is themeable and low on resource usage. Pretty neat, ain't it? A little fun fact for you all that by supporting Winamp (Classic) skin files, QMMP can easily be configured to look exactly the same as Winamp 2.x.

Ubuntu:

```bash
sudo add-apt-repository ppa:forkotov02/ppa
sudo apt-get update
sudo apt-get install qmmp qmmp-plugin-pack
```

Arch:

```bash
sudo pacman -Syu qmmp
```

# Wrapping Up

This page might get more apps to get into and be covered. But there you have it for now. As always, thank you for your attention. Have a nice music experience!
