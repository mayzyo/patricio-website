import { Component, OnInit } from '@angular/core';
import { pluck, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { SocialMedia } from 'src/app/models/SocialMedia';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly socialMedia$ = this.http.get<Owner>('/api/profile').pipe(
    pluck<Owner, SocialMedia>('socialMedia'),
    share()
  );

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

}
