'use client'

import React from 'react'

import CreateQuizForm from '@/components/screens/CreatePage/CreateQuizForm'
import { Button } from '@/components/ui/button'

import { useSafeBack } from '@/hooks/useSafeBack'

const CreatePage = () => {
	const back = useSafeBack('/')
	return (
		<div className='relative container mx-auto max-w-3xl'>
			<Button
				className={'absolute mb-5 top-4 left-[-64px]'}
				onClick={back}
			>
				Back
			</Button>
			<CreateQuizForm />
		</div>
	)
}

export default CreatePage
