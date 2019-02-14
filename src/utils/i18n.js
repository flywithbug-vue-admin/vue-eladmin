export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}


export function generateAppTitle(father,title) {
  const hasKey = this.$te('route.' + title)
  if (hasKey) {
    const translatedTitle = this.$t( father + '.' + title)
    return translatedTitle
  }
  return title
}






