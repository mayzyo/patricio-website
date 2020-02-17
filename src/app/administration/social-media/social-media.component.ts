import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, share, tap, switchMap, take } from 'rxjs/operators';
import { Owner } from 'src/app/models/Owner';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { NgForm } from '@angular/forms';
import { Subject, Subscription, merge, of } from 'rxjs';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  current: SocialMedia;
  model: { type?: string, link?: string } = {};

  readonly updateSocialMedia$ = new Subject();
  readonly socialMedia$ = merge(
    of(null),
    this.updateSocialMedia$
  ).pipe(
    switchMap(() => this.http.get<Owner>('/api/profile')),
    pluck<Owner, SocialMedia>('socialMedia'),
    tap(res => this.current = res),
    map(res => Object.keys(res)
      .filter(key => key != 'biography' && key != 'portrait' && key != 'id' && key != 'ownerId')
      .reduce((acc, key) => [ ...acc, {
        label: key,
        value: res[key],
      }], [])
    ),
    share(),
  );

  readonly selection$ = this.socialMedia$.pipe(
    map(res => res.filter(el => el.value != null))
  );

  readonly options$ = this.socialMedia$.pipe(
    map(res => res.filter(el => el.value == null).map(el => el.label)),
    tap(res => this.model.type = res[0]),
  );

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  addOptions(options: string[]) {
    return this.model.type == null || options.includes(this.model.type) ? options : [ ...options, this.model.type ];
  }

  onSelect(type: string, link: string) {
    this.form.resetForm({ type, link });
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current[this.model.type] = this.model.link;

      this.http.put('/api/profile/media', this.current).subscribe(res => {
        this.form.resetForm();
        this.submitting = false;
        this.updateSocialMedia$.next();
      });
    }
  }
}
