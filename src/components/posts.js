import { ComponentFactory } from '../utils/componentFactory.js'
import { ApiService } from '../services/apiService.js'
import { createSearch } from './search.js'

export function createPostsComponent() {
	const container = ComponentFactory.createElement('div', {
		className: 'posts-container',
	})

	let posts = []
	let filteredPosts = []

	const header = ComponentFactory.createElement('h1', {}, 'Посты пользователей')
	container.appendChild(header)

	const search = createSearch(searchTerm => {
		filterPosts(searchTerm)
	})
	container.appendChild(search)

	const postsList = ComponentFactory.createElement('div', {
		className: 'posts-list',
	})
	container.appendChild(postsList)

	async function loadPosts() {
		try {
			posts = await ApiService.getPosts()
			filteredPosts = [...posts]
			renderPosts()
		} catch (error) {
			console.error('Error loading posts:', error)
		}
	}

	function filterPosts(searchTerm) {
		if (!searchTerm.trim()) {
			filteredPosts = [...posts]
		} else {
			filteredPosts = posts.filter(
				post =>
					post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					post.body.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}
		renderPosts()
	}

	function renderPosts() {
		postsList.innerHTML = ''

		filteredPosts.forEach(post => {
			const postItem = ComponentFactory.createElement('div', {
				className: 'post-item',
			})

			const postTitle = ComponentFactory.createElement('h3', {}, post.title)
			const postBody = ComponentFactory.createElement('p', {}, post.body)
			const commentsLink = ComponentFactory.createElement(
				'button',
				{
					className: 'link-button',
					onClick: () =>
						(window.location.hash = `#users#posts#comments?postId=${post.id}`),
				},
				'Комментарии'
			)

			postItem.appendChild(postTitle)
			postItem.appendChild(postBody)
			postItem.appendChild(commentsLink)

			postsList.appendChild(postItem)
		})
	}

	loadPosts()

	return container
}
