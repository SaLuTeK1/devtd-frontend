'use client'

import React from 'react'

import QuizzesList from '@/components/screens/QuizzesPage/QuizzesList'
import { Button } from '@/components/ui/button'

import { useSafeBack } from '@/hooks/useSafeBack'

const QuizzesPage = () => {
	const back = useSafeBack('/')
	return (
		<main className={'w-wrap mx-auto'}>
			<h1 className={'text-[76px] text-center font-semibold'}>Quizzes</h1>
			<Button className={'top-5 absolute mb-5 '} onClick={back}>
				Back
			</Button>
			<QuizzesList />
		</main>
	)
}

export default QuizzesPage
