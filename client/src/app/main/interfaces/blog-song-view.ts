import { Observable } from "rxjs";
import { Song } from "../../models/song";

export interface BlogSongView extends Song {
    cover$: Observable<any>
    youtubeSanitized?: string;
    vimeoSanitized?: string;
    bilibiliSanitized?: string;
}