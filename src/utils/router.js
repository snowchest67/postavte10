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
		const [path, query] = route.split('?')
		const params = {}

		if (query) {
			query.split('&').forEach(param => {
				const [key, value] = param.split('=')
				params[key] = value
			})
		}

		return { path, params }
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

		const { path, params } = this.parseRoute(this.currentRoute)
		const component = this.routes[path]

		if (component && this.outlet) {
			this.outlet.innerHTML = ''
			const componentElement = await component(params)
			if (componentElement) {
				this.outlet.appendChild(componentElement)
			}
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
