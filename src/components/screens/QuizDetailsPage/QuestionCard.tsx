'use client'

import React from 'react'

import BooleanAnswer from './BooleanAnswer'
import CheckboxAnswer from './CheckboxAnswer'
import InputAnswer from './InputAnswer'
import { QuestionTypeEnum } from '@/shared/enums/question-type.enum'
import { IQuestion } from '@/shared/interfaces/quiz.interface'

interface QuestionCardProps {
	question: IQuestion
	onAnswerChange?: (questionId: string, answer: any) => void
	showCorrectAnswer?: boolean
}

const QuestionCard = ({
	question,
	onAnswerChange,
	showCorrectAnswer = false
}: QuestionCardProps) => {
	const { id, prompt, acceptableAnswers, correctBoolean, options, type } =
		question

	const handleAnswerChange = (answer: any) => {
		onAnswerChange?.(id, answer)
	}

	const renderAnswerComponent = () => {
		switch (type) {
			case QuestionTypeEnum.BOOLEAN:
				return (
					<BooleanAnswer
						onAnswerChange={handleAnswerChange}
						correctAnswer={correctBoolean}
						showCorrectAnswer={showCorrectAnswer}
					/>
				)

			case QuestionTypeEnum.INPUT:
				return (
					<InputAnswer
						onAnswerChange={handleAnswerChange}
						correctAnswers={acceptableAnswers}
						showCorrectAnswer={showCorrectAnswer}
						placeholder='Type your answer here...'
					/>
				)

			case QuestionTypeEnum.CHECKBOX:
				return (
					<CheckboxAnswer
						options={options}
						onAnswerChange={handleAnswerChange}
						showCorrectAnswer={showCorrectAnswer}
					/>
				)

			default:
				return <div>Unsupported question type</div>
		}
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md border'>
			<h3 className='text-lg font-semibold text-gray-800 mb-4'>
				{prompt}
			</h3>
			<div className='space-y-4'>{renderAnswerComponent()}</div>
		</div>
	)
}

export default QuestionCard
