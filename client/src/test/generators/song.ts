import { faker } from '@faker-js/faker';
import { Timestamp } from '@angular/fire/firestore';
import { Song } from '../../app/models/song';

export const generateSong = (): Song => ({
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    genre: faker.lorem.word(),
    date: Timestamp.fromDate(faker.date.past()),
    thumbnail: faker.image.avatar(),
    soundCloud: faker.internet.url(),
    coverId: faker.string.uuid(),
    audioId: faker.string.uuid(),
    favourite: faker.datatype.boolean(),
    articleId: faker.string.uuid(),
})

export const generateSongs = (size = 10) => faker.helpers.multiple(generateSong, { count: size })

export const generateAudio = () => 'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_g_1st_mvt.ogg/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_g_1st_mvt.ogg.mp3';