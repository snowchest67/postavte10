import { ComponentFactory } from '../utils/componentFactory.js'
import { ApiService } from '../services/apiService.js'
import { createSearch } from './search.js'

export function createUsersComponent() {
	const container = ComponentFactory.createElement('div', {
		className: 'users-container',
	})

	let users = []
	let filteredUsers = []

	const header = ComponentFactory.createElement('h1', {}, 'Пользователи')
	container.appendChild(header)

	const search = createSearch(searchTerm => {
		filterUsers(searchTerm)
	})
	container.appendChild(search)

	const usersList = ComponentFactory.createElement('div', {
		className: 'users-list',
	})
	container.appendChild(usersList)

	async function loadUsers() {
		try {
			users = await ApiService.getUsers()
			filteredUsers = [...users]
			renderUsers()
		} catch (error) {
			console.error('Error loading users:', error)
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

		filteredUsers.forEach(user => {
			const userCard = ComponentFactory.createElement('div', {
				className: 'user-card',
			})

			const userName = ComponentFactory.createElement('h3', {}, user.name)
			const userEmail = ComponentFactory.createElement('p', {}, user.email)
			const userPhone = ComponentFactory.createElement('p', {}, user.phone)

			const todosLink = ComponentFactory.createElement(
				'button',
				{
					className: 'link-button',
					onClick: () =>
						(window.location.hash = `#users#todos?userId=${user.id}`),
				},
				'Задачи'
			)

			const postsLink = ComponentFactory.createElement(
				'button',
				{
					className: 'link-button',
					onClick: () =>
						(window.location.hash = `#users#posts?userId=${user.id}`),
				},
				'Посты'
			)

			userCard.appendChild(userName)
			userCard.appendChild(userEmail)
			userCard.appendChild(userPhone)
			userCard.appendChild(todosLink)
			userCard.appendChild(postsLink)

			usersList.appendChild(userCard)
		})
	}

	loadUsers()

	return container
}
