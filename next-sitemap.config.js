/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.irvanma.me",
  generateRobotsTxt: true,
  exclude: ["/sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.irvanma.me/sitemap.xml", // <==== Add here
    ],
  },
};
