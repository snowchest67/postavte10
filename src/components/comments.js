import { ComponentFactory } from '../utils/componentFactory.js'
import { ApiService } from '../services/apiService.js'
import { createSearch } from './search.js'

export function createCommentsComponent() {
	const container = ComponentFactory.createElement('div', {
		className: 'comments-container',
	})

	let comments = []
	let filteredComments = []

	const header = ComponentFactory.createElement(
		'h1',
		{},
		'Комментарии к постам'
	)
	container.appendChild(header)

	const search = createSearch(searchTerm => {
		filterComments(searchTerm)
	})
	container.appendChild(search)

	const commentsList = ComponentFactory.createElement('div', {
		className: 'comments-list',
	})
	container.appendChild(commentsList)

	async function loadComments() {
		try {
			comments = await ApiService.getComments()
			filteredComments = [...comments]
			renderComments()
		} catch (error) {
			console.error('Error loading comments:', error)
		}
	}

	function filterComments(searchTerm) {
		if (!searchTerm.trim()) {
			filteredComments = [...comments]
		} else {
			filteredComments = comments.filter(
				comment =>
					comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					comment.body.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}
		renderComments()
	}

	function renderComments() {
		commentsList.innerHTML = ''

		filteredComments.forEach(comment => {
			const commentItem = ComponentFactory.createElement('div', {
				className: 'comment-item',
			})

			const commentName = ComponentFactory.createElement('h4', {}, comment.name)
			const commentEmail = ComponentFactory.createElement(
				'p',
				{
					className: 'comment-email',
				},
				comment.email
			)
			const commentBody = ComponentFactory.createElement('p', {}, comment.body)
			const postInfo = ComponentFactory.createElement(
				'p',
				{
					className: 'post-info',
				},
				`Пост ID: ${comment.postId}`
			)

			commentItem.appendChild(commentName)
			commentItem.appendChild(commentEmail)
			commentItem.appendChild(commentBody)
			commentItem.appendChild(postInfo)

			commentsList.appendChild(commentItem)
		})
	}

	loadComments()

	return container
}
