import { faker } from '@faker-js/faker';
import { Timestamp } from '@angular/fire/firestore';
import { Photo } from '../../app/models/photo';

export const generatePhoto = (): Photo => ({
    id: faker.string.uuid(),
    thumbnail: faker.image.avatar(),
    description: faker.lorem.paragraph(),
    date: Timestamp.fromDate(faker.date.past()),
    imageId: faker.string.uuid()
})

export const generatePhotos = (size = 10) => faker.helpers.multiple(generatePhoto, { count: size })