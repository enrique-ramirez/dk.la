import {
  fetchSplashPage,
} from 'utils/api'

describe('api', () => {
  const tasks = [{}, {}, {}]

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const promise = new Promise((resolve) => {
        resolve({
          json: () => (tasks),
        })
      })

      return promise
    })
  })

  it('fetchSplashPage', async () => {
    const response = await fetchSplashPage()

    expect(response.length).toEqual(3)
  })
})
