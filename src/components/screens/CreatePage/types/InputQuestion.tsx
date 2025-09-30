import React from 'react'
import {
	Control,
	FieldArrayPath,
	useFieldArray,
	useFormContext
} from 'react-hook-form'

import { Button } from '@/components/ui/button'

import { QuizFormValues } from '@/shared/schemas/quiz.schema'

type Props = {
	control: Control<QuizFormValues>
	index: number
}

const InputQuestion: React.FC<Props> = ({ control, index }) => {
	const { register, trigger, formState } = useFormContext<QuizFormValues>()

	const path = `questions.${index}.acceptableAnswers` as const

	const { fields, append, remove } = useFieldArray({
		control,
		name: path as unknown as FieldArrayPath<QuizFormValues>
	})

	return (
		<div className='flex flex-col gap-2'>
			<input
				className='border rounded px-3 py-2 border-card'
				placeholder='Prompt'
				{...register(`questions.${index}.prompt` as const)}
			/>
			<div className='flex flex-col gap-2'>
				<div className='text-sm text-muted-foreground'>
					Acceptable answers
				</div>
				{fields.map((field, ansIdx) => (
					<div key={field.id} className='flex items-center gap-2'>
						<input
							className='border rounded px-3 py-2'
							placeholder={`Answer ${ansIdx + 1}`}
							{...register(
								`questions.${index}.acceptableAnswers.${ansIdx}` as const
							)}
						/>
						<Button
							type='button'
							onClick={async () => {
								remove(ansIdx)
								await trigger(
									`questions.${index}.acceptableAnswers`
								)
							}}
						>
							Remove
						</Button>
					</div>
				))}
				{formState.errors?.questions &&
					Array.isArray(formState.errors.questions) && (
						<span className='text-red-600 text-sm'>
							{String(
								(formState.errors.questions as any)[index]
									?.acceptableAnswers?.message ?? ''
							)}
						</span>
					)}
				<Button
					type='button'
					onClick={async () => {
						append('' as any)
						await trigger(`questions.${index}.acceptableAnswers`)
					}}
				>
					Add answer
				</Button>
			</div>
		</div>
	)
}

export default InputQuestion
