import { ComponentFactory } from '../utils/componentFactory.js';
import { ApiService } from '../services/apiService.js';
import { StorageService } from '../utils/storage.js';
import { createSearch } from './search.js';

export function createTodosComponent(params = {}) {
    const container = ComponentFactory.createElement('div', {
        className: 'todos-container'
    });
    
    let todos = [];
    let filteredTodos = [];
    const userId = params.userId;
    
    const header = ComponentFactory.createElement('h1', {}, 
        userId ? `Задачи пользователя ${userId}` : 'Все задачи'
    );
    container.appendChild(header);
    
    const search = createSearch((searchTerm) => {
        filterTodos(searchTerm);
    });
    container.appendChild(search);
    
    const todosList = ComponentFactory.createElement('div', {
        className: 'todos-list'
    });
    container.appendChild(todosList);
    
    async function loadTodos() {
        try {
            let apiTodos = [];
            if (userId) {
                apiTodos = await ApiService.getUserTodos(userId);
            } else {
                apiTodos = await ApiService.getTodos();
            }
            const localTodos = StorageService.getTodos();
            
            const filteredLocalTodos = userId ? 
                localTodos.filter(todo => todo.userId == userId) : 
                localTodos;
                
            todos = [...apiTodos, ...filteredLocalTodos];
            filteredTodos = [...todos];
            renderTodos();
        } catch (error) {
            console.error('Error loading todos:', error);
            todos = userId ? 
                StorageService.getTodos().filter(todo => todo.userId == userId) : 
                StorageService.getTodos();
            filteredTodos = [...todos];
            renderTodos();
        }
    }
    
    function filterTodos(searchTerm) {
        if (!searchTerm.trim()) {
            filteredTodos = [...todos];
        } else {
            filteredTodos = todos.filter(todo => 
                todo.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        renderTodos();
    }
    
    function renderTodos() {
        todosList.innerHTML = '';
        
        if (filteredTodos.length === 0) {
            const noTodos = ComponentFactory.createElement('p', {
                className: 'no-data'
            }, 'Задачи не найдены');
            todosList.appendChild(noTodos);
            return;
        }
        
        filteredTodos.forEach(todo => {
            const todoItem = ComponentFactory.createElement('div', {
                className: `todo-item ${todo.completed ? 'completed' : ''}`
            });
            
            const todoTitle = ComponentFactory.createElement('h4', {}, todo.title);
            const todoStatus = ComponentFactory.createElement('span', {
                className: `status ${todo.completed ? 'completed' : 'pending'}`
            }, todo.completed ? 'Выполнено' : 'В процессе');
            
            const userInfo = ComponentFactory.createElement('p', {
                className: 'user-info'
            }, `Пользователь ID: ${todo.userId}`);
            
            todoItem.appendChild(todoTitle);
            todoItem.appendChild(todoStatus);
            todoItem.appendChild(userInfo);
            
            todosList.appendChild(todoItem);
        });
    }
    
    loadTodos();
    
    return container;
}