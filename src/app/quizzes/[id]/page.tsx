import dynamic from 'next/dynamic'

import { quizzesService } from '@/services/quizzes.service'

const QuizDetailsPage = dynamic(
	() => import('@/components/screens/QuizDetailsPage/QuizDetailsPage'),
	{
		loading: () => <p>Loading...</p>,
		ssr: true
	}
)

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
	const { id } = await params

	const quiz = await quizzesService.getById(id)
	return <QuizDetailsPage quiz={quiz} />
}
