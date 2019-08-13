import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { pluck, map } from 'rxjs/operators';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { fadeIn, fadeObject } from 'src/app/animations/fade-in';
import { trigger } from '@angular/animations';

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

  postsXL$ = this.blogs.latest$.pipe(pluck('0'));
  postsL$ = this.blogs.latest$.pipe(pluck('1'));
  postsM$ = this.blogs.latest$.pipe(map(res => [...res].splice(2, 3)));
  postsS$ = this.blogs.latest$.pipe(map(res => [...res].splice(5, res.length - 5)));

  events$ = this.announcements.latestEvents$;

  loadBlog = false;
  loadEvent = false;
  loadBio = false;

  constructor(private blogs: BlogService, private announcements: AnnouncementService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent($event) {

    if(window.scrollY >= this.blogSection.nativeElement.offsetTop - (window.innerHeight / 1.35)) {
      console.log('triggered')
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
