import 'babel-polyfill'
import 'react-image-lightbox/style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import App from 'modules/App'
import LanguageProvider from 'modules/LanguageProvider'

import configureStore from 'store/configureStore'

import { BASE_URL } from 'config'

import { translationMessages } from './i18n'

const history = createHistory({
  basename: window.BASE_URL ? window.BASE_URL.match(/\/\/[^/]+\/([^.]+)/)[1] : BASE_URL,
})
const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('root')

const render = (messages) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    MOUNT_NODE,
  )
}

render(translationMessages)

if (module.hot) {
  module.hot.accept('./modules/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}
