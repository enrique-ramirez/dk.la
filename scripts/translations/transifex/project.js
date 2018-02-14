import urls from './urls'

export default client => ({
  getProjects: () => {
    const url = urls.projects

    return client.get(url)
  },

  getProject: (project) => {
    const url = urls.project
      .replace('{project_slug}', project)

    return client.get(url)
  },

  createProject: (form) => {
    const url = urls.projects

    return client.post(url, form)
  },

  updateProject: (project, form) => {
    const url = urls.project
      .replace('{project_slug}', project)

    return client.put(url, form)
  },

  deleteProject: (project) => {
    const url = urls.project
      .replace('{project_slug}', project)

    return client.delete(url)
  },
})
