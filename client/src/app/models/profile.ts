import { Biography } from "./biography";
import { EmailConfig } from "./email-config";
import { SocialMedia } from "./social-media";

export interface Profile extends SocialMedia, Biography, EmailConfig {
    id?: string;
}
