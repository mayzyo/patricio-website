import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DateConverter } from '../../shared/classes/date-converter';
import { Photo } from '../../models/photo';

@Injectable()
export class PhotoFormService {
    readonly form = this.fb.group({
        id: [''],
        thumbnail: [''],
        description: [''],
        date: ['', Validators.required],
        imageId: [''],
    });

    constructor(private fb: FormBuilder, private firestore: Firestore) { }

    assign(feed: Photo): void {
        this.form.markAsPristine();
        
        this.form.setValue({
            id: feed.id ?? '',
            thumbnail: feed.thumbnail ?? '',
            description: feed.description ?? '',
            date: DateConverter.toInput(feed.date.toDate()),
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
}
