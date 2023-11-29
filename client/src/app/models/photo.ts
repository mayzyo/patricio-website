import { Timestamp } from "@angular/fire/firestore";

export interface Photo {
	id?: string;

	thumbnail: string;

	description?: string;

	date: Timestamp;

	imageId: string;
}
