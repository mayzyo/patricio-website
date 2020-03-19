import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Moment } from 'src/app/models/Moment';
import { Status } from '../status';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { MomentService } from 'src/app/services/moment.service';

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

  readonly selection$ = this.moments.results$;

  constructor(
    private http: HttpClient,
    private contents: ContentService,
    private moments: MomentService,
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

      this.http.post('/api/media/images', file, { responseType: 'text' }).subscribe(
        res => {
          this.image.status = res ? file.name : Status.FAIL;
          this.image.value = res;
          this.contents.readAsBase64$(of(file)).subscribe(res => {
            this.image.preview = res;
          });
        },
        (err: unknown) => {
          this.resetFile(this.image);
          alert(`Something Went Wrong! ${err}`);
        },
        () => this.submitting = false
      );
    }
  }

  onSelect(moment: Moment) {
    if(this.current && this.current.id == moment.id) {
      this.form.resetForm();
      this.current = null;
      this.resetFile(this.image);
      return;
    }

    this.form.resetForm({ ...moment, date: moment.date && new Date(moment.date).toISOString().split('T')[0] });
    this.current = { ...moment };
    this.resetFile(this.image, moment.imageKey, moment.thumbnail);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, imageKey: this.image.value };
      this.current.date = this.current.date || new Date();

      var method: Observable<unknown>;
      if(this.current.id)
        method = this.http.put(`/api/media/moments/${this.current.id}`, this.current);
      else
        method = this.http.post('/api/media/moments', this.current);

      method.subscribe(
        () => {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.image);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.moments.refresh();
        }
      );
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Photo?`)) {
      this.submitting = true;
      this.http.delete(`/api/media/moments/${this.current.id}`).subscribe(
        () => {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.image);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.moments.refresh();
        }
      );
    }
  }

  onScroll() {
    this.moments.load();
  }

  private resetFile(file: { status: Status | string, value: string, preview: string }, value?: string, preview?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
    file.preview = preview || null;
  }
}
