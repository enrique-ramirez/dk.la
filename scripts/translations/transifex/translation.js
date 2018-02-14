import urls from './urls'

export default (client, hash) => ({
  getTranslation: (project, resource, language) => {
    const url = urls.translation
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{language_code}', language)

    return client.get(url, {
      transformResponse: [data => JSON.parse(data).content],
    })
  },

  getTranslationStrings: (project, resource, language) => {
    const url = urls.translationStrings
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{language_code}', language)

    return client.get(url)
  },

  getTranslationString: (project, resource, language, id) => {
    const url = urls.translationString
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{language_code}', language)
      .replace('{string_hash}', hash(id))

    return client.get(url)
  },

  updateTranslation: (project, resource, language, form) => {
    const url = urls.translation
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{language_code}', language)

    return client.put(url, {
      content: JSON.stringify(form),
    })
  },

  updateTranslationString: (project, resource, language, id, form) => {
    const url = urls.translationString
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{language_code}', language)
      .replace('{string_hash}', hash(id))

    return client.put(url, form)
  },
})
