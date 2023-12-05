import { Timestamp } from "@angular/fire/firestore";

export interface Song {
	id?: string;

	title: string;

	genre: string;

	date: Timestamp;

	thumbnail?: string;

	soundCloud?: string;

	youtube?: string;

	vimeo?: string;

	bilibili?: string;

	coverId?: string;

	audioId: string;

	spotlight: boolean;

	blogId?: string;
}
