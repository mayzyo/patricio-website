import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { Biography } from '../../models/biography';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class BiographyFormService {
    readonly form = this.fb.group({
        biographyEn: ['', Validators.required],
        biographyCh: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private firestore: Firestore, private profile: ProfileService) {
        this.respondToBiography();
        this.profile.refresh();
    }

    update(): Observable<Biography> {
        const model: Biography = {
            biographyEn: this.form.get('biographyEn')?.value ?? '',
            biographyCh: this.form.get('biographyCh')?.value ?? '',
        };

        return this.profile.profile$.pipe(
            map(({ id }) => doc(this.firestore, 'profile', id ?? '')),
            switchMap(targetDoc => from(updateDoc(targetDoc, model as any))),
            map(() => model),
            take(1)
        );
    }

    private respondToBiography(): void {
        this.profile.profile$.pipe(takeUntilDestroyed())
            .subscribe(profile => this.form.setValue({
                biographyEn: profile.biographyEn,
                biographyCh: profile.biographyCh
            }));
    }
}
