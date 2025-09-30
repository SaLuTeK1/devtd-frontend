'use client'

import React, { useState } from 'react'

import QuestionCard from '@/components/screens/QuizDetailsPage/QuestionCard'
import { Button } from '@/components/ui/button'

import { useSafeBack } from '@/hooks/useSafeBack'

import { IQuiz } from '@/shared/interfaces/quiz.interface'

interface IProps {
	quiz: IQuiz
}

const QuizDetailsPage = ({ quiz }: IProps) => {
	const { title, questions } = quiz
	const [showAnswers, setShowAnswers] = useState<boolean>(false)
	const back = useSafeBack('/quizzes')

	const onShowAnswers = () => setShowAnswers(p => !p)

	return (
		<main className={'w-wrap mx-auto relative'}>
			<h2 className={'text-[64px] font-semibold text-center'}>{title}</h2>
			<Button className={'top-5 absolute mb-5 '} onClick={back}>
				Back
			</Button>
			<Button className={'mb-5'} onClick={onShowAnswers}>
				{showAnswers ? 'Hide' : 'Show'} Correct answer?
			</Button>
			<div className={'grid gap-5'}>
				{questions &&
					questions.length > 0 &&
					questions.map(question => (
						<QuestionCard
							question={question}
							key={question.id}
							showCorrectAnswer={showAnswers}
						/>
					))}
			</div>
		</main>
	)
}

export default QuizDetailsPage
