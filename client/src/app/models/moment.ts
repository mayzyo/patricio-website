import { Timestamp } from "@angular/fire/firestore";

export interface Moment {
	id: string;

	thumbnail: string;

	description: string;

	date: Timestamp;

	imageKey: string;
}
