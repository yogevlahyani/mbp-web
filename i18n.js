module.exports = {
  locales: ["he"],
  defaultLocale: "he",
  loadLocaleFrom: (lang, ns) => import(`./src/locales/${lang}/${ns}`).then((m) => m.default),
  pages: {
    "*": ["common"]
  }
}