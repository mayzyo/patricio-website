import { Article } from './Article';

export interface Music {

	id: number

	title: string

	genre: string

	date: Date

	thumbnail: string

	soundCloud: string

	coverKey: string

	audioKey: string

	favourite: boolean

	articleId: number

	article: Article
}
