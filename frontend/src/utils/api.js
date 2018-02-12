import 'whatwg-fetch'

const url = 'http://localhost:8888/dk/wp-json/wp/v2'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const parseJSON = response => response.json()

// eslint-disable-next-line import/prefer-default-export
export const fetchSplashPage = () => (
  fetch(`${url}/frontpage`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)
