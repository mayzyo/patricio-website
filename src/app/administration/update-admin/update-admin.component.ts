import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from 'src/app/models/Update';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Status } from '../status';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Update> = {};
  current: Update;
  thumbnail = { status: Status.NONE || '', value: null };

  readonly selection$ = this.updates.results$;

  constructor(
    private http: HttpClient,
    private updates: UpdateService,
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

      this.http.post('/api/updates/previews', file, { responseType: 'text' }).subscribe(
        res => {
          this.thumbnail.status = res ? file.name : Status.FAIL;
          this.thumbnail.value = res;
        }, 
        (err: unknown) => {
          this.resetFile(this.thumbnail);
          alert(`Something Went Wrong! ${err}`);
        },
        () => this.submitting = false
      );
    }
  }

  onSelect(update: Update) {
    if(this.current && this.current.id == update.id) {
      this.form.resetForm();
      this.current = null;
      this.resetFile(this.thumbnail);
      return;
    }

    this.form.resetForm({ ...update, date: update.date && new Date(update.date).toISOString().split('T')[0] });
    this.current = { ...update };
    this.resetFile(this.thumbnail, update.thumbnail);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, thumbnail: this.thumbnail.value };
      this.current.date = this.current.date || new Date();

      var method: Observable<unknown>;
      if(this.current.id)
        method = this.http.put(`/api/updates/${this.current.id}`, this.current);
      else
        method = this.http.post('/api/updates', this.current);

      method.subscribe(
        () => {
            this.form.reset();
            this.current = null;
            this.resetFile(this.thumbnail);
        }, 
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.updates.refresh();
        }
      );
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Announcement?`)) {
      this.submitting = true;
      this.http.delete(`/api/updates/${this.current.id}`).subscribe(
        () => {
          this.form.reset();
          this.current = null;
          this.resetFile(this.thumbnail);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.updates.refresh();
        }
      )
    }
  }

  onScroll() {
    this.updates.load();
  }

  private resetFile(file: { status: Status | string, value: string }, value?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
  }
}
