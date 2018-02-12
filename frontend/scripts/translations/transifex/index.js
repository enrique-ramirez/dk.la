import axios from 'axios'
import md5 from 'blueimp-md5'

import Language from './language'
import Project from './project'
import Resource from './resource'
import Stat from './stat'
import Translation from './translation'
import urls from './urls'

const hash = string => md5((unescape(encodeURIComponent(`${string}:`))))

const transifexClient = function makeTransifexClient(options) {
  if (!options.username && !options.token) {
    throw Error('No credentials provided')
  }

  const client = axios.create({
    auth: {
      username: options.token ? 'api' : options.username,
      password: options.token || options.password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return Object.assign(
    {
      urls,
      options,
    },
    Language(client),
    Project(client),
    Resource(client, hash),
    Stat(client),
    Translation(client, hash),
  )
}

export default transifexClient
