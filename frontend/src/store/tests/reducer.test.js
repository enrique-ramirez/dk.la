import * as matchers from 'jest-immutable-matchers'
import { fromJS } from 'immutable'

import rootReducer, { clearReduxForm } from 'store/reducer'

describe('rootReducer', () => {
  beforeAll(() => {
    jest.addMatchers(matchers)
  })

  it('should return initial immutable state', () => {
    expect(rootReducer(undefined, {})).toBeImmutableMap()
  })

  describe('entities reducer', () => {
    it('should contain an entities reducer', () => {
      expect(rootReducer(undefined, {}).toJS()).toHaveProperty('entities')
    })

    it('should update entities when an action has an entities property', () => {
      const initialState = fromJS({
        entities: {
          todos: {},
        },
      })

      expect(rootReducer(initialState, {
        type: 'SOME-ACTION',
        payload: fromJS({}),
        entities: fromJS({
          todos: {
            'some-id': 'This is a new todo',
          },
        }),
      }).getIn(['entities', 'todos']).size).toEqual(1)
    })
  })

  describe('form reducer', () => {
    it('should contain a form reducer', () => {
      expect(rootReducer(undefined, {}).toJS()).toHaveProperty('form')
    })

    it('should be able to clearReduxForm', () => {
      const initialState = fromJS({
        values: { test: 'hello' },
        fields: {
          test: { visited: true, touched: true },
        },
      })

      expect(clearReduxForm(initialState).get('values').size).toEqual(0)
      expect(clearReduxForm(initialState).getIn(['fields', 'test', 'touched'])).toEqual(false)
    })
  })
})
