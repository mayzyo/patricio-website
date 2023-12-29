import { Observable } from "rxjs";
import { Song } from "../../models/song";

export interface BacklogView extends Song {
    cover$: Observable<any>
}