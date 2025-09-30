'use client'

import QuizzesCard from '@/components/screens/QuizzesPage/QuizzesCard'
import { useMutation, useQuery } from '@tanstack/react-query'
import { quizzesService } from '@/services/quizzes.service'
import { queryClient } from '@/providers'

const QuizzesList = () => {

	const { data: quizzes = [], isLoading, error } = useQuery({
		queryKey: ['quizzes'],
		queryFn: () => quizzesService.getQuizzes()
	})

	const deleteMutation = useMutation({
		mutationFn: quizzesService.deleteById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['quizzes'] })
		}
	})

	if (isLoading) {
		return <div>Loading quizzes...</div>
	}

	if (error) {
		return <div>Error loading quizzes: {error.message}</div>
	}

	return (
		<div className={'grid grid-cols-6 gap-5'}>
			{quizzes && quizzes.length > 0 ? (
				quizzes.map(quiz => (
					<QuizzesCard 
						key={quiz.id} 
						quiz={quiz} 
						handleDelete={(id) => deleteMutation.mutateAsync(id)}
					/>
				))
			) : (
				<div className="col-span-6 text-center text-gray-500">
					No quizzes found
				</div>
			)}
		</div>
	)
}

export default QuizzesList
