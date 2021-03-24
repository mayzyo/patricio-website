import { SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { components, paths } from "../shared/backend.api";

export type BasePost = components["schemas"]["Post"];
export type BaseMedia = components["schemas"]["Media"];
export type BaseSong = components["schemas"]["Song"];
export type BaseAlbum = components["schemas"]["Album"];

export type QuickEvent = Pick<Post, "title" | "created" | "id" | "link" | "thumbnail$">;
export type Article = paths["/Articles"]["get"]["responses"][200]["text/plain"][number];

export interface Media extends BaseMedia {
    url$: Observable<SafeUrl | string>;
}

export interface Post extends BasePost {
    thumbnail$: Observable<SafeUrl | string>;
    gallery?: Media[];
}

export interface Song extends BaseSong {
    coverImage$: Observable<SafeUrl | string>;
    audio$?: Observable<SafeUrl | string>;
}

export type TopSong = components["schemas"]["TopSong"];

export interface Album extends BaseAlbum {
    coverImage$: Observable<SafeUrl | string>;
}
export interface Email {
    address: string;
    message: string;
    title: string;
    template: string;
}

export interface Pagination {
    page: string;
    size: string;
}