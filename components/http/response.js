const DEFAULT_OPTIONS = {
	text404: 'Error 404',
}

class Response {

	constructor(response, options) {
		this._response = response
		this._options = Object.assign({}, DEFAULT_OPTIONS, options || {})
	}

	setHeader(key, value) {
		let headers = {}

		if (typeof key === 'object') {
			headers = key
		} else {
			headers[key] = value
		}

		Object
			.keys(headers)
			.forEach((header) => {
				this._response.setHeader(header, headers[header])
			})

		return this
	}

	redirect(url, code) {
		this._response.writeHead(code || 301, {
			Location: url,
		})

		return this.send()
	}

	send404(text) {
		text = text || this._options.text404

		this._response.statusCode = 404
		this._response.end(text)

		return this
	}

	send(data) {
		this._response.end(data)

		return this
	}
}

module.exports = Response
