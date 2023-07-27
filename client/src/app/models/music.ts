import { Timestamp } from "@angular/fire/firestore";
import { Article } from "./article"

export interface Music {
	id: string;

	title: string;

	genre: string;

	date: Timestamp;

	thumbnail: string;

	soundCloud: string;

	coverKey: string;

	audioKey: string;

	favourite: boolean;

	articleId: number;

	article: Article;
}
