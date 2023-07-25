import { SocialMedia } from "./social-media"

export interface Profile {
    id: string;
    
    email: string;

    biography: string;

    socialMedia: SocialMedia;
}
