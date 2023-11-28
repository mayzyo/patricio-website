import { Timestamp } from "@angular/fire/firestore";

export interface FeedItem {
	id?: string;

	title: string;

	description?: string;

	link?: string;

	thumbnail?: string;

	date: Timestamp;
}
