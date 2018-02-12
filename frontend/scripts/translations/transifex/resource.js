import urls from './urls'

export default (client, hash) => ({
  getResources: (project) => {
    const url = urls.resources
      .replace('{project_slug}', project)

    return client.get(url)
  },

  createResource: (project, form, options) => {
    const url = urls.resources
      .replace('{project_slug}', project)

    return client.post(url, form, options)
  },

  getResource: (project, resource) => {
    const url = urls.resource
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.get(url)
  },

  getResourceContent: (project, resource) => {
    const url = urls.resourceContent
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.get(url)
  },

  getResourceString: (project, resource, id) => {
    const url = urls.resourceString
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{string_hash}', hash(id))

    return client.get(url)
  },

  updateResource: (project, resource, form) => {
    const url = urls.resource
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.put(url, form)
  },

  updateResourceContent: (project, resource, form) => {
    const url = urls.resourceContent
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.put(url, form)
  },

  updateResourceString: (project, resource, id, form) => {
    const url = urls.resourceString
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)
      .replace('{string_hash}', hash(id))

    return client.put(url, form)
  },

  deleteResource: (project, resource) => {
    const url = urls.resource
      .replace('{project_slug}', project)
      .replace('{resource_slug}', resource)

    return client.delete(url)
  },
})
