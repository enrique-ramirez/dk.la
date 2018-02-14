import { List } from 'immutable'

// eslint-disable-next-line import/prefer-default-export
export function union(left, right) {
  const keys = {}

  left.forEach((x) => {
    keys[x] = undefined
  })

  right.forEach((x) => {
    keys[x] = undefined
  })

  return List(Object.keys(keys).map(i => parseInt(i, 10)))
}
