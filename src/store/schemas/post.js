import { schema } from 'normalizr'

import user from './user'
import media from './media'
import category from './category'
import video from './video'

const post = new schema.Entity('posts', {
  acf: {
    gallery: [media],
    videos: [video],
  },
  author: user,
  featured_media: media,
  categories: [category],
})

export default post
