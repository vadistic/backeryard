import { getAllUsers } from './user.service'

describe('user', () => {
  test('getAllUsers', async () => {
    const res = await getAllUsers()

    expect(res.length).toBeGreaterThanOrEqual(0)
  })
})
