import { faker } from '@faker-js/faker';
import { FeedItem } from '../../app/models/feed-item';
import { Timestamp } from '@angular/fire/firestore';

export const generateFeedItem = (): FeedItem => ({
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    link: faker.internet.url(),
    thumbnail: faker.image.avatar(),
    date: Timestamp.fromDate(Math.random() > 0.9 ? faker.date.soon() : faker.date.past())
});

export const generateFeed = (size = 10) => faker.helpers.multiple(generateFeedItem, { count: size });