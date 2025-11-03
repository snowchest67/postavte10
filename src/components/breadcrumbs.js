import { ComponentFactory } from '../utils/componentFactory.js'
import { getBreadcrumbName } from '../utils/navigationMap.js'

export function createBreadcrumbs() {
	const breadcrumbs = ComponentFactory.createElement('nav', {
		className: 'breadcrumbs',
	})

	const updateBreadcrumbs = () => {
		breadcrumbs.innerHTML = ''
		const currentHash = window.location.hash.slice(1)
		const parts = currentHash.split('#').filter(part => part)

		if (parts.length === 0) {
			parts.push('users')
		}

		let path = ''
		parts.forEach((part, index) => {
			path += path ? `#${part}` : part
			const isLast = index === parts.length - 1

			const crumb = ComponentFactory.createElement('span', {
				className: `breadcrumb ${isLast ? 'active' : ''}`,
			})

			if (!isLast) {
				const link = ComponentFactory.createElement(
					'a',
					{
						href: `#${path}`,
						onClick: e => {
							e.preventDefault()
							window.location.hash = path
						},
					},
					getBreadcrumbName(path)
				)
				crumb.appendChild(link)
			} else {
				crumb.textContent = getBreadcrumbName(path)
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
