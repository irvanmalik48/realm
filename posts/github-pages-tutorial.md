---
title: "Hosting a Static Web in GitHub Pages"
date: "2021-05-15"
desc: "How to host a website in GitHub Pages for newbies."
tag:
  - "github"
  - "web"
---

# Abstract

From Wikipedia (with slight changes):

> GitHub is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, plus its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, continuous integration and wikis for every project.
> In simple terms, GitHub is a place where you store your project's source and track its versions. GitHub also provides GitHub Pages in which you can host your website for free forever (yes, it is, although static). In this article, we will dive through on how to host a (static) website in GitHub Pages.

# GitHub Pages

## Introduction

From GitHub's own documentation for GitHub Pages:

> GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

## Types of GitHub Pages Sites

There are three types of GitHub Pages sites: project, user, and organization. Project sites are connected to a specific project hosted on GitHub, such as a JavaScript library or a recipe collection. User and organization sites are connected to a specific GitHub account.

## Static Site Generators

GitHub Pages publishes any static files that you push to your repository. You can create your own static files or use a static site generator to build your site for you. You can also customize your own build process locally or on another server.  
GitHub Pages will use Jekyll to build your site by default. If you want to use a static site generator other than Jekyll, disable the Jekyll build process by creating an empty file called `.nojekyll` in the root of your publishing source, then follow your static site generator's instructions to build your site locally.

## Guidelines

- GitHub Pages sites created after June 15, 2016 and using github.io domains are served over HTTPS. If you created your site before June 15, 2016, you can enable HTTPS support for traffic to your site. For more information, see "Securing your GitHub Pages with HTTPS."
- GitHub Pages sites shouldn't be used for sensitive transactions like sending passwords or credit card numbers.
- Your use of GitHub Pages is subject to the GitHub Terms of Service, including the prohibition on reselling.
- GitHub Pages does not support server-side languages such as PHP, Ruby, or Python.
- GitHub Pages is not intended for or allowed to be used as a free web hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS).
- In addition, GitHub does not allow GitHub Pages to be used for certain purposes or activities.

### GitHub Pages Site Usage Limits

- GitHub Pages source repositories have a recommended limit of 1GB.
- Published GitHub Pages sites may be no larger than 1 GB.
- GitHub Pages sites have a soft bandwidth limit of 100GB per month.
- GitHub Pages sites have a soft limit of 10 builds per hour.

### Prohibited uses of GitHub Pages

- Content or activity that is illegal or otherwise prohibited by our Terms of Service, Acceptable Use Policies or Community Guidelines.
- Violent or threatening content or activity.
- Excessive automated bulk activity (for example, spamming).
- Activity that compromises GitHub users or GitHub services.
- Get-rich-quick schemes.
- Sexually obscene content.
- Content that misrepresents your identity or site purpose.

# How to Host a Website in GitHub Pages

1. Sign Up or Login to GitHub (if you have an account).
2. Create a repository by clicking the `+` dropdown menu and selecting `New repository`.

![gh1-img](/others/ghpages1.webp)

3. Type a name of your repository consisting of your-username.github.io and an optional description.

![gh2-img](/others/ghpages2.webp)

4. Select `Initialize this repository with a README`.

![gh3-img](/others/ghpages3.webp)

5. Click `Create Repository`.

![gh4-img](/others/ghpages4.webp)

6. After creating the repository, you will be redirected to your repository page. From there, head on to `Settings`.

![gh5-img](/others/ghpages5.webp)

7. Inside the settings menu, click on `Pages` and in `Source` change branch to your main branch and then hit save.

![gh6-img](/others/ghpages6.webp)

8. Get back to `Code` section and then upload your website files and folders by clicking `Add file` then selecting `Upload files` or drag and drop them to the repository.

![gh7-img](/others/ghpages7.webp)

9. GitHub will deploy your website in up to 20 minutes (usually less than a minute tho). You can see the result by visiting your-username.github.io from your browser.

# Wrapping Up

So that's it on how to host your website on GitHub using GitHub Pages. And then you might ask, what's next?
Well, you can add more pages to your site by creating more new files. Each file will be available on your site in the same directory structure as your publishing source.  
For example, if the publishing source for your project site is the `main` branch, and you create a new file called /about/contact-us.md on the `main` branch, the file will be available at <https://your-username.github.io/about/contact-us.html>.  
You can also add a theme to customize your site’s look and feel. To customize your site even more, you can use Jekyll, a static site generator with built-in support for GitHub Pages.

# References

1. [Wikipedia](https://en.wikipedia.org/wiki/GitHub)
2. [GitHub Pages Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages)
