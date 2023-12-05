import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Song } from '../../models/song';
import { DateConverter } from '../../shared/classes/date-converter';

@Injectable()
export class SongFormService {
    readonly form = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        genre: ['', Validators.required],
        date: ['', Validators.required],
        soundCloud: [''],
        youtube: [''],
        vimeo: [''],
        bilibili: [''],
        thumbnail: [''],
        spotlight: [false],
        coverId: [''],
        audioId: ['']
    });

    constructor(private fb: FormBuilder, private firestore: Firestore) {
        this.respondToYoutubeLink();
        this.respondToVimeoLink();
        this.respondToBilibiliLink();
    }

    assign(song: Song): void {
        this.form.markAsPristine();

        this.form.setValue({
            id: song.id ?? '',
            title: song.title,
            genre: song.genre,
            date: DateConverter.toInput(song.date.toDate()),
            soundCloud: song.soundCloud ?? '',
            youtube: song.youtube ?? '',
            bilibili: song.bilibili ?? '',
            vimeo: song.vimeo ?? '',
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
            soundCloud: this.form.get('soundCloud')?.value ?? '',
            youtube: this.form.get('youtube')?.value ?? '',
            vimeo: this.form.get('vimeo')?.value ?? '',
            bilibili: this.form.get('bilibili')?.value ?? '',
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

    private respondToVimeoLink(): void {
        const vimeoCtrl = this.form.get('vimeo');
        vimeoCtrl?.valueChanges.pipe(
            filter(res => res != null),
            takeUntilDestroyed()
        ).subscribe(res => {
            if(res != null) {
                if(res.includes('iframe')) {
                    const startIndex = res.indexOf('src="') + 5;
                    const endIndex = res.indexOf('"', startIndex);
                    const url = res.slice(startIndex, endIndex);

                    if(url != res) {
                        vimeoCtrl.setValue(url);
                    }
                }
            }
        })
    }

}
