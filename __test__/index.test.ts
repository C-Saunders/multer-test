import supertest from 'supertest'
import { server } from '../index'

describe('when no data is supplied', () => { 
  const consoleSpy = jest.spyOn(console, 'log')
  beforeEach(consoleSpy.mockClear)

  it('works without multer', async () => {
    await supertest(server)
      .post('/without-multer')
      .set('Content-type', 'multipart/form-data')
      .set({ 'X-Request-ID': 'test-id' })
  
    expect(consoleSpy).toHaveBeenCalledWith({ request_id: 'test-id' })
  })

  it('works with multer', async () => {
    await supertest(server)
      .post('/with-multer')
      .set({ 'X-Request-ID': 'test-id' })
  
      expect(consoleSpy).toHaveBeenCalledWith({ request_id: 'test-id' })
  })
})

describe('when data is supplied', () => {
  const consoleSpy = jest.spyOn(console, 'log')
  beforeEach(consoleSpy.mockClear)

  it('works without multer', async () => {
    await supertest(server)
      .post('/without-multer')
      .set({ 'X-Request-ID': 'test-id', 'Content-type': 'multipart/form-data' })
      .field({ foo: 'bar' })
  
    expect(consoleSpy).toHaveBeenCalledWith({ request_id: 'test-id' })
  })

  it('works with busboy', async () => {
    await supertest(server)
      .post('/with-busboy')
      .set({ 'X-Request-ID': 'test-id', 'Content-type': 'multipart/form-data' })
      .field({ foo: 'bar' })
  
    expect(consoleSpy).toHaveBeenCalledWith({ request_id: 'test-id' })
  })

  it('does not work with multer', async () => {
    await supertest(server)
      .post('/with-multer')
      .set({ 'X-Request-ID': 'test-id', 'Content-type': 'multipart/form-data' })
      .field({ foo: 'bar' })
  
      expect(consoleSpy).toHaveBeenCalledWith({ request_id: 'test-id' })
  })
})


