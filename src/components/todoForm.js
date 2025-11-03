import { ComponentFactory } from '../utils/componentFactory.js';
import { StorageService } from '../utils/storage.js';

export function createTodoForm(userId, onTodoAdded) {
    const form = ComponentFactory.createElement('form', {
        className: 'todo-form'
    });
    
    const title = ComponentFactory.createElement('h4', {}, 'Добавить задачу');
    form.appendChild(title);
    
    const titleInput = ComponentFactory.createElement('input', {
        type: 'text',
        placeholder: 'Название задачи',
        required: true,
        className: 'form-input'
    });
    
    const completedCheckbox = ComponentFactory.createElement('input', {
        type: 'checkbox',
        id: 'completed',
        className: 'form-checkbox'
    });
    
    const completedLabel = ComponentFactory.createElement('label', {
        for: 'completed'
    }, 'Выполнено');
    
    const checkboxContainer = ComponentFactory.createElement('div', {
        className: 'checkbox-container'
    });
    
    checkboxContainer.appendChild(completedCheckbox);
    checkboxContainer.appendChild(completedLabel);
    
    const submitButton = ComponentFactory.createElement('button', {
        type: 'submit',
        className: 'submit-button'
    }, 'Добавить задачу');
    
    form.appendChild(titleInput);
    form.appendChild(checkboxContainer);
    form.appendChild(submitButton);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const todo = {
            userId: parseInt(userId),
            title: titleInput.value,
            completed: completedCheckbox.checked,
            id: Date.now()
        };
        
        StorageService.addTodo(todo);
        alert('Задача добавлена!');
        form.reset();
        
        if (onTodoAdded) {
            onTodoAdded();
        }
    });
    
    return form;
}