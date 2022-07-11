---
title: "How to Deploy a Telegram Userbot"
date: "2021-09-26"
desc: "Deploy your own userbot with Heroku or locally."
tag:
  - "telegram"
  - "userbot"
---

# Introduction

A Telegram userbot is basically something that can help you manage stuffs here and there in Telegram such as groups etc. How it works is that you type the command, for example `.time`, then you send it anywhere in Telegram, the userbot will detect the command and edit your message to show you the output of current time in your local timezone in that message. Take some note that some commands do require specific conditions to be met in order to work properly. An userbot is not like usual Telegram bots which have their dedicated username on it but it acts as a session of your own account. An userbot is safe to use providing you don't use something that Telegram is probably having some sense of dislike to such as `.spam`. Heroku gives you 550 hours of free monthly usage as well as 450 more if you add your credit card as your billing info. Don't worry as it's completely free and you would not have to pay any cents at all.

> Update: This post now includes how to deploy it locally. So cheers!

# Setting Up

1. API Hash and API ID

   - Login to [my.telegram.org](https://my.telegram.org) with your Telegram account.
   - Go to **API Development Tools**, fill out the form for creating an app. You'll get the required API Hash and API ID there.
     > Note: Nothing really matters, fill in anything that you want.

2. Generate a session string

   - Go to [here](http://sessiongen.irvanmalik48.repl.run/) and click on run button on top.
   - Enter the API Hash and API ID you've got from the previous step.
   - Enter your phone number with country code (example: +62896xxxxxxxx).
   - Follow further instructions then check your **Saved Messages** in Telegram, there will be your session string.
     > Note: Don't share your session string to anyone, anywhere, anytime. Imagine a key to your house, then imagine if it's in someone's hand.

3. Get BOTLOG_CHATID (Optional but recommended)

   - Create a group with you and add @MissRose_bot to your group.
   - Type `/id` and send it to the group. Rose will give you the group chat ID.
     > Note: Don't leave out the - in there. It is essential.

4. Get Heroku API key (if you use Heroku)
   - Make a Heroku account [here](https://signup.heroku.com).
   - Head [here](https://dashboard.heroku.com/account) and get your Heroku API key.
     > Note: Heroku gives you free 550 hours of usage. Enter in your billing info to receive another free 450 hours.

# Deploying

The next step is to deploy it. There are 2 ways of deploying it:

## Heroku way

1. Head to WeebProject's Github repo [here](https://github.com/BianSepang/WeebProject) or [use this link](https://heroku.com/deploy?template=https://github.com/BianSepang/WeebProject/tree/master) to directly deploy it to Heroku.
2. Fill your app name and choose which region is closest to your location.
3. Fill in the form with everything you got from previous section. Also read through the options of configuration and add/change them according to your own needs.
   > Note: You can change the values anytime you want later on.
4. Leave the logging options as they are (It's enabled by default).
5. Click on **Deploy App** option at the bottom of the page.
6. Click on the **View** button once it's successfully deployed.
7. Navigate to the **Resources** tab, click the pencil icon, and turn the worker on if it's not enabled yet.
8. Click on **More** button on the top right, and then click on **View logs**.
9. If it prints `Congratulations, the bot is up and running! Send .help in any chat for more info.` or something similar, then everything's good.
   > You can send `.help` in any chat for more info. If you want info on specific module, send `.help` followed by the name of module listed in the `.help` section you've opened before.

## Deploy Locally

> Note: You'll need to run Linux to do this and have installed `docker` and `docker-compose` and also enabled the `docker.service` (if you don't know how to enable it then here's a quick command: `sudo systemctl enable --now docker`). Windows user better get their WSL ready.

1. Clone the repository using git and use it as our working directory.

```bash
git clone https://github.com/BianSepang/WeebProject .userbot
cd .userbot
```

2. Copy `sample_config.env` and paste it as `config.env` there.

```bash
cp sample_config.env config.env
```

3. Edit `config.env` using your favorite text editor and add the required values. Set `DATABASE_URL` to `postgresql://USERNAME:PASSWORD@db:5432/weebproject` where USERNAME is your preferred username and PASSWORD is your preferred password.

4. After you done, edit `docker-compose.yml` using your favorite editor and change USERNAME and PASSWORD matching what you set before.

5. Run it using `docker-compose`.

```bash
sudo docker-compose up
```

### Systemd Service (Optional)

You can do a systemd service to autostart the userbot everytime you boot.

```bash
[Unit]
Description=Userbot
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/home/(your-linux-username)/.userbot/
ExecStart=docker-compose up
ExecStop=docker-compose down
TimeoutStartSec=0
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Save it at `/etc/systemd/system/userbot.service` and change the `WorkingDirectory` value accordingly. Enable and start it using:

```bash
sudo systemctl enable --now userbot
```

# Updates

Send `.update` in any chat. If there's any, send `.update deploy` to update the userbot.

# Wrapping up

There you go! That's all you need to deploy a userbot. As always, thank you for following this guide.

# References

- <https://github.com/BianSepang/WeebProject> - Weebproject - BianSepang
- <https://kenharris.xyz/userbot.html> - Setting up a Telegram userbot - KenHV
- <https://nru.my.id/post/cara-pasang-userbot-telegram-dengen-docker/> - Cara Pasang Userbot Telegram dengan Docker - んる
