import React from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { QuizFormValues } from '@/shared/schemas/quiz.schema'

type Props = {
	control: Control<QuizFormValues>
	qIndex: number
	oIndex: number
	onRemove: () => void
}

const CheckboxOptionItem: React.FC<Props> = ({ control, qIndex, oIndex, onRemove }) => {
	const { register, trigger } = useFormContext()
	return (
		<div className='flex gap-2 items-center'>
			<input
				className='border rounded px-3 py-2'
				placeholder={`Option ${oIndex + 1}`}
				{...register(`questions.${qIndex}.options.${oIndex}.label` as const)}
			/>
			<label className='flex items-center gap-2'>
				<Controller
					control={control}
					name={`questions.${qIndex}.options.${oIndex}.isCorrect` as const}
					render={({ field }) => (
						<input
							type='checkbox'
							checked={!!field.value}
                            onChange={e => {
                                field.onChange(e.target.checked)
                                void trigger(`questions.${qIndex}.options` as const)
                            }}
						/>
					)}
				/>
				<span>Correct</span>
			</label>
			<Button onClick={onRemove}>Remove</Button>
		</div>
	)
}

export default CheckboxOptionItem

