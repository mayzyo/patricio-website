import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { pluck, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly socialMedia$ = this.http.get<Owner>(`${this.baseUrl}profile`).pipe(
    pluck<Owner, SocialMedia>('socialMedia'),
    share()
  );

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  login() { 
    localStorage.setItem('AUTH', 'true');
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href', '/.auth/login/google?post_login_redirect_url=/home'); 
    document.body.appendChild(element); 
    //onClick property 
    element.click(); 
    document.body.removeChild(element); 
  }

  logout() { 
    localStorage.removeItem('AUTH');
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href', '/.auth/logout?post_logout_redirect_uri=/home'); 
    document.body.appendChild(element); 
    //onClick property 
    element.click(); 
    document.body.removeChild(element); 
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
