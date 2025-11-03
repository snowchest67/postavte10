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
		const path = parts.join('#')
		const lastPart = parts[parts.length - 1] || ''
		const [lastPath, query] = lastPart.split('?')
		const params = {}

		if (query) {
			query.split('&').forEach(param => {
				const [key, value] = param.split('=')
				params[key] = value
			})
		}

		return { path, params, parts }
	}

	addRoute(path, component) {
		this.routes[path] = component
	}

	navigate(route) {
		if (route !== this.currentRoute) {
			window.location.hash = route
		}
	}

	async render() {
		if (!this.outlet) {
			this.outlet = document.getElementById('router-outlet')
		}

		const { path, params } = this.parseRoute(this.currentRoute)
		const component = this.routes[path]

		console.log('Rendering route:', path, 'Component exists:', !!component)

		if (component && this.outlet) {
			this.outlet.innerHTML = ''
			try {
				const componentElement = await component(params)
				if (componentElement) {
					this.outlet.appendChild(componentElement)
				}
			} catch (error) {
				console.error('Error rendering component:', error)
				this.outlet.innerHTML = '<p>Ошибка загрузки компонента</p>'
			}
		} else {
			console.warn('Route not found:', path)

			if (path !== 'users') {
				this.navigate('users')
			} else {
				this.outlet.innerHTML = '<p>Страница не найдена</p>'
			}
		}
	}

	init() {
		window.addEventListener('hashchange', () => {
			console.log('Hash changed to:', window.location.hash)
			this.currentRoute = this.getCurrentRoute()
			this.render()
		})

		this.render()
	}
}
