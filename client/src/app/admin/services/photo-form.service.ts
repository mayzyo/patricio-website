import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { DateConverter } from '../../shared/classes/date-converter';
import { Photo } from '../../models/photo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class PhotoFormService {
    readonly form = this.fb.group({
        id: [''],
        thumbnail: [''],
        description: [''],
        date: ['', Validators.required],
        youtube: [''],
        bilibili: [''],
        imageId: [''],
    });

    constructor(private fb: FormBuilder, private firestore: Firestore) {
        this.respondToYoutubeLink();
        this.respondToBilibiliLink();
    }

    assign(feed: Photo): void {
        this.form.markAsPristine();
        
        this.form.setValue({
            id: feed.id ?? '',
            thumbnail: feed.thumbnail ?? '',
            description: feed.description ?? '',
            date: DateConverter.toInput(feed.date.toDate()),
            youtube: feed.youtube ?? '',
            bilibili: feed.bilibili ?? '',
            imageId: feed.imageId ?? '',
        });
    }

    save(): Observable<Photo> {
        const rawDate = this.form.get('date')?.value ?? '';
        const date = rawDate == '' ? new Date() : new Date(rawDate);

        const model: Photo = {
            thumbnail: this.form.get('thumbnail')?.value ?? '',
            description: this.form.get('description')?.value ?? '',
            date: Timestamp.fromDate(date),
            youtube: this.form.get('youtube')?.value ?? '',
            bilibili: this.form.get('bilibili')?.value ?? '',
            imageId: this.form.get('imageId')?.value ?? '',
        };

        const id = this.form.get('id')?.value;

        if(id) {
            const targetDoc = doc(this.firestore, 'photos', id);
            return from(updateDoc(targetDoc, model as any)).pipe(
                map(() => model),
                take(1)
            );
        }

        const targetCol = collection(this.firestore, 'photos');
        return from(addDoc(targetCol, model)).pipe(
            map(() => model),
            take(1)
        );
    }

    remove(id: string): Observable<void> {
        const targetDoc = doc(this.firestore, 'photos', id);
        return from(deleteDoc(targetDoc)).pipe(take(1));
    }

    clear(): void {
        this.form.reset();
    }

    private respondToYoutubeLink(): void {
        const youtubeCtrl = this.form.get('youtube');
        youtubeCtrl?.valueChanges.pipe(
            filter(res => res != null),
            takeUntilDestroyed()
        ).subscribe(res => {
            if(res != null) {
                if(res.includes('iframe')) {
                    const startIndex = res.indexOf('src="') + 5;
                    const endIndex = res.indexOf('"', startIndex);
                    const url = res.slice(startIndex, endIndex);

                    if(url != res) {
                        youtubeCtrl.setValue(url);
                    }
                }
            }
        })
    }

    private respondToBilibiliLink(): void {
        const bilibiliCtrl = this.form.get('bilibili');
        bilibiliCtrl?.valueChanges.pipe(
            filter(res => res != null),
            takeUntilDestroyed()
        ).subscribe(res => {
            if(res != null) {
                if(res.includes('iframe')) {
                    const startIndex = res.indexOf('src="') + 5;
                    const endIndex = res.indexOf('"', startIndex);
                    let url = res.slice(startIndex, endIndex);

                    if(!url.includes('https:')) {
                        url = `https:${url}`;
                    }

                    if(url != res) {
                        bilibiliCtrl.setValue(url);
                    }
                }
            }
        })
    }
}
