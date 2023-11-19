import { Song } from "../../models/song";
import { PlayerState } from "../enums/player-state";

export interface BacklogView extends Song {
    url: string;
    state: PlayerState
}