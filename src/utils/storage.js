export class StorageService {
	static KEY = 'spa_app_data'

	static getData() {
		const data = localStorage.getItem(this.KEY)
		return data ? JSON.parse(data) : { users: [], todos: [] }
	}

	static saveData(data) {
		localStorage.setItem(this.KEY, JSON.stringify(data))
	}

	static addUser(user) {
		const data = this.getData()
		user.id = Date.now()
		data.users.push(user)
		this.saveData(data)
		return user
	}

	static deleteUser(userId) {
		const data = this.getData()
		data.users = data.users.filter(user => user.id !== userId)

		data.todos = data.todos.filter(todo => todo.userId !== userId)
		this.saveData(data)
	}

	static addTodo(todo) {
		const data = this.getData()
		todo.id = Date.now()
		data.todos.push(todo)
		this.saveData(data)
		return todo
	}

	static getUsers() {
		return this.getData().users
	}

	static getTodos() {
		return this.getData().todos
	}
}
