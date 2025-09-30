import dynamic from 'next/dynamic'

const QuizzesPage = dynamic(
	() => import('@/components/screens/QuizzesPage/QuizzesPage'),
	{
		loading: () => <p>Loading...</p>,
		ssr: true
	}
)

export default async function ServerQuizzesPage() {
	return <QuizzesPage />
}
