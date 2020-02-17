import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from 'src/app/models/Update';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom, scan } from 'rxjs/operators';
import { Status } from '../status';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Update> = {};
  current: Update;
  thumbnail = { status: Status.NONE || '', value: null };

  readonly updateSelection$ = new BehaviorSubject<number>(1);
  readonly selection$ = this.updateSelection$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Update[]>('/api/updates', { params: res })),
    // withLatestFrom(this.updateSelection$),
    // scan<unknown, Update[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), new Array<Update>()),
  );

  constructor(
    private http: HttpClient,
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

  onPreviewChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.submitting = true;
      this.thumbnail.status = Status.UPLOAD;

      this.http.post('/api/updates/covers', file, { responseType: 'text' }).subscribe(res => {
        this.thumbnail.status = res ? file.name : Status.FAIL;
        this.thumbnail.value = res;
        this.submitting = false;
      });
    }
  }

  onSelect(update: Update) {
    if(this.current && this.current.id == update.id) {
      this.form.resetForm();
      this.current = null;
      this.resetFile(this.thumbnail);
      return;
    }

    this.form.reset(update);
    this.current = { ...update };
    this.resetFile(this.thumbnail, update.thumbnail);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, thumbnail: this.thumbnail.value };

      (this.current.id 
        ? this.http.put(`/api/updates/${this.current.id}`, this.current) 
        : this.http.post('/api/updates', this.current)
      ).subscribe(res => {
        if(res) {
          this.form.reset();
          this.current = null;
          this.resetFile(this.thumbnail);
  
          this.submitting = false;
          this.updateSelection$.next(1);
        } else {
          alert('Not Authorised! Piss off');
        }
      }, err => alert(`NO!${err}`));
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Announcement?`)) {
      this.submitting = true;
      this.http.delete(`/api/updates/${this.current.id}`).subscribe(res => {
        this.form.reset();
        this.current = null;
        this.resetFile(this.thumbnail);

        this.submitting = false;
        this.updateSelection$.next(1);
      })
    }
  }

  onScroll() {
    this.updateSelection$.next(this.updateSelection$.value + 1);
  }

  private resetFile(file: { status: Status | string, value: string }, value?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
  }
}
