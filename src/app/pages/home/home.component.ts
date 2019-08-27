import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { fadeIn, fadeObject, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // animations: [
  //   trigger('fadeInBlog', fadeIn('.card', { state: 'true' })),
  //   trigger('fadeObjBlog', fadeObject('*', 'true')),
  //   trigger('fadeInEvent', fadeIn('.media', { state: 'true' })),
  //   trigger('fadeObjEvent', fadeObject('*', 'true')),
  //   trigger('fadeInBiography', fadeIn('.row', { state: 'true' })),
  //   trigger('fadeObjBiography', fadeObject('*', 'true'))
  // ]
  animations: [
    trigger('fadeInBlog', [
      transition(`* => true`, [
        query('.card', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
    trigger('fadeObjBlog', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ]),
    trigger('fadeInEvent', [
      transition(`* => true`, [
        query('.media', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
    trigger('fadeObjEvent', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ]),
    trigger('fadeInBiography', [
      transition(`* => true`, [
        query('.row', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
    trigger('fadeObjBiography', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ])
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('blogSection', { static:true }) blogSection: ElementRef;
  @ViewChild('eventSection', { static:true }) eventSection: ElementRef;
  @ViewChild('biographySection', { static:true }) biographySection: ElementRef;

  readonly blog$ = this.contents.blogPreview('1', '13').pipe(
    map(res =>  res.map(el => {
      !el.thumbnail && (el.thumbnail = `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`);
      return el;
    })),
    map(res => {
      return {
        postsXL: res[0],
        postsL: res[1],
        postsM: [...res].splice(2, 3),
        postsS: [...res].splice(5, res.length - 5)
      }
    }),
  );
  readonly events$ = this.contents.eventAnnouncement('1', '4');
  readonly biography$ = this.contents.biography$;
  readonly quote$ = this.contents.homeQuote$;

  blogAnim = false;
  eventAnim = false;
  biographyAnim = false;

  constructor(private contents: ContentService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent($event) {

    if(!this.blogAnim && this.scrollOffset(this.blogSection))
      this.blogAnim = true;

    if(!this.eventAnim && this.scrollOffset(this.eventSection))
      this.eventAnim = true;

    if(!this.biographyAnim && this.scrollOffset(this.biographySection))
      this.biographyAnim = true;
  }

  scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
  }

  scrolldown() {
    this.blogSection.nativeElement.scrollIntoView({behavior:"smooth"});
    // el.scrollIntoView({behavior:"smooth"});
  }
}
