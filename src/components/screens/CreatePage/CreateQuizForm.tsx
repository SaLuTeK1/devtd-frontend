'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { quizzesService } from '@/services/quizzes.service'

import QuestionsFieldArray from './QuestionsFieldArray'
import { QuestionTypeEnum } from '@/shared/enums/question-type.enum'
import { QuizFormValues, quizSchema } from '@/shared/schemas/quiz.schema'

const defaultValues: QuizFormValues = {
	title: '',
	questions: []
}

const CreateQuizForm = () => {
	const form = useForm<QuizFormValues>({
		resolver: zodResolver(quizSchema),
		defaultValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldUnregister: true
	})

	const { control, handleSubmit, reset, register, formState } = form
	const { errors, isSubmitting, isValid, isValidating } = formState
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions'
	})

	const onAddQuestion = (type: QuestionTypeEnum) => {
		if (type === QuestionTypeEnum.BOOLEAN) {
			append({ type, prompt: '', correctBoolean: false })
		} else if (type === QuestionTypeEnum.INPUT) {
			append({ type, prompt: '', acceptableAnswers: [{ value: '' }] })
		} else {
			append({ type, prompt: '', options: [] })
		}
	}

	const onSubmit = async (values: QuizFormValues) => {
		try {
			await quizzesService.createQuiz({
				title: values.title,
				questions: values.questions.map((q, idx) => ({
					type: q.type,
					prompt: q.prompt,
					order: idx + 1,
					correctBoolean:
						q.type === QuestionTypeEnum.BOOLEAN
							? Boolean(q.correctBoolean)
							: null,
					acceptableAnswers:
						q.type === QuestionTypeEnum.INPUT
							? q.acceptableAnswers
									.map(a => a.value)
									.filter(Boolean)
							: null,
					options:
						q.type === QuestionTypeEnum.CHECKBOX
							? q.options!.map((o, oIdx) => ({
									label: o.label,
									isCorrect: o.isCorrect,
									order: oIdx + 1
								}))
							: null
				}))
			})
			toast('Quiz created')
			reset(defaultValues)
		} catch (e) {
			console.error(e)
			toast('Failed to create quiz')
		}
	}

	return (
		<FormProvider {...form}>
			<div className=' p-4 flex flex-col gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>Create Quiz</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1'>
							<input
								placeholder='Quiz title'
								className='border rounded px-3 py-2 border-card bg-white'
								{...register('title')}
							/>
							{errors.title?.message && (
								<span className='text-red-600 text-sm'>
									{errors.title.message}
								</span>
							)}
						</div>

						<QuestionsFieldArray
							control={control}
							fields={fields}
							append={onAddQuestion}
							remove={remove}
							errors={errors}
						/>
					</CardContent>
					<CardFooter className='justify-between'>
						<Button
							variant={'outlined'}
							onClick={handleSubmit(onSubmit)}
							disabled={isSubmitting || !isValid || isValidating}
						>
							{isSubmitting ? 'Submitting...' : 'Create Quiz'}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</FormProvider>
	)
}

export default CreateQuizForm
