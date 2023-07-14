import { Timestamp } from "@angular/fire/firestore";

export interface Update {
	id: number;

	title: string;

	description: string;

	link: string;

	thumbnail: string;

	date: Timestamp;
}
