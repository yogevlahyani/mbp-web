module.exports = {
  locales: ["en", "he"],
  defaultLocale: "en",
  loadLocaleFrom: (lang, ns) => import(`./src/locales/${lang}/${ns}`).then((m) => m.default),
  pages: {
    "*": ["common"]
  }
}