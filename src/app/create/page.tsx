import dynamic from 'next/dynamic'
import React from 'react'

const CreatePage = dynamic(
	() => import('@/components/screens/CreatePage/CreatePage'),
	{
		loading: () => <p>Loading...</p>,
		ssr: true
	}
)

export default async function ServerCreatePage() {
	return <CreatePage />
}
