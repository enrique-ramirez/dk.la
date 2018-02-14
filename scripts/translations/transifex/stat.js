import urls from './urls'

export default client => ({
  getStats: (project, resource) => {
    const url = urls.stats
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.get(url)
  },

  getStat: (project, resource, language) => {
    const url = urls.stat
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{lang_code}', language)

    return client.get(url)
  },
})
