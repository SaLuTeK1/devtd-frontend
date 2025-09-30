import React, { useState } from 'react'

interface InputAnswerProps {
	onAnswerChange: (answer: string) => void
	correctAnswers?: string[]
	showCorrectAnswer?: boolean
	placeholder?: string
}

const InputAnswer = ({ 
	onAnswerChange, 
	correctAnswers = [], 
	showCorrectAnswer = false,
	placeholder = "Type your answer here..."
}: InputAnswerProps) => {
	const [userAnswer, setUserAnswer] = useState('')

	const handleInputChange = (value: string) => {
		setUserAnswer(value)
		onAnswerChange(value)
	}

	const isCorrect = showCorrectAnswer && correctAnswers.length > 0 
		? correctAnswers.some(correct => 
			correct.toLowerCase().trim() === userAnswer.toLowerCase().trim()
		)
		: null

	const getInputStyle = () => {
		const baseStyle = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
		
		if (showCorrectAnswer && isCorrect !== null) {
			if (isCorrect) {
				return `${baseStyle} border-green-500 bg-green-50 focus:ring-green-500`
			} else {
				return `${baseStyle} border-red-500 bg-red-50 focus:ring-red-500`
			}
		}
		
		return `${baseStyle} border-gray-300 focus:ring-blue-500`
	}

	return (
		<div className="space-y-2">
			<input
				type="text"
				value={userAnswer}
				onChange={(e) => handleInputChange(e.target.value)}
				placeholder={placeholder}
				className={getInputStyle()}
				disabled={showCorrectAnswer}
			/>
			{showCorrectAnswer && correctAnswers.length > 0 && (
				<div className="text-sm text-gray-600">
					<span className="font-medium">Correct answers:</span>{' '}
					{correctAnswers.join(', ')}
				</div>
			)}
		</div>
	)
}

export default InputAnswer

