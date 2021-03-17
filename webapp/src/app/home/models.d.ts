import { SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { components, paths } from "../shared/backend.api";

export type Media = components["schemas"]["Media"] & {
    url$: Observable<SafeUrl>
};
export type Post = components["schemas"]["Post"] & {
    thumbnail$: Observable<SafeUrl>,
    gallery?: Media[]
};
export type LatestPost = Pick<Post, "title" | "created" | "id" | "gallery" | "thumbnail$">;
export type Article = paths["/Articles"]["get"]["responses"][200]["text/plain"][number];
export type Song = components["schemas"]["Song"] & {
    background$: Observable<string>
};
export type TopSong = components["schemas"]["TopSong"];