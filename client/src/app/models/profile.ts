import { SocialMedia } from "./social-media"

export interface Profile {
    id: string;
    
    email: string;

    biographyEn: string;

    biographyCh: string;

    facebook?: string;

	linkedIn?: string;

	instagram?: string;

	weChat?: string;

	weibo?: string;
}
