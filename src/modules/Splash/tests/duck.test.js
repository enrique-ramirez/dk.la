import { fromJS } from 'immutable'
import { put } from 'redux-saga/effects'
import * as matchers from 'jest-immutable-matchers'

import reducer, {
  LOAD_SPLASH,
  loadSplash,
  getSplash,
  makeGetSplash,
  loadSplashSaga,
} from 'modules/Splash/duck'

describe('todos duck', () => {
  beforeAll(() => {
    jest.addMatchers(matchers)
  })

  describe('actions', () => {
    it('loadTodos', () => {
      const expected = {
        type: LOAD_SPLASH.ACTION,
      }

      expect(loadSplash()).toEqual(expected)
    })
  })

  describe('reducer', () => {
    let initialState

    beforeAll(() => {
      initialState = fromJS({
        loading: true,
        page: undefined,
      })
    })

    it('should return initial immutable state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle loadSplash', () => {
      const result = 20
      const getExpected = fixture => initialState.set('loading', false).set('page', fixture)

      expect(reducer(initialState, {
        type: LOAD_SPLASH.SUCCESS,
        payload: result,
      })).toEqual(getExpected(result))
    })
  })

  describe('selectors', () => {
    describe('getSplash', () => {
      it('should select the splash domain with entities', () => {
        const mockedState = fromJS({
          resources: {
            splash: {},
            somethingElse: 'I don\'t care',
            moreStuff: 'I don\'t need you',
          },
          entities: {},
        })
        const expected = fromJS({
          splash: {},
          entities: {},
        })

        expect(getSplash(mockedState)).toEqual(expected)
      })
    })

    describe('makeGetSplash', () => {
      it('should select a normalized splash', () => {
        const getSplashSelector = makeGetSplash()
        const id = '20'
        const mockedState = fromJS({
          resources: {
            splash: {
              loading: false,
              page: id,
            },
            somethingElse: 'I don\'t care',
            moreStuff: 'I don\'t need you',
          },
          entities: {
            pages: {
              [id]: { name: 'Hello there' },
            },
          },
        })

        expect(getSplashSelector(mockedState)).toEqual(fromJS({
          loading: mockedState.getIn(['resources', 'splash', 'loading']),
          page: mockedState.getIn(['entities', 'pages', id]),
        }))
      })
    })
  })

  describe('sagas', () => {
    describe('loadSplashSaga', () => {
      const fixture = { payload: fromJS({}) }
      let generator

      beforeEach(() => {
        generator = loadSplashSaga(fixture)

        const callDescriptor = generator.next().value

        expect(callDescriptor).toMatchSnapshot()
      })

      it('should call an api function and dispatch LOAD_SPLASH.SUCCESS on success', () => {
        const response = {
          entities: {
            pages: {
              'hyrule-126': { name: 'Ingo' },
            },
            categories: {
              'hyrule-234': { name: 'Princess saving' },
            },
          },
        }
        const callDescriptor = generator.next(response)
        const putDescriptor = generator.next(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({
          type: LOAD_SPLASH.SUCCESS,
          payload: fromJS(response.result),
          entities: fromJS(response.entities),
        }))
      })

      it('should call LOAD_SPLASH.ERROR on error', () => {
        const response = new Error('Ganon wins!')
        const putDescriptor = generator.throw(response).value

        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: LOAD_SPLASH.ERROR, payload: { error: response } }))
      })
    })
  })
})
