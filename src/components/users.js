import { ComponentFactory } from '../utils/componentFactory.js'
import { ApiService } from '../services/apiService.js'
import { StorageService } from '../utils/storage.js'
import { createSearch } from './search.js'
import { createUserForm } from './userForm.js'
import { createTodoForm } from './todoForm.js'

export function createUsersComponent() {
	const container = ComponentFactory.createElement('div', {
		className: 'users-container',
	})

	let users = []
	let filteredUsers = []
	let selectedUser = null

	const header = ComponentFactory.createElement('h1', {}, 'Пользователи')
	container.appendChild(header)

	container.appendChild(createUserForm(onUserAdded))

	const search = createSearch(searchTerm => {
		filterUsers(searchTerm)
	})
	container.appendChild(search)

	const usersList = ComponentFactory.createElement('div', {
		className: 'users-list',
	})
	container.appendChild(usersList)

	const todoFormContainer = ComponentFactory.createElement('div', {
		className: 'todo-form-container',
		style: 'display: none;',
	})
	container.appendChild(todoFormContainer)

	async function loadUsers() {
		try {
			const apiUsers = await ApiService.getUsers()
			const localUsers = StorageService.getUsers()
			users = [...apiUsers, ...localUsers]
			filteredUsers = [...users]
			renderUsers()
		} catch (error) {
			console.error('Error loading users:', error)
			users = StorageService.getUsers()
			filteredUsers = [...users]
			renderUsers()
		}
	}

	function filterUsers(searchTerm) {
		if (!searchTerm.trim()) {
			filteredUsers = [...users]
		} else {
			filteredUsers = users.filter(
				user =>
					user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}
		renderUsers()
	}

	function renderUsers() {
		usersList.innerHTML = ''

		if (filteredUsers.length === 0) {
			const noUsers = ComponentFactory.createElement(
				'p',
				{
					className: 'no-data',
				},
				'Пользователи не найдены'
			)
			usersList.appendChild(noUsers)
			return
		}

		filteredUsers.forEach(user => {
			const userCard = ComponentFactory.createElement('div', {
				className: 'user-card',
			})

			const userName = ComponentFactory.createElement('h3', {}, user.name)
			const userEmail = ComponentFactory.createElement(
				'p',
				{},
				`Email: ${user.email}`
			)
			const userPhone = ComponentFactory.createElement(
				'p',
				{},
				`Телефон: ${user.phone || 'Не указан'}`
			)

			const actionsContainer = ComponentFactory.createElement('div', {
				className: 'user-actions',
			})

			const addTodoButton = ComponentFactory.createElement(
				'button',
				{
					className: 'add-todo-button',
					onClick: () => showTodoForm(user),
				},
				'Добавить задачу'
			)

			if (user.id > 10) {
				const deleteButton = ComponentFactory.createElement(
					'button',
					{
						className: 'delete-button',
						onClick: () => deleteUser(user.id),
					},
					'Удалить'
				)
				actionsContainer.appendChild(deleteButton)
			}

			actionsContainer.appendChild(addTodoButton)

			userCard.appendChild(userName)
			userCard.appendChild(userEmail)
			userCard.appendChild(userPhone)
			userCard.appendChild(actionsContainer)

			usersList.appendChild(userCard)
		})
	}

	function showTodoForm(user) {
		selectedUser = user
		todoFormContainer.innerHTML = ''
		todoFormContainer.style.display = 'block'

		const form = createTodoForm(user.id, () => {
			todoFormContainer.style.display = 'none'
			selectedUser = null
		})

		todoFormContainer.appendChild(form)
	}

	function deleteUser(userId) {
		if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
			StorageService.deleteUser(userId)
			loadUsers()
		}
	}

	function onUserAdded() {
		loadUsers()
	}

	loadUsers()

	return container
}
