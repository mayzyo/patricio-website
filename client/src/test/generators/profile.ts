import { faker, fakerZH_CN } from '@faker-js/faker';
import { Profile } from '../../app/models/profile';

export const generateProfile = (): Profile => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    biographyEn: faker.lorem.paragraphs(6),
    biographyCh: Array(6 * 12).fill(null).map(() => fakerZH_CN.location.streetAddress()).join(),
    facebook: faker.internet.url(),
    linkedIn: faker.internet.url(),
    instagram: faker.internet.url(),
    weChatQrCode: faker.image.avatar(),
    weibo: faker.internet.url(),
})