import { apiService } from './apiService'
import { urls } from '@/config/urls'
import { ICreateQuiz, IQuiz } from '@/shared/interfaces/quiz.interface'

const quizzesService = {
	getQuizzes: async (): Promise<IQuiz[]> => {
		const response = await apiService.get(urls.quizzes.base)
		return response.data
	},
	getById: async (id: string): Promise<IQuiz> => {
		const response = await apiService.get(urls.quizzes.byId(id))
		return response.data
	},
	createQuiz: async (payload: ICreateQuiz): Promise<IQuiz> => {
		const response = await apiService.post(urls.quizzes.base, payload)
		return response.data
	},
	deleteById: async (id: string): Promise<string> => {
		const response = await apiService.delete(urls.quizzes.byId(id))
		return response.data
	}
}

export { quizzesService }
