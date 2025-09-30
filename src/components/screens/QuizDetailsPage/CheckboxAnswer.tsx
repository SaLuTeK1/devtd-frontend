'use client'

import { Check } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { IOption } from '@/shared/interfaces/quiz.interface'

interface CheckboxAnswerProps {
	options: IOption[]
	onAnswerChange: (answers: string[]) => void
	showCorrectAnswer?: boolean
}

const CheckboxAnswer = ({
	options,
	onAnswerChange,
	showCorrectAnswer = false
}: CheckboxAnswerProps) => {
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

	const handleOptionChange = (optionId: string, isChecked: boolean) => {
		let newAnswers: string[]

		if (isChecked) {
			newAnswers = [...selectedAnswers, optionId]
		} else {
			newAnswers = selectedAnswers.filter(answer => answer !== optionId)
		}

		setSelectedAnswers(newAnswers)
		onAnswerChange(newAnswers)
	}

	const getOptionStyle = (option: IOption) => {
		const baseStyle =
			'flex items-center p-4 border rounded-lg cursor-pointer transition-colors'
		const isSelected = selectedAnswers.includes(option.id)
		const isCorrect = showCorrectAnswer && option.isCorrect
		const isWrong = showCorrectAnswer && isSelected && !option.isCorrect

		if (showCorrectAnswer) {
			if (isCorrect) {
				return `${baseStyle} border-green-500 bg-green-50`
			} else if (isWrong) {
				return `${baseStyle} border-red-500 bg-red-50`
			}
		}

		if (isSelected) {
			return `${baseStyle} border-blue-500 bg-blue-50`
		}

		return `${baseStyle} border-gray-300 hover:bg-gray-50`
	}

	const getCheckboxStyle = (option: IOption) => {
		const isSelected = selectedAnswers.includes(option.id)
		const isCorrect = showCorrectAnswer && option.isCorrect
		const isWrong = showCorrectAnswer && isSelected && !option.isCorrect

		if (showCorrectAnswer) {
			if (isCorrect) {
				return 'w-5 h-5 text-green-600 bg-green-100 border-green-500 rounded'
			} else if (isWrong) {
				return 'w-5 h-5 text-red-600 bg-red-100 border-red-500 rounded'
			}
		}

		if (isSelected) {
			return 'w-5 h-5 text-blue-600 bg-blue-100 border-blue-500 rounded'
		}

		return 'w-5 h-5 text-gray-600 bg-gray-100 border-gray-300 rounded'
	}

	return (
		<div className='space-y-3'>
			{options.map(option => (
				<label key={option.id} className={getOptionStyle(option)}>
					<input
						type='checkbox'
						checked={selectedAnswers.includes(option.id)}
						onChange={e =>
							handleOptionChange(option.id, e.target.checked)
						}
						className='sr-only'
						disabled={showCorrectAnswer}
					/>
					<div
						className={cn(
							getCheckboxStyle(option),
							'grid place-content-center'
						)}
					>
						{selectedAnswers.includes(option.id) && (
							<Check size={16} />
						)}
					</div>
					<span className='ml-3 text-sm font-medium'>
						{option.label}
					</span>
				</label>
			))}
			{showCorrectAnswer && (
				<div className='text-sm text-gray-600'>
					<span className='font-medium'>Correct answers:</span>{' '}
					{options
						.filter(option => option.isCorrect)
						.map(option => option.label)
						.join(', ')}
				</div>
			)}
		</div>
	)
}

export default CheckboxAnswer
