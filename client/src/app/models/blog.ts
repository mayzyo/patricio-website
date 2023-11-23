import { Timestamp } from "@angular/fire/firestore";

export interface Blog {
	id: string;

	content: string;

	title?: string;

	date: Timestamp;
}