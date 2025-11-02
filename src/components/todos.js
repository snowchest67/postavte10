import { ComponentFactory } from '../utils/componentFactory.js'
import { ApiService } from '../services/apiService.js'
import { createSearch } from './search.js'

export function createTodosComponent() {
	const container = ComponentFactory.createElement('div', {
		className: 'todos-container',
	})

	let todos = []
	let filteredTodos = []

	const header = ComponentFactory.createElement(
		'h1',
		{},
		'Задачи пользователей'
	)
	container.appendChild(header)

	const search = createSearch(searchTerm => {
		filterTodos(searchTerm)
	})
	container.appendChild(search)

	const todosList = ComponentFactory.createElement('div', {
		className: 'todos-list',
	})
	container.appendChild(todosList)

	async function loadTodos() {
		try {
			todos = await ApiService.getTodos()
			filteredTodos = [...todos]
			renderTodos()
		} catch (error) {
			console.error('Error loading todos:', error)
		}
	}

	function filterTodos(searchTerm) {
		if (!searchTerm.trim()) {
			filteredTodos = [...todos]
		} else {
			filteredTodos = todos.filter(todo =>
				todo.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}
		renderTodos()
	}

	function renderTodos() {
		todosList.innerHTML = ''

		filteredTodos.forEach(todo => {
			const todoItem = ComponentFactory.createElement('div', {
				className: `todo-item ${todo.completed ? 'completed' : ''}`,
			})

			const todoTitle = ComponentFactory.createElement('h4', {}, todo.title)
			const todoStatus = ComponentFactory.createElement(
				'span',
				{
					className: `status ${todo.completed ? 'completed' : 'pending'}`,
				},
				todo.completed ? 'Выполнено' : 'В процессе'
			)

			const userInfo = ComponentFactory.createElement(
				'p',
				{
					className: 'user-info',
				},
				`Пользователь ID: ${todo.userId}`
			)

			todoItem.appendChild(todoTitle)
			todoItem.appendChild(todoStatus)
			todoItem.appendChild(userInfo)

			todosList.appendChild(todoItem)
		})
	}

	loadTodos()

	return container
}
