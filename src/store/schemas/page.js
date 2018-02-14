import { schema } from 'normalizr'

import user from './user'
import media from './media'

const page = new schema.Entity('pages', {
  author: user,
  featured_media: media,
})

export default page
