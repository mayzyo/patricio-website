import { paths } from "../shared/backend.api";

export type Post = paths["/Posts"]["get"]["responses"][200]["text/plain"][number];
export type Article = paths["/Articles"]["get"]["responses"][200]["text/plain"][number];
export type Song = paths["/Songs"]["get"]["responses"][200]["text/plain"][0];