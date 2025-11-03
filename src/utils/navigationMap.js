export const navigationMap = {
	users: 'Пользователи',
	'users#todos': 'Задачи',
	'users#posts': 'Посты',
	'users#posts#comments': 'Комментарии',
}

export const getBreadcrumbName = path => {
	return navigationMap[path] || path
}
