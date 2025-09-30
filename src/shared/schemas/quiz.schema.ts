import { z } from 'zod'

import { QuestionTypeEnum } from '@/shared/enums/question-type.enum'

export const checkboxOptionSchema = z.object({
	label: z.string().trim().min(1, 'Option label is required'),
	isCorrect: z.boolean().default(false)
})

export const questionBaseSchema = z.object({
	type: z.nativeEnum(QuestionTypeEnum),
	prompt: z.string().trim().min(1, 'Question prompt is required')
})

export const booleanQuestionSchema = questionBaseSchema.extend({
	type: z.literal(QuestionTypeEnum.BOOLEAN),
	correctBoolean: z.boolean().optional()
})

export const inputQuestionSchema = questionBaseSchema.extend({
	type: z.literal(QuestionTypeEnum.INPUT),
	acceptableAnswers: z
		.array(z.string())
		.min(1, 'Provide at least one acceptable answer')
})

export const checkboxQuestionSchema = questionBaseSchema
	.extend({
		type: z.literal(QuestionTypeEnum.CHECKBOX),
		options: z
			.array(checkboxOptionSchema)
			.min(2, 'Provide at least two options')
	})
	.superRefine((q, ctx) => {
		if (!q.options.some(o => o.isCorrect)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'At least one option must be correct',
				path: ['options']
			})
		}
	})

export const questionSchema = z.discriminatedUnion('type', [
	booleanQuestionSchema,
	inputQuestionSchema,
	checkboxQuestionSchema
])

export const quizSchema = z.object({
	title: z.string().trim().min(1, 'Quiz title is required'),
	questions: z.array(questionSchema).min(1, 'Add at least one question')
})

export type QuizFormValues = z.infer<typeof quizSchema>
