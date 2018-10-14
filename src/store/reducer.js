import { reducer as formReducer } from 'redux-form/immutable'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { Map, fromJS } from 'immutable'

/* Resources reducers imports */
import app from 'modules/App/duck'
import splash from 'modules/Splash/duck'
import projects from 'modules/Projects/duck'
import languageProvider from 'modules/LanguageProvider/duck'
import viewPost from 'modules/ViewPost/duck'
import viewPage from 'modules/ViewPage/duck'

/* Utils */
export const clearReduxForm = state => (
  state
    .set('values', Map({}))
    .set(
      'fields',
      state.get('fields').map(field => field.set('touched', false)),
    )
)

/* UI reducers imports */

/* Entities reducer */
const entities = (state = fromJS({}), action) => {
  switch (action.type) {
    default: {
      if (action.entities) {
        return action.entities.reduce(
          (aggr, value, key) => aggr.mergeIn([key], value),
          state,
        )
      }

      return state
    }
  }
}

/* Resources reducer */
const resources = combineReducers({
  app,
  splash,
  projects,
  languageProvider,
  viewPost,
  viewPage,
})

/* Input reducer */
const form = formReducer.plugin({

})

/* UI Reducer */

/* Root Reducer */
const rootReducer = combineReducers({
  entities,
  resources,
  form,
  router: routerReducer,
})

export default rootReducer
