const dev = require('./dev')
const prod = require('./prod')

const NODE_ENV = process.env.NODE_ENV || 'development'
console.log(NODE_ENV)
let config = {}
if (NODE_ENV === 'development') {
	config = dev
} else if (NODE_ENV === 'production') {
	config = prod
}

module.exports = config
