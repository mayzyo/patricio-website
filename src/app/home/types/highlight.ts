import { Observable } from "rxjs";

export type Highlight = {
    title: string;
    url: string;
    subtitle?: string;
    image$?: Observable<string>;
}