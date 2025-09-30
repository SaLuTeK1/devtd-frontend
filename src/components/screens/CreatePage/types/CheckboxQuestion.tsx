import React, { useEffect } from 'react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import CheckboxOptionItem from './CheckboxOptionItem'
import { QuizFormValues } from '@/shared/schemas/quiz.schema'

type Props = {
	control: Control<QuizFormValues>
	index: number
}

const CheckboxQuestion: React.FC<Props> = ({ control, index }) => {
	const { register, trigger, formState } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${index}.options` as const
	})

	return (
		<div className='flex flex-col gap-2'>
			<input
				className='border rounded px-3 py-2 border-card'
				placeholder='Prompt'
				{...register(`questions.${index}.prompt` as const)}
			/>
			<div className='flex gap-2'>
				<Button
					onClick={() => {
						append({ label: '', isCorrect: false })
						void trigger(`questions.${index}` as const)
					}}
				>
					Add Option
				</Button>
			</div>
			{fields.map((field, oIndex) => (
				<CheckboxOptionItem
					key={field.id}
					control={control}
					qIndex={index}
					oIndex={oIndex}
					onRemove={() => {
						remove(oIndex)
						void trigger(`questions.${index}` as const)
					}}
				/>
			))}
			{Array.isArray(formState.errors?.questions) &&
				formState.errors?.questions?.[index]?.options && (
					<span className='text-red-600 text-sm'>
						{String(
							(formState.errors.questions as any)[index]?.options
								?.message ?? 'Invalid options'
						)}
					</span>
				)}
		</div>
	)
}

export default CheckboxQuestion
