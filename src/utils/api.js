import 'whatwg-fetch'
import { DEVELOPMENT_API_URL } from 'config'

const url = window.DEVELOPMENT_API_URL || DEVELOPMENT_API_URL
const mainAPIURL = `${url}wp/v2`
const menusAPIURL = `${url}wp-api-menus/v2`
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const addParameterToURL = (URL, param) => {
  const char = URL.split('?')[1] ? '&' : '?'
  return `${URL}${char}${param}`
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

export const fetchPage = (slug = '') => (
  fetch(addParameterToURL(`${mainAPIURL}/pages`, `slug=${slug}`), {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchPosts = (page = 1) => (
  fetch(addParameterToURL(`${mainAPIURL}/project`, `per_page=9&page=${page}`), {
    headers,
    method: 'GET',
  }).then(parseJSON)
)

export const fetchPost = (slug = '') => (
  fetch(addParameterToURL(`${mainAPIURL}/project`, `slug=${slug}`), {
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

export const fetchVimeoData = (id = '') => (
  fetch(`//vimeo.com/api/v2/video/${id}.json`, {
    method: 'GET',
  }).then(parseJSON)
)
