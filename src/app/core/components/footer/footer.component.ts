import { Component } from '@angular/core';
import { Observable, map, share, tap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { SocialMedia } from 'src/app/models/social-media';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly socialMedia$: Observable<SocialMedia>;
  protected readonly faFacebookSquare = faFacebookSquare;

  constructor(private firestore: Firestore, private admin: AdminService) {
    const profile$ = collectionData(collection(this.firestore, 'profile')) as Observable<Profile[]>;
    this.socialMedia$ = profile$.pipe(
      map(res => res[0].socialMedia),
      share()
    );
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
