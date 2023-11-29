import { Observable } from "rxjs";
import { Song } from "../../models/song";
import { PlayerState } from "../enums/player-state";

export interface BacklogView extends Song {
    url: string;
    state: PlayerState,
    cover$: Observable<any>
}