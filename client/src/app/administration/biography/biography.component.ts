import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { pluck, tap } from 'rxjs/operators';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {

  @ViewChild('editorForm', { static:true }) form: NgForm;
  @Input() closeModal: Function;
  submitting = false;
  loading = true;
  current: SocialMedia;
  model: { content?: string } = {};

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.updateContent();
  }

  private updateContent() {
    this.http.get<Owner>(`${this.baseUrl}profile`).pipe(
      pluck<Owner, SocialMedia>('socialMedia'),
      tap(res => this.current = res),
      tap(() => this.loading = false),
      pluck('biography'),
    ).subscribe(res => this.form.resetForm({ content: res }));
  }

  onSubmit() {
    if(this.form.valid && !this.submitting) {
      this.submitting = true;
      this.current.biography = this.model.content;

      this.http.put(`${this.baseUrl}profile/media`, this.current).subscribe(
        () => {
          this.modalService.dismissAll();
          window.location.reload();
        },
        (err: unknown) => alert(`Something Went Wrong! ${err}`), 
        () => {
          this.submitting = false;
        }
      );
    }
  }
}
