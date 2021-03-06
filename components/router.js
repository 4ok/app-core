const susanin = require('susanin')

const DEFAULT_PARAMS = {
	controller: 'index',
	action: 'index',
}

module.exports = class {

	constructor(routes) {
		this._susanin = susanin()

		if (routes) {
			this.addRoute(routes)
		}
	}

	addRoute(routes) {
		[].concat(routes).map(this._addOneRoute, this)
	}

	findRoute(url) {
		const found = this._susanin.findFirst(url)
		let result

		if (found) {
			const route = found[0]
			const params = {
				...DEFAULT_PARAMS,
				...(route.getData().params || {}),
				...(found[1] || {}),
			}

			result = {
				name: route.getName(),
				getByName: this._susanin.getRouteByName.bind(this._susanin),
				params,
			}
		}

		return result
	}

	_addOneRoute(route) {
		const params = Object.assign({
			useQueryString: false,
		}, route)

		params.data = {
			params: route.params || {},
		}

		delete params.params

		this._susanin.addRoute(params)
	}
}
