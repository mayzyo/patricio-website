import { Timestamp } from "@angular/fire/firestore";

export interface Update {
	id: string;

	title: string;

	description: string;

	link: string;

	thumbnail: string;

	date: Timestamp;
}
