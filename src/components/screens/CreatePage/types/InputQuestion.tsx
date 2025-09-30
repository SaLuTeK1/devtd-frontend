import React from 'react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import { QuizFormValues } from '@/shared/schemas/quiz.schema'

type Props = { control: Control<QuizFormValues>; index: number }

type InputSlice = {
	questions: Array<{
		prompt: string
		acceptableAnswers: { value: string }[]
	}>
}
type AnswersPath = `questions.${number}.acceptableAnswers`

const InputQuestion: React.FC<Props> = ({ control, index }) => {
	const { register, trigger } = useFormContext<QuizFormValues>()
	const name: AnswersPath = `questions.${index}.acceptableAnswers`

	const { fields, append, remove } = useFieldArray<InputSlice, AnswersPath>({
		control: control as unknown as Control<InputSlice>,
		name
	})

	const questionPath = `questions.${index}` as const

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
								`questions.${index}.acceptableAnswers.${ansIdx}.value` as const
							)}
						/>
						<Button
							type='button'
							onClick={async () => {
								remove(ansIdx)
								await trigger(questionPath)
							}}
						>
							Remove
						</Button>
					</div>
				))}

				<Button
					type='button'
					onClick={async () => {
						append({ value: '' })
						await trigger(questionPath)
					}}
				>
					Add answer
				</Button>
			</div>
		</div>
	)
}

export default InputQuestion
