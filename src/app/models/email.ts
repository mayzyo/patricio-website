export interface Email {
	message: string;

	sender: string;

	purpose: Purpose;

	senderType: Sender;
}

export enum Purpose {
	DEAL,

	OTHER,
}
export enum Sender {
	DIRECTOR,

	MUSICIAN,

	OTHER,
}