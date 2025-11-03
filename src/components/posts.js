import { ComponentFactory } from '../utils/componentFactory.js';
import { ApiService } from '../services/apiService.js';
import { createSearch } from './search.js';

export function createPostsComponent(params = {}) {
    const container = ComponentFactory.createElement('div', {
        className: 'posts-container'
    });
    
    let posts = [];
    let filteredPosts = [];
    const userId = params.userId;
    
    const header = ComponentFactory.createElement('h1', {}, 
        userId ? `Посты пользователя ${userId}` : 'Все посты'
    );
    container.appendChild(header);
    
    const search = createSearch((searchTerm) => {
        filterPosts(searchTerm);
    });
    container.appendChild(search);
    
    const postsList = ComponentFactory.createElement('div', {
        className: 'posts-list'
    });
    container.appendChild(postsList);
    
    async function loadPosts() {
        try {
            if (userId) {
                posts = await ApiService.getUserPosts(userId);
            } else {
                posts = await ApiService.getPosts();
            }
            filteredPosts = [...posts];
            renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
            posts = [];
            filteredPosts = [];
            renderPosts();
        }
    }
    
    function filterPosts(searchTerm) {
        if (!searchTerm.trim()) {
            filteredPosts = [...posts];
        } else {
            filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.body.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        renderPosts();
    }
    
    function renderPosts() {
        postsList.innerHTML = '';
        
        if (filteredPosts.length === 0) {
            const noPosts = ComponentFactory.createElement('p', {
                className: 'no-data'
            }, 'Посты не найдены');
            postsList.appendChild(noPosts);
            return;
        }
        
        filteredPosts.forEach(post => {
            const postItem = ComponentFactory.createElement('div', {
                className: 'post-item'
            });
            
            const postTitle = ComponentFactory.createElement('h3', {}, post.title);
            const postBody = ComponentFactory.createElement('p', {
                className: 'post-body'
            }, post.body);
            
            const commentsLink = ComponentFactory.createElement('button', {
                className: 'link-button',
                onClick: () => window.location.hash = `comments?postId=${post.id}`
            }, 'Комментарии');
            
            postItem.appendChild(postTitle);
            postItem.appendChild(postBody);
            postItem.appendChild(commentsLink);
            
            postsList.appendChild(postItem);
        });
    }
    
    loadPosts();
    
    return container;
}