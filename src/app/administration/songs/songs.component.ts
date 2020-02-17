import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Music } from 'src/app/models/Music';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Status } from '../status';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Music> = {};
  current: Music;
  cover = { status: Status.NONE || '', value: null };
  audio = { status: Status.NONE || '', value: null };

  readonly updateSelection$ = new BehaviorSubject<number>(1);
  readonly selection$ = this.updateSelection$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res }))
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

  onCoverChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.submitting = true;
      this.cover.status = Status.UPLOAD;

      this.http.post('/api/musics/covers', file, { responseType: 'text' }).subscribe(res => {
        this.cover.status = res ? file.name : Status.FAIL;
        this.cover.value = res;
        this.submitting = false;
      });
    }
  }

  onAudioChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.submitting = true;
      this.audio.status = Status.UPLOAD;

      this.http.post('/api/musics/audios', file, { responseType: 'text' }).subscribe(res => {
        this.audio.status = res ? file.name : Status.FAIL;
        this.audio.value = res;
        this.submitting = false;
      });
    }
  }

  onSelect(music: Music) {
    if(this.current && this.current.id == music.id) {
      this.form.resetForm();
      this.current = null;
      this.resetFile(this.cover);
      this.resetFile(this.audio);
      return;
    }

    this.form.resetForm(music);
    this.current = { ...music };
    this.resetFile(this.cover, music.coverKey);
    this.resetFile(this.audio, music.audioKey);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, coverKey: this.cover.value, audioKey: this.audio.value };

      (this.current.id 
        ? this.http.put(`/api/musics/${this.current.id}`, this.current) 
        : this.http.post('/api/musics', this.current)
      ).subscribe(res => {
        if(res) {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.cover);
          this.resetFile(this.audio);
          
          this.submitting = false;
          this.updateSelection$.next(1);
        } else {
          alert('Not Authorised! Piss off');
        }
      }, err => alert(`NO!${err}`));
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Song?`)) {
      this.submitting = true;
      this.http.delete(`/api/musics/${this.current.id}`).subscribe(res => {
        this.form.resetForm();
        this.current = null;
        this.resetFile(this.cover);
        this.resetFile(this.audio);

        this.submitting = false;
        this.updateSelection$.next(1);
      })
    }
  }

  private resetFile(file: { status: Status | string, value: string }, value?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
  }
}