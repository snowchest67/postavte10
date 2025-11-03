import { ComponentFactory } from './utils/componentFactory.js';
import { createBreadcrumbs } from './components/breadcrumbs.js';
import { createUsersComponent } from './components/users.js';
import { createTodosComponent } from './components/todos.js';
import { createPostsComponent } from './components/posts.js';
import { createCommentsComponent } from './components/comments.js';
import { createUserForm } from './components/userForm.js';

class SPAApplication {
    constructor() {
        this.router = ComponentFactory.createRouter();
        this.init();
    }
    
    init() {
        this.setupRoutes();
        this.renderLayout();
        this.router.init();
    }
    
    setupRoutes() {
        this.router.addRoute('#users', () => {
            const container = ComponentFactory.createElement('div');
            container.appendChild(createUserForm());
            container.appendChild(createUsersComponent());
            return container;
        });
        
        this.router.addRoute('#users#todos', () => {
            return createTodosComponent();
        });
        
        this.router.addRoute('#users#posts', () => {
            return createPostsComponent();
        });
        
        this.router.addRoute('#users#posts#comments', () => {
            return createCommentsComponent();
        });
    }
    
    renderLayout() {
        const app = document.getElementById('app');
        if (!app) return;
        
        const header = ComponentFactory.createElement('header', {
            className: 'app-header'
        });
        
        const nav = ComponentFactory.createElement('nav', {
            className: 'main-nav'
        });
        
        const usersLink = ComponentFactory.createElement('a', {
            href: '#users',
            className: 'nav-link',
            onClick: (e) => {
                e.preventDefault();
                this.router.navigate('#users');
            }
        }, 'Пользователи');
        
        const todosLink = ComponentFactory.createElement('a', {
            href: '#users#todos',
            className: 'nav-link',
            onClick: (e) => {
                e.preventDefault();
                this.router.navigate('#users#todos');
            }
        }, 'Задачи');
        
        const postsLink = ComponentFactory.createElement('a', {
            href: '#users#posts',
            className: 'nav-link',
            onClick: (e) => {
                e.preventDefault();
                this.router.navigate('#users#posts');
            }
        }, 'Посты');
        
        const commentsLink = ComponentFactory.createElement('a', {
            href: '#users#posts#comments',
            className: 'nav-link',
            onClick: (e) => {
                e.preventDefault();
                this.router.navigate('#users#posts#comments');
            }
        }, 'Комментарии');
        
        nav.appendChild(usersLink);
        nav.appendChild(todosLink);
        nav.appendChild(postsLink);
        nav.appendChild(commentsLink);
        
        header.appendChild(nav);
        
        const mainContainer = ComponentFactory.createElement('main', {
            className: 'main-container'
        });
        
        mainContainer.appendChild(createBreadcrumbs());
        
        const routerOutlet = ComponentFactory.createElement('div', {
            id: 'router-outlet'
        });
        
        mainContainer.appendChild(routerOutlet);
        
        app.innerHTML = '';
        app.appendChild(header);
        app.appendChild(mainContainer);
        
        this.router.outlet = routerOutlet;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SPAApplication();
});