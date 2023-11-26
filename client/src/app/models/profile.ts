import { Biography } from "./biography";
import { SocialMedia } from "./social-media";

export interface Profile extends SocialMedia, Biography {
    id?: string;
    
    email: string;
}
