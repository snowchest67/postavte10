export class ComponentFactory {
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'onClick') {
                element.addEventListener('click', attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (typeof content === 'string') {
            element.textContent = content;
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(child => {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                }
            });
        }
        
        return element;
    }
    
    static createRouter() {
        return {
            currentRoute: window.location.hash || '#users',
            routes: {},
            
            addRoute(route, component) {
                this.routes[route] = component;
            },
            
            navigate(route) {
                window.location.hash = route;
                this.currentRoute = route;
                this.render();
            },
            
            render() {
                const app = document.getElementById('app');
                const component = this.routes[this.currentRoute];
                if (component && app) {
                    app.innerHTML = '';
                    app.appendChild(component());
                }
            },
            
            init() {
                window.addEventListener('hashchange', () => {
                    this.currentRoute = window.location.hash;
                    this.render();
                });
                this.render();
            }
        };
    }
}