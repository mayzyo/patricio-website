import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Music } from 'src/app/models/Music';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../status';
import { continuous } from 'src/app/utils/custom-operators';
import { MusicService } from 'src/app/services/music.service';
import { withLatestFrom, scan } from 'rxjs/operators';

@Component({
  selector: 'app-music-admin',
  templateUrl: './music-admin.component.html',
  styleUrls: ['./music-admin.component.scss']
})
export class MusicAdminComponent implements OnInit {
  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  model: Partial<Music> = { favourite: false };
  current: Music;
  cover = { status: Status.NONE || '', value: null };
  audio = { status: Status.NONE || '', value: null };

  // readonly updateSelection$ = new BehaviorSubject<number>(1);
  // readonly selection$ = this.updateSelection$.pipe(
  //   continuous(res => this.http.get<Music[]>('/api/musics', { params: res }), 10),
  // );
  readonly selection$ = this.musics.result$.pipe(
    withLatestFrom(this.musics.onPageChange$()),
    scan<[Music, number], Music[]>((acc, [cur, page]) => page == 1 ? [cur] : acc.concat(cur), []),
  );

  constructor(
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

      this.http.post('/api/musics/covers', file, { responseType: 'text' }).subscribe(
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

      this.http.post('/api/musics/audios', file, { responseType: 'text' }).subscribe(
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

    this.form.resetForm({ ...music, date: music.date && new Date(music.date).toISOString().split('T')[0] });
    this.current = { ...music };
    this.resetFile(this.cover, music.coverKey);
    this.resetFile(this.audio, music.audioKey);
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current = { ...this.current, ...this.model, coverKey: this.cover.value, audioKey: this.audio.value };
      this.current.date = this.current.date || new Date();

      var method: Observable<unknown>;
      if(this.current.id)
        method = this.http.put(`/api/musics/${this.current.id}`, this.current);
      else
        method = this.http.post('/api/musics', this.current);

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
          this.musics.toPage(1);
          // this.updateSelection$.next(1);
        }
      );
    }
  }

  onRemove() {
    if(confirm(`Are you sure want to remove this Song?`)) {
      this.submitting = true;
      this.http.delete(`/api/musics/${this.current.id}`).subscribe(
        () => {
          this.form.resetForm();
          this.current = null;
          this.resetFile(this.cover);
          this.resetFile(this.audio);
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
          this.musics.toPage(1);
          // this.updateSelection$.next(1);
        }
      );
    }
  }

  onScroll() {
    this.musics.next();
    // this.updateSelection$.next(this.updateSelection$.value + 1);
  }

  private resetFile(file: { status: Status | string, value: string }, value?: string) {
    file.status = value ? Status.FOUND : Status.NONE;
    file.value = value || null;
  }
}