import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { paths } from 'src/app/models';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {
  test: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<SongResponse>('/Songs?page=1&size=10').subscribe(res => {
      this.test = res;
      console.log('tester', res[0].title)
      
    })
    // this.http.get<any>('http://localhost:5000/Songs?page=1&size=10').subscribe(res => {
    //   this.test = res;
    //   console.log('tester', res.name)
      
    // })
  }

}

type SongResponse = paths["/Songs"]["get"]["responses"][200]["text/plain"];