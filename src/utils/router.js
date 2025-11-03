import { ComponentFactory } from './componentFactory.js'

export class Router {
	constructor() {
		this.routes = {}
		this.outlet = null
		this.currentRoute = this.getCurrentRoute()
	}

	getCurrentRoute() {
		const hash = window.location.hash.slice(1)
		return hash || 'users'
	}

	parseRoute(route) {
		const parts = route.split('#').filter(part => part)
		const lastPart = parts[parts.length - 1] || ''
		const [path, query] = lastPart.split('?')
		const params = {}

		if (query) {
			query.split('&').forEach(param => {
				const [key, value] = param.split('=')
				params[key] = value
			})
		}

		return { path: parts.join('#'), params, parts }
	}

	addRoute(path, component) {
		this.routes[path] = component
	}

	navigate(route) {
		window.location.hash = route
	}

	async render() {
		if (!this.outlet) {
			this.outlet = document.getElementById('router-outlet')
		}

		const { path, params, parts } = this.parseRoute(this.currentRoute)
		const component = this.routes[path]

		if (component && this.outlet) {
			this.outlet.innerHTML = ''
			const componentElement = await component(params, parts)
			if (componentElement) {
				this.outlet.appendChild(componentElement)
			}
		} else {
			this.navigate('users')
		}
	}

	init() {
		window.addEventListener('hashchange', () => {
			this.currentRoute = this.getCurrentRoute()
			this.render()
		})

		this.render()
	}
}
