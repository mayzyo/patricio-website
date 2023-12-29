import { Observable } from "rxjs";
import { Song } from "../../models/song";

export interface SpotlightView extends Song {
    cover$: Observable<any>
}