export type Announcement = AnnouncementBase | EventAnnouncement;

export interface EventAnnouncement extends AnnouncementBase {
    type: 'Event';
    img: any;
}

interface AnnouncementBase {
    title: string;
    description: string;
    type?: 'Event';
}