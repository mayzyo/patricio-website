import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { pluck, map, share } from 'rxjs/operators';
import { fadeIn, fadeObject } from 'src/app/animations/fade-in';
import { trigger } from '@angular/animations';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInBlog', fadeIn(['.card-big', '.card-mid', '.card-small'], {
      state: 'false'
    })),
    trigger('fadeObjBlog', fadeObject('false', 'true')),
    trigger('fadeInEvent', fadeIn('.tester', {
      state: 'false'
    })),
    trigger('fadeObjEvent', fadeObject('false', 'true')),
    trigger('fadeInBio', fadeIn('.row', {
      state: 'false'
    })),
    trigger('fadeObjBio', fadeObject('false', 'true'))
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('blogSection', { static:true }) blogSection: ElementRef;
  @ViewChild('eventSection', { static:true }) eventSection: ElementRef;
  @ViewChild('bioSection', { static:true }) bioSection: ElementRef;

  readonly blog$ = this.contents.blogPreview('1', '13').pipe(
    map(res =>  res.map(el => {
      !el.thumbnail && (el.thumbnail = `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`);
      return el;
    })),
    share()
  );
  readonly events$ = this.contents.eventAnnouncement('1', '4');
  readonly biography$ = this.contents.biography$;
  readonly quote$ = this.contents.homeQuote$;

  postsXL$ = this.blog$.pipe(pluck('0'));
  postsL$ = this.blog$.pipe(pluck('1'));
  postsM$ = this.blog$.pipe(map(res => [...res].splice(2, 3)));
  postsS$ = this.blog$.pipe(map(res => [...res].splice(5, res.length - 5)));

  loadBlog = false;
  loadEvent = false;
  loadBio = false;

  constructor(private contents: ContentService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent($event) {

    if(window.scrollY >= this.blogSection.nativeElement.offsetTop - (window.innerHeight / 1.35)) {
      this.loadBlog = true;
    }

    if(window.scrollY >= this.eventSection.nativeElement.offsetTop - (window.innerHeight / 1.35)) {
      this.loadEvent = true;
    }

    if(window.scrollY >= this.bioSection.nativeElement.offsetTop - (window.innerHeight / 1.35)) {
      this.loadBio = true;
    }
  }

  scrolldown() {
    this.blogSection.nativeElement.scrollIntoView({behavior:"smooth"});
    // el.scrollIntoView({behavior:"smooth"});
  }
}
