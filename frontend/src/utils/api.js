import 'whatwg-fetch'
import { DEVELOPMENT_API_URL } from 'config'

const url = window.WPApiUrl || DEVELOPMENT_API_URL
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const parseJSON = response => response.json()

// eslint-disable-next-line import/prefer-default-export
export const fetchFrontPage = () => (
  fetch(`${url}/frontpage`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)
