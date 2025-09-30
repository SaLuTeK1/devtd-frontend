import React from 'react'
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayRemove } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { QuestionTypeEnum } from '@/shared/enums/question-type.enum'
import { QuizFormValues } from '@/shared/schemas/quiz.schema'

import CheckboxQuestion from './types/CheckboxQuestion'
import InputQuestion from './types/InputQuestion'
import BooleanQuestion from './types/BooleanQuestion'

type Props = {
	control: Control<QuizFormValues>
	fields: FieldArrayWithId<QuizFormValues, 'questions', 'id'>[]
	append: (type: QuestionTypeEnum) => void
	remove: UseFieldArrayRemove
	errors: FieldErrors<QuizFormValues>
}

const QuestionsFieldArray: React.FC<Props> = ({ control, fields, append, remove, errors }) => {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex gap-2'>
				<Button variant={'outlined'} onClick={() => append(QuestionTypeEnum.BOOLEAN)}>Add Boolean</Button>
				<Button variant={'outlined'} onClick={() => append(QuestionTypeEnum.INPUT)}>Add Input</Button>
				<Button variant={'outlined'} onClick={() => append(QuestionTypeEnum.CHECKBOX)}>Add Checkbox</Button>
			</div>

			{fields.map((field, index) => (
				<Card key={field.id} className='border bg-purple-100'>
					<CardHeader>
						<CardTitle>Question {index + 1} - {field.type}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-3'>
						{field.type === QuestionTypeEnum.BOOLEAN && (
							<BooleanQuestion control={control} index={index} />
						)}
						{field.type === QuestionTypeEnum.INPUT && (
							<InputQuestion control={control} index={index} />
						)}
						{field.type === QuestionTypeEnum.CHECKBOX && (
							<CheckboxQuestion control={control} index={index} />
						)}
						{errors.questions?.[index]?.prompt?.message && (
							<span className='text-red-600 text-sm'>
								{String(errors.questions?.[index]?.prompt?.message)}
							</span>
						)}
					</CardContent>
					<CardFooter className='justify-between'>
						<div />
						<Button onClick={() => remove(index)}>Remove question</Button>
					</CardFooter>
				</Card>
			))}

			{typeof errors.questions?.message === 'string' && (
				<span className='text-red-600 text-sm'>{errors.questions?.message}</span>
			)}
		</div>
	)
}

export default QuestionsFieldArray

