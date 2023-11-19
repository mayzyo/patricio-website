import { faker } from '@faker-js/faker';
import { Feed } from '../../app/models/feed';
import { Timestamp } from '@angular/fire/firestore';

export const generateFeed = (): Feed => ({
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    link: faker.internet.url(),
    thumbnail: faker.image.avatar(),
    date: Timestamp.fromDate(faker.date.soon())
})

export const generateFeeds = (size = 10) => faker.helpers.multiple(generateFeed, { count: size })