export class ApiService {
	static baseUrl = 'https://jsonplaceholder.typicode.com'

	static async getUsers() {
		try {
			const response = await fetch(`${this.baseUrl}/users`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching users:', error)
			return []
		}
	}

	static async getTodos() {
		try {
			const response = await fetch(`${this.baseUrl}/todos`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching todos:', error)
			return []
		}
	}

	static async getPosts() {
		try {
			const response = await fetch(`${this.baseUrl}/posts`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching posts:', error)
			return []
		}
	}

	static async getComments() {
		try {
			const response = await fetch(`${this.baseUrl}/comments`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching comments:', error)
			return []
		}
	}

	static async getUserTodos(userId) {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}/todos`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching user todos:', error)
			return []
		}
	}

	static async getUserPosts(userId) {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}/posts`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching user posts:', error)
			return []
		}
	}

	static async getPostComments(postId) {
		try {
			const response = await fetch(`${this.baseUrl}/posts/${postId}/comments`)
			return await response.json()
		} catch (error) {
			console.error('Error fetching post comments:', error)
			return []
		}
	}
}
