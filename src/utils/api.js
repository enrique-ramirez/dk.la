import 'whatwg-fetch'
import { DEVELOPMENT_API_URL } from 'config'

const url = window.WPApiUrl || DEVELOPMENT_API_URL
const mainAPIURL = `${url}/wp/v2`
const menusAPIURL = `${url}/wp-api-menus/v2`
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const parseJSON = async (response) => {
  const pagination = {
    total: response.headers.get('X-WP-Total'),
    totalPages: response.headers.get('X-WP-TotalPages'),
  }
  const json = await response.json()

  return {
    json,
    pagination,
  }
}

export const fetchFrontPage = () => (
  fetch(`${mainAPIURL}/frontpage`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchPosts = () => (
  fetch(`${mainAPIURL}/dk_project?per_page=9`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchMedia = (id = '') => (
  fetch(`${mainAPIURL}/media/${id}`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchMenus = (id = '') => (
  fetch(`${menusAPIURL}/menus/${id}`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchMenuLocations = (location = '') => (
  fetch(`${menusAPIURL}/menu-locations/${location}`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchCategories = (id = '') => (
  fetch(`${mainAPIURL}/categories/${id}`, {
    headers,
    method: 'GET',
  }).then(parseJSON)
)
