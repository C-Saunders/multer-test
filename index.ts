import { AsyncLocalStorage } from 'async_hooks'
import busboy from 'busboy'
import express from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

type RequestContext = { request_id: string }
const executionContext = new AsyncLocalStorage<RequestContext>()

export const server = express()

server.use((req, _res, next) => {
  executionContext.run({ request_id: req.get('X-Request-ID') ?? uuidv4() }, () => next())
})

server.post(
  '/with-busboy',
  (req, res, _next) => {
    // example adapted from busboy README
    const bb = busboy({ headers: req.headers })
    bb.on('field', (name, val, _info) => {
      console.log(`Field [${name}]: value: %j`, val)
    })
    bb.on('close', () => {
      console.log('Done parsing form!')
      res.end()
    })
    req.pipe(bb)

    console.log(executionContext.getStore())
    return res.send('OK')
  }
)

server.post(
  '/with-multer',
  multer({ storage: multer.memoryStorage() }).any(),
  (_req, res, _next) => {
    console.log(executionContext.getStore())
    return res.send('OK')
  }
)

server.post(
  '/without-multer',
  (_req, res, _next) => {
    console.log(executionContext.getStore())
    return res.send('OK')
  }
)

if (require.main == module) {
  const port = 5000
  const host = 'localhost'
  server.listen(port, 'localhost', () => console.info(`Listening on http://${host}:${port}/`))
}
