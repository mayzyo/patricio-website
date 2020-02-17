import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { pluck, tap } from 'rxjs/operators';
import { SocialMedia } from 'src/app/models/SocialMedia';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {

  @ViewChild('editorForm', { static:true }) form: NgForm;
  submitting = false;
  editing = false;
  current: SocialMedia;
  model: { content?: string } = {};

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.updateContent();
  }

  private updateContent() {
    this.http.get<Owner>('/api/profile').pipe(
      pluck<Owner, SocialMedia>('socialMedia'),
      tap(res => this.current = res),
      pluck('biography'),
    ).subscribe(res => this.form.resetForm({ content: res }));
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current.biography = this.model.content;

      this.http.put('/api/profile/media', this.current).subscribe(res => {
        this.submitting = false;
        this.editing = false;
        this.updateContent();
      });
    }
  }
}
