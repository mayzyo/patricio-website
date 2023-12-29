import { faker } from '@faker-js/faker';
import { Timestamp } from '@angular/fire/firestore';
import { Blog } from '../../app/models/blog';

export const generateBlog = (): Blog => ({
    id: faker.string.uuid(),
    content: faker.lorem.paragraphs(6),
    title: faker.lorem.sentence(),
    date: Timestamp.fromDate(faker.date.past())
})

export const generateBlogs = (size = 10) => faker.helpers.multiple(generateBlog, { count: size })