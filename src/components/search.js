import { ComponentFactory } from '../utils/componentFactory.js';
import { debounce } from '../utils/debounce.js';

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
    
    const debouncedSearch = debounce((value) => {
        onSearch(value);
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    
    return searchContainer;
}