import dynamic from 'next/dynamic'

const MainPage = dynamic(
	() => import('@/components/screens/MainPage/MainPage'),
	{
		loading: () => <p>Loading...</p>,
		ssr: true
	}
)

export default function Home() {
	return <MainPage />
}
