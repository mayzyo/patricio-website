import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Music } from 'src/app/models/Music';
import { Observable } from 'rxjs';
import { Status } from '../status';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music-admin',
  templateUrl: './music-admin.component.html',
  styleUrls: ['./music-admin.component.scss']
})
export class MusicAdminComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Music> & { article?: string } = { favourite: false };
  current: Music;
  cover = { status: Status.NONE || '', value: null };
  audio = { status: Status.NONE || '', value: null };

  readonly selection$ = this.musics.results$;

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private musics: MusicService,
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

      this.http.post(`${this.baseUrl}musics/covers`, file, { responseType: 'text' }).subscribe(
        res => {
          this.cover.status = res ? file.name : Status.FAIL;
          this.cover.value = res;
        },
        (err: unknown) => {
          this.resetFile(this.cover);
          alert(`Something Went Wrong! ${err}`);
        },
        () => this.submitting = false
      );
    }
  }

  onAudioChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.submitting = true;
      this.audio.status = Status.UPLOAD;

      this.http.post(`${this.baseUrl}musics/audios`, file, { responseType: 'text' }).subscribe(
        res => {
          this.audio.status = res ? file.name : Status.FAIL;
          this.audio.value = res;
        },
        (err: unknown) => {
          this.resetFile(this.audio);
          alert(`Something Went Wrong! ${err}`);
        },
        () => this.submitting = false
      );
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

    this.form.resetForm({ 
      ...music,
      article: music.article && music.article.content,
      date: music.date && new Date(music.date).toISOString().split('T')[0]
    });
    this.current = { ...music };
    this.resetFile(this.cover, music.coverKey);
    this.resetFile(this.audio, music.audioKey);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { 
        ...this.current, 
        ...this.model,
        article: (this.model.article || (this.current && this.current.article)) && {
          date: new Date(),
          ...this.current && this.current.article,
          content: this.model.article,
        },
        coverKey: this.cover.value, 
        audioKey: this.audio.value,
      };
      this.current.date = this.current.date || new Date();

      var method: Observable<unknown>;
      if(this.current.id)
        method = this.http.put(`${this.baseUrl}musics/${this.current.id}`, this.current);
      else
        method = this.http.post(`${this.baseUrl}musics`, this.current);

      method.subscribe(
        () => {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.cover);
          this.resetFile(this.audio);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.musics.refresh();
        }
      );
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Song?`)) {
      this.submitting = true;
      this.http.delete(`${this.baseUrl}musics/${this.current.id}`).subscribe(
        () => {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.cover);
          this.resetFile(this.audio);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.musics.refresh();
        }
      );
    }
  }

  onScroll() {
    this.musics.load();
  }

  private resetFile(file: { status: Status | string, value: string }, value?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
  }
}