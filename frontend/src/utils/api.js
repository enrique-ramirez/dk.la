import 'whatwg-fetch'
import { DEVELOPMENT_API_URL } from 'config'

const url = window.WPApiUrl || DEVELOPMENT_API_URL
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const parseJSON = response => response.json()

export const fetchFrontPage = () => (
  fetch(`${url}/frontpage`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchPosts = () => (
  fetch(`${url}/posts`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)
