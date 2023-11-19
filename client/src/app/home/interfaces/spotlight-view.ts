import { Song } from "../../models/song";

export interface SpotlightView extends Song {
    url: string;
}