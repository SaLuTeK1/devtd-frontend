import { IBase } from './base.interface'
import { QuestionTypeEnum } from '@/shared/enums/question-type.enum'

export interface IQuiz extends IBase {
	title: string
	questions: IQuestion[]
}

export interface IQuestion extends IBase {
	quizId: number
	type: QuestionTypeEnum
	prompt: string
	order?: number
	correctBoolean: boolean
	acceptableAnswers: string[]
	options: IOption[]
}

export interface IOption {
	id: string
	questionId: string
	label: string
	isCorrect: boolean
	order?: number
}

export interface ICreateQuiz {
	title: string
	questions: ICreateQuestion[]
}

export interface ICreateQuestion {
	type: QuestionTypeEnum
	prompt: string
	order?: number
	correctBoolean?: boolean | null
	acceptableAnswers?: string[] | null
	options?: ICreateOption[] | null
}

export interface ICreateOption {
	label: string
	isCorrect: boolean
	order?: number
}
