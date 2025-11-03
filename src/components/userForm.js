import { ComponentFactory } from '../utils/componentFactory.js'
import { StorageService } from '../utils/storage.js'

export function createUserForm() {
	const form = ComponentFactory.createElement('form', {
		className: 'user-form',
	})

	const title = ComponentFactory.createElement(
		'h3',
		{},
		'Добавить пользователя'
	)
	form.appendChild(title)

	const nameInput = ComponentFactory.createElement('input', {
		type: 'text',
		placeholder: 'Имя',
		required: true,
		className: 'form-input',
	})

	const emailInput = ComponentFactory.createElement('input', {
		type: 'email',
		placeholder: 'Email',
		required: true,
		className: 'form-input',
	})

	const phoneInput = ComponentFactory.createElement('input', {
		type: 'tel',
		placeholder: 'Телефон',
		className: 'form-input',
	})

	const submitButton = ComponentFactory.createElement(
		'button',
		{
			type: 'submit',
			className: 'submit-button',
		},
		'Добавить пользователя'
	)

	form.appendChild(nameInput)
	form.appendChild(emailInput)
	form.appendChild(phoneInput)
	form.appendChild(submitButton)

	form.addEventListener('submit', e => {
		e.preventDefault()

		const user = {
			name: nameInput.value,
			email: emailInput.value,
			phone: phoneInput.value,
		}

		StorageService.addUser(user)
		alert('Пользователь добавлен!')
		form.reset()

		if (window.location.hash === '#users') {
			window.dispatchEvent(new HashChangeEvent('hashchange'))
		}
	})

	return form
}
