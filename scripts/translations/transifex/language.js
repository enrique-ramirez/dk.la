import urls from './urls'

export default client => ({
  getLanguages: (project) => {
    const url = urls.languages
      .replace('{project_slug}', project)

    return client.get(url)
  },

  getLanguage: (project, language) => {
    const url = urls.language
      .replace('{project_slug}', project)
      .replace('{language_code}', language)

    return client.get(url)
  },

  createLanguage: (project, form) => {
    const url = urls.languages
      .replace('{project_slug}', project)

    return client.post(url, form)
  },

  updateLanguage: (project, language, form) => {
    const url = urls.language
      .replace('{project_slug}', project)
      .replace('{language_code}', language)

    return client.put(url, form)
  },

  deleteLanguage: (project, language) => {
    const url = urls.language
      .replace('{project_slug}', project)
      .replace('{language_code}', language)

    return client.delete(url)
  },

  getLanguagesInfo: () => {
    const url = urls.languagesInfo

    return client.get(url)
  },

  getLanguageInfo: (language) => {
    const url = urls.languageInfo
      .replace('{language_code}', language)

    return client.get(url)
  },
})
