import { schema } from 'normalizr'

import user from './user'

const media = new schema.Entity('media', {
  author: user,
})

export default media
