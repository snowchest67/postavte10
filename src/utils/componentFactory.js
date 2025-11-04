export class ComponentFactory {
	static createElement(tag, attributes = {}, content = '') {
		const element = document.createElement(tag)

		Object.keys(attributes).forEach(key => {
			if (key === 'className') {
				element.className = attributes[key]
			} else if (key === 'onClick') {
				element.addEventListener('click', attributes[key])
			} else {
				element.setAttribute(key, attributes[key])
			}
		})

		if (typeof content === 'string') {
			element.textContent = content
		} else if (content instanceof HTMLElement) {
			element.appendChild(content)
		} else if (Array.isArray(content)) {
			content.forEach(child => {
				if (child instanceof HTMLElement) {
					element.appendChild(child)
				}
			})
		}

		return element
	}

	
}