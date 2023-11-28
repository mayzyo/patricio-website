import { Timestamp } from "@angular/fire/firestore";

export interface FeedItem {
	id?: string;

	title: string;

	description?: string;

	link?: string;

	thumbnail?: string;

	date: Timestamp;

	// Necessary because firestore disallow multiple inequality constraints
	// Essentially when you want a link != null AND date < today,
	// that's two "where" both NOT USING "=="
	isEvent: boolean;
}
