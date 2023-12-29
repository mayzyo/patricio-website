import { Observable } from "rxjs";

export abstract class ImageConverter {
    static blobToBase64(blob: Blob): Observable<string> {
        return new Observable(subscriber => {
            const reader = new FileReader();
            reader.onloadend = () => {
                subscriber.next(reader.result as string);
                subscriber.complete();
            };
            reader.readAsDataURL(blob);
        });
    }
}