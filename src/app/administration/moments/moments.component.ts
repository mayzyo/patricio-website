import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Moment } from 'src/app/models/Moment';
import { Status } from '../status';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, map, scan, withLatestFrom } from 'rxjs/operators';
import { ContentService } from 'src/app/services/image.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.scss']
})
export class MomentsComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Moment> = {};
  image = { status: Status.NONE || '', value: null, preview: null };
  current: Moment;

  readonly updateSelection$ = new BehaviorSubject<number>(1);
  readonly selection$ = this.updateSelection$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Moment[]>('/api/media/moments', { params: res })),
    // withLatestFrom(this.updateSelection$),
    // scan<unknown, Moment[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), new Array<Moment>()),
  );

  constructor(
    private http: HttpClient,
    private contents: ContentService,
  ) { }

  ngOnInit() {
  }

  progressState(status: Status | string) {
    switch(status) {
      case Status.UPLOAD:
        return 'infinite bg-success'
      case Status.FAIL:
        return 'w-100 bg-warning'
      case Status.NONE:
        return ''
      default:
        return 'w-100 bg-success'
    }
  }

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.submitting = true;
      this.image.status = Status.UPLOAD;

      this.http.post('/api/media/images', file, { responseType: 'text' }).subscribe(res => {
        this.image.status = res ? file.name : Status.FAIL;
        this.image.value = res;
        this.contents.readAsBase64$(of(file)).subscribe(res => {
          this.image.preview = res;
        });
        this.submitting = false;
      });
    }
  }

  onSelect(moment: Moment) {
    if(this.current && this.current.id == moment.id) {
      this.form.resetForm();
      this.current = null;
      this.resetFile(this.image);
      return;
    }

    this.form.resetForm(moment);
    this.current = { ...moment };
    this.resetFile(this.image, moment.imageKey, moment.thumbnail);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, imageKey: this.image.value };

      (this.current.id 
        ? this.http.put(`/api/media/moments/${this.current.id}`, this.current) 
        : this.http.post('/api/media/moments', this.current)
      ).subscribe(res => {
        this.form.resetForm();
        this.current = null;
        this.resetFile(this.image);

        this.submitting = false;
        this.updateSelection$.next(1);
      });
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Photo?`)) {
      this.submitting = true;
      this.http.delete(`/api/media/moments/${this.current.id}`).subscribe(res => {
        this.form.resetForm();
        this.current = null;
        this.resetFile(this.image);

        this.submitting = false;
        this.updateSelection$.next(1);
      })
    }
  }

  onScroll() {
    this.updateSelection$.next(this.updateSelection$.value + 1);
  }

  private resetFile(file: { status: Status | string, value: string, preview: string }, value?: string, preview?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
    file.preview = preview || null;
  }
}
