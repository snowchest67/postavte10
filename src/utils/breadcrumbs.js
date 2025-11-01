import { ComponentFactory } from '../utils/componentFactory.js'

export function createBreadcrumbs() {
	const routes = {
		'#users': 'Пользователи',
		'#users#todos': 'Задачи',
		'#users#posts': 'Посты',
		'#users#posts#comments': 'Комментарии',
	}

	const breadcrumbs = ComponentFactory.createElement('nav', {
		className: 'breadcrumbs',
	})

	const updateBreadcrumbs = () => {
		breadcrumbs.innerHTML = ''
		const currentHash = window.location.hash
		const parts = currentHash.split('#').filter(part => part)

		let path = ''
		parts.forEach((part, index) => {
			path += `#${part}`
			const isLast = index === parts.length - 1

			const crumb = ComponentFactory.createElement('span', {
				className: `breadcrumb ${isLast ? 'active' : ''}`,
			})

			if (!isLast) {
				const link = ComponentFactory.createElement(
					'a',
					{
						href: path,
						onClick: e => {
							e.preventDefault()
							window.location.hash = path
						},
					},
					routes[path] || part
				)
				crumb.appendChild(link)
			} else {
				crumb.textContent = routes[path] || part
			}

			breadcrumbs.appendChild(crumb)

			if (!isLast) {
				const separator = ComponentFactory.createElement(
					'span',
					{
						className: 'breadcrumb-separator',
					},
					' / '
				)
				breadcrumbs.appendChild(separator)
			}
		})
	}

	window.addEventListener('hashchange', updateBreadcrumbs)
	updateBreadcrumbs()

	return breadcrumbs
}
