import { faker } from '@faker-js/faker';
import { Quote } from '../../app/models/quote';

export const generateQuote = (): Quote => ({
    message: faker.lorem.sentence(),
    author: faker.person.fullName(),
})

export const generateQuotes = (size = 10) => faker.helpers.multiple(generateQuote, { count: size })