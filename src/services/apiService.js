export class ApiService {
    static baseUrl = 'https://jsonplaceholder.typicode.com';
    
    static async getUsers() {
        const response = await fetch(`${this.baseUrl}/users`);
        return await response.json();
    }
    
    static async getTodos() {
        const response = await fetch(`${this.baseUrl}/todos`);
        return await response.json();
    }
    
    static async getPosts() {
        const response = await fetch(`${this.baseUrl}/posts`);
        return await response.json();
    }
    
    static async getComments() {
        const response = await fetch(`${this.baseUrl}/comments`);
        return await response.json();
    }
    
    static async getUserTodos(userId) {
        const response = await fetch(`${this.baseUrl}/users/${userId}/todos`);
        return await response.json();
    }
    
    static async getUserPosts(userId) {
        const response = await fetch(`${this.baseUrl}/users/${userId}/posts`);
        return await response.json();
    }
    
    static async getPostComments(postId) {
        const response = await fetch(`${this.baseUrl}/posts/${postId}/comments`);
        return await response.json();
    }
}