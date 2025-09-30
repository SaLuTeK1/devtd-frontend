'use client'

import { Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Card } from '@/components/ui/card'

import { IQuiz } from '@/shared/interfaces/quiz.interface'

interface IProps {
	quiz: IQuiz
	handleDelete: (id: string) => void
}

const QuizzesCard = ({ quiz, handleDelete }: IProps) => {
	const { id, title, questions } = quiz

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		handleDelete(id)
	}

	return (
		<Link href={`/quizzes/${id}`}>
			<Card
				className={
					'hover:bg-card/50 px-5 min-h-[250px] justify-between relative items-center '
				}
			>
				<button
					type='button'
					aria-label='Delete quiz'
					onClick={handleClick}
					className='cursor-pointer z-20 p-2 absolute right-1 top-1 opacity-80 hover:opacity-100 bg-white hover:bg-red-100 rounded-full hover:text-red-800 transition'
				>
					<Trash size={20} />
				</button>

				<span className={'text-2xl font-bold'}>{title}</span>
				<span className={'font-semibold'}>
					Total questions: {questions?.length}
				</span>
			</Card>
		</Link>
	)
}

export default QuizzesCard
