import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Song } from '../../models/song';
import { DateConverter } from '../../shared/classes/date-converter';

@Injectable()
export class SongFormService {
    readonly form = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        genre: ['', Validators.required],
        date: [''],
        soundCloud: [''],
        thumbnail: [''],
        spotlight: [false],
        coverId: [''],
        audioId: ['']
    });

    constructor(private fb: FormBuilder, private firestore: Firestore) { }

    assign(song: Song): void {
        this.form.setValue({
            id: song.id ?? '',
            title: song.title,
            genre: song.genre,
            date: DateConverter.toInput(song.date.toDate()),
            soundCloud: song.soundCloud ?? '',
            thumbnail: song.thumbnail ?? '',
            spotlight: song.spotlight,
            coverId: song.coverId ?? '',
            audioId: song.audioId
        });
    }

    save(): Observable<Song> {
        const rawDate = this.form.get('date')?.value ?? '';
        const date = rawDate == '' ? new Date() : new Date(rawDate);

        const model: Song = {
            title: this.form.get('title')?.value ?? '',
            genre: this.form.get('genre')?.value ?? '',
            date: Timestamp.fromDate(date),
            thumbnail: this.form.get('thumbnail')?.value ?? '',
            spotlight: this.form.get('spotlight')?.value ?? false,
            coverId: this.form.get('coverId')?.value ?? '',
            audioId: this.form.get('audioId')?.value ?? '',
        };

        const id = this.form.get('id')?.value;

        if(id) {
            const targetDoc = doc(this.firestore, 'songs', id);
            return from(updateDoc(targetDoc, model as any)).pipe(
                map(() => model),
                take(1)
            );
        }

        const targetCol = collection(this.firestore, 'songs');
        return from(addDoc(targetCol, model)).pipe(
            map(() => model),
            take(1)
        );
    }

    remove(id: string): Observable<void> {
        const targetDoc = doc(this.firestore, 'songs', id);
        return from(deleteDoc(targetDoc)).pipe(
            take(1)
        );
    }

    clear() {
        this.form.reset();
    }
}
