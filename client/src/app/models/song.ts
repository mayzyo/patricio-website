import { Timestamp } from "@angular/fire/firestore";

export interface Song {
	id: string;

	title: string;

	genre: string;

	date: Timestamp;

	thumbnail: string;

	soundCloud: string;

	coverId: string;

	audioId: string;

	favourite: boolean;

	articleId: string;
}
