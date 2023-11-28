import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DateConverter } from '../../shared/classes/date-converter';
import { FeedItem } from '../../models/feed-item';

@Injectable()
export class FeedFormService {
    readonly form = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        description: [''],
        date: [''],
        link: [''],
        thumbnail: [''],
    });

    constructor(private fb: FormBuilder, private firestore: Firestore) { }

    assign(feed: FeedItem): void {
        this.form.setValue({
            id: feed.id ?? '',
            title: feed.title,
            description: feed.description ?? '',
            date: DateConverter.toInput(feed.date.toDate()),
            link: feed.link ?? '',
            thumbnail: feed.thumbnail ?? '',
        });
    }

    save(): Observable<FeedItem> {
        const rawDate = this.form.get('date')?.value ?? '';
        const date = rawDate == '' ? new Date() : new Date(rawDate);

        const model: FeedItem = {
            title: this.form.get('title')?.value ?? '',
            description: this.form.get('description')?.value ?? '',
            date: Timestamp.fromDate(date),
            link: this.form.get('link')?.value ?? '',
            thumbnail: this.form.get('thumbnail')?.value ?? '',
            isEvent: this.form.get('link')?.value == ''
        };

        const id = this.form.get('id')?.value;

        if(id) {
            const targetDoc = doc(this.firestore, 'feed', id);
            return from(updateDoc(targetDoc, model as any)).pipe(
                map(() => model),
                take(1)
            );
        }

        const targetCol = collection(this.firestore, 'feed');
        return from(addDoc(targetCol, model)).pipe(
            map(() => model),
            take(1)
        );
    }

    remove(id: string): Observable<void> {
        const targetDoc = doc(this.firestore, 'feed', id);
        return from(deleteDoc(targetDoc)).pipe(take(1));
    }

    clear(): void {
        this.form.reset();
    }
}
