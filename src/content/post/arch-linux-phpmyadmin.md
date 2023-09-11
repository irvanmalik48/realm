---
title: "Arch Apache, MySQL, and PMA Manual Setup"
publishDate: "25 Sep 2021"
description: "Setup Apache, MySQL, and phpMyAdmin manually on Arch Linux."
tags: ["linux", "programming"]
---

## Abstract

This is just a tutorial on how to do a LAMP stack manually on Arch Linux. Without further talks, let's cut into this.

## Setting Up

Install the required packages:

```bash
sudo pacman -S php php-apache phpmyadmin apache mariadb
```

> Note: You can find old versions of PHP in AUR

### Configuring MariaDB

MariaDB is a reliable, high performance and full-featured database server which aims to be an 'always Free, backward compatible, drop-in' replacement of MySQL. Since 2013 MariaDB is Arch Linux's default implementation of MySQL.

1. To start configuring, run this command:

```bash
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

2. Then enable and start `mariadb.service` by issuing this command:

```bash
sudo systemctl enable --now mariadb.service
```

3. Log in as root user on the MySQL server by using the following command:

```bash
sudo mysql -u root -p
```

> Note: Default root user has no password. Press enter to continue.

4. Issue the command to create a user and grant the privileges:

```sql
MariaDB> CREATE USER 'your-name'@'localhost' IDENTIFIED BY 'your-pass';
MariaDB> GRANT ALL PRIVILEGES ON *.* TO 'your-name'@'localhost';
MariaDB> FLUSH PRIVILEGES;
MariaDB> quit
```

> Note: Change `your-name` with your desired username choices. Further informations can be referred from [Arch Wiki MariaDB page](https://wiki.archlinux.org/index.php/MariaDB).

### Configuring PHP

PHP is a widely-used general-purpose scripting language that is especially suited for Web development and can be embedded into HTML. The main PHP configuration file is well documented and located at `/etc/php/php.ini`. In order to make PHP work with MariaDB, uncomment the following lines in `/etc/php/php.ini`:

```php
extension=iconv
extension=pdo_mysql
extension=mysqli
```

> Note: the extension `iconv` is to be uncommented to avoid an error in PHP8 regarding the extension itself. Further informations can be reffered from [Arch Wiki PHP page](https://wiki.archlinux.org/index.php/PHP).

### Configuring Apache

The Apache HTTP Server, or Apache for short, is a very popular web server, developed by the Apache Software Foundation. Apache configuration files are located in `/etc/httpd/conf`. The main configuration file is `/etc/httpd/conf/httpd.conf`, which includes various other configuration files. The default configuration file should be fine for a simple setup. By default, it will serve the directory `/srv/http` to anyone who visits your website. You can start Apache by running `sudo systemctl enable --now httpd.service`. To configure Apache to work with PHP, we'll be using the `libphp` method:

1. Comment the line in `/etc/httpd/conf/httpd.conf`:

```php
#LoadModule mpm_event_module modules/mod_mpm_event.so
```

2. Uncomment the line:

```php
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
```

> Note: The above is required, because libphp.so included with the package does not work with mod_mpm_event, but will only work mod_mpm_prefork instead.

3. To enable PHP, add these lines to `/etc/httpd/conf/httpd.conf`:

- Place this at the end of the `LoadModule` list:

```php
LoadModule php_module modules/libphp.so
AddHandler php-script .php
```

- Place this at the end of the `Include` list:

```php
include conf / extra / php_module . conf;
```

- Restart `httpd.service` by issuing `sudo systemctl restart httpd.service` command.
  > Note: This method is probably the easiest, but is also the least scalable: it is suitable for a light request load. It also requires you to change the mpm module, which may cause problems with other extensions (e.g. it is not compatible with HTTP2). For further readings, refer to [Arch Wiki Apache page](https://wiki.archlinux.org/index.php/Apache_HTTP_Server).

### Configuring phpMyAdmin

phpMyAdmin is a free and open source administration tool for MySQL and MariaDB. As a portable web application written primarily in PHP, it has become one of the most popular MySQL administration tools, especially for web hosting services.

1. Create the Apache configuration file in `/etc/httpd/conf/extra/phpmyadmin.conf`:

```php
Alias /phpmyadmin "/usr/share/webapps/phpMyAdmin"
<Directory "/usr/share/webapps/phpMyAdmin">
    DirectoryIndex index.php
    AllowOverride All
    Options FollowSymlinks
    Require all granted
</Directory>
```

2. Include the file in `/etc/httpd/conf/httpd.conf`:

```php
include conf / extra / phpmyadmin . conf;
```

3. To allow the usage of the phpMyAdmin setup script (e.g. http://localhost/phpmyadmin/setup), make sure `/usr/share/webapps/phpMyAdmin` is writable for the http user:

```bash
sudo mkdir /usr/share/webapps/phpMyAdmin/config
sudo chown http:http /usr/share/webapps/phpMyAdmin/config
sudo chmod 750 /usr/share/webapps/phpMyAdmin/config
```

4. Add `blowfish_secret` passphrase (You can search a generator for one) in `/usr/share/webapps/phpMyAdmin/config.inc.php`:

```php
$cfg["blowfish_secret"] = "your-passphrase-here";
```

5. In `/usr/share/webapps/phpMyAdmin/config.inc.php`, uncomment and change them correspondingly to the ones you set in MariaDB configuration (`your-name` and `your-pass`):

```php
/* User used to manipulate with storage */
// $cfg['Servers'][$i]['controlhost'] = 'my-host';
// $cfg['Servers'][$i]['controlport'] = '3306';
$cfg["Servers"][$i]["controluser"] = "your-name";
$cfg["Servers"][$i]["controlpass"] = "your-pass";

/* Storage database and tables */
$cfg["Servers"][$i]["pmadb"] = "phpmyadmin";
$cfg["Servers"][$i]["bookmarktable"] = "pma__bookmark";
$cfg["Servers"][$i]["relation"] = "pma__relation";
$cfg["Servers"][$i]["table_info"] = "pma__table_info";
$cfg["Servers"][$i]["table_coords"] = "pma__table_coords";
$cfg["Servers"][$i]["pdf_pages"] = "pma__pdf_pages";
$cfg["Servers"][$i]["column_info"] = "pma__column_info";
$cfg["Servers"][$i]["history"] = "pma__history";
$cfg["Servers"][$i]["table_uiprefs"] = "pma__table_uiprefs";
$cfg["Servers"][$i]["tracking"] = "pma__tracking";
$cfg["Servers"][$i]["userconfig"] = "pma__userconfig";
$cfg["Servers"][$i]["recent"] = "pma__recent";
$cfg["Servers"][$i]["favorite"] = "pma__favorite";
$cfg["Servers"][$i]["users"] = "pma__users";
$cfg["Servers"][$i]["usergroups"] = "pma__usergroups";
$cfg["Servers"][$i]["navigationhiding"] = "pma__navigationhiding";
$cfg["Servers"][$i]["savedsearches"] = "pma__savedsearches";
$cfg["Servers"][$i]["central_columns"] = "pma__central_columns";
$cfg["Servers"][$i]["designer_settings"] = "pma__designer_settings";
$cfg["Servers"][$i]["export_templates"] = "pma__export_templates";
```

6. Execute `mysql -u root -p < /usr/share/webapps/phpMyAdmin/sql/create_tables.sql` in the command line to create the required tables.
7. Remove temporary configuration directory once configuration is done:

```bash
sudo rm -r /usr/share/webapps/phpMyAdmin/config
```

8. Restart the `httpd.service` again just for additional measures. For further readings, refer to [Arch Wiki phpMyAdmin page](https://wiki.archlinux.org/index.php/PhpMyAdmin).

## Finishing

Open http://localhost/phpmyadmin/index.php and login to see if everything works well.

## Sources

1. Arch Wiki. https://wiki.archlinux.org/.
2. Wikipedia. https://en.wikipedia.org/.
