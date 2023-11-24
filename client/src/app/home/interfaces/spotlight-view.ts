import { Observable } from "rxjs";
import { Song } from "../../models/song";

export interface SpotlightView extends Song {
    url: string;
    cover$: Observable<any>
}