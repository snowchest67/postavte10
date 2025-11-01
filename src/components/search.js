import { ComponentFactory } from '../utils/componentFactory.js';

export function createSearch(onSearch) {
    const searchContainer = ComponentFactory.createElement('div', {
        className: 'search-container'
    });
    
    const searchInput = ComponentFactory.createElement('input', {
        type: 'text',
        placeholder: 'Поиск...',
        className: 'search-input'
    });
    
    const searchButton = ComponentFactory.createElement('button', {
        className: 'search-button',
        onClick: () => onSearch(searchInput.value)
    }, 'Найти');
    
    searchInput.addEventListener('input', (e) => {
        onSearch(e.target.value);
    });
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    
    return searchContainer;
}