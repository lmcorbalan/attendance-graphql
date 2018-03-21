import http from 'http'
import { createServer } from 'http'

import appConfig from './config'
import app from './server'

const server = http.createServer(app)
let currentApp = app

server.listen(appConfig.port, () => {
	console.log(`Server listening on port ${appConfig.port}`)
})

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
