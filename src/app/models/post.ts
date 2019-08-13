
export interface PostPreview extends PostBase {
    img: any;
    brief?: string;
}

export interface PostInfo extends PostBase {
    article: string;
}

interface PostBase {
    title: string;
    createDate: Date;
}