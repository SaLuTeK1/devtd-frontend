import React from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'

import { QuizFormValues } from '@/shared/schemas/quiz.schema'

type Props = {
	control: Control<QuizFormValues>
	index: number
}

const BooleanQuestion: React.FC<Props> = ({ control, index }) => {
	const { register } = useFormContext()
	return (
		<div className='flex flex-col gap-2'>
			<input
				className='border rounded px-3 py-2 border-card'
				placeholder='Prompt'
				{...register(`questions.${index}.prompt` as const)}
			/>
			<Controller
				control={control}
				name={`questions.${index}.correctBoolean` as const}
				render={({ field }) => (
					<div className='flex gap-4 items-center'>
						<label className='flex items-center gap-2'>
							<input type='radio' checked={field.value === true} onChange={() => field.onChange(true)} />
							<span>True</span>
						</label>
						<label className='flex items-center gap-2'>
							<input type='radio' checked={field.value === false} onChange={() => field.onChange(false)} />
							<span>False</span>
						</label>
					</div>
				)}
			/>
		</div>
	)
}

export default BooleanQuestion

