import {
  fetchFrontPage,
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

  it('fetchFrontPage', async () => {
    const response = await fetchFrontPage()

    expect(response.length).toEqual(3)
  })
})
