const baseURL = process.env.BASE_URL

const urls = {
	quizzes: {
		base: '/quizzes',
		byId: (id: string): string => `/quizzes/${id}`
	}
}

export { urls, baseURL }
