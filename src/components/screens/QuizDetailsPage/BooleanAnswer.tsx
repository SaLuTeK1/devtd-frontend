'use client'

import React, { useState } from 'react'

interface BooleanAnswerProps {
	onAnswerChange: (answer: boolean) => void
	correctAnswer?: boolean
	showCorrectAnswer?: boolean
}

const BooleanAnswer = ({ onAnswerChange, correctAnswer, showCorrectAnswer }: BooleanAnswerProps) => {
	const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)

	const handleAnswerChange = (answer: boolean) => {
		setSelectedAnswer(answer)
		onAnswerChange(answer)
	}

	const getButtonStyle = (value: boolean) => {
		const baseStyle = "px-6 py-3 rounded-lg font-medium transition-colors"
		
		if (showCorrectAnswer && correctAnswer !== undefined) {
			if (value === correctAnswer) {
				return `${baseStyle} bg-green-500 text-white`
			} else if (selectedAnswer === value && value !== correctAnswer) {
				return `${baseStyle} bg-red-500 text-white`
			}
		}
		
		if (selectedAnswer === value) {
			return `${baseStyle} bg-blue-500 text-white`
		}
		
		return `${baseStyle} bg-gray-200 text-gray-700 hover:bg-gray-300`
	}

	return (
		<div className="flex gap-4">
			<button
				onClick={() => handleAnswerChange(true)}
				className={getButtonStyle(true)}
			>
				True
			</button>
			<button
				onClick={() => handleAnswerChange(false)}
				className={getButtonStyle(false)}
			>
				False
			</button>
		</div>
	)
}

export default BooleanAnswer
