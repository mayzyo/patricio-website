import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { fadeIn, fadeObject, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // trigger('fadeInBlog', [
    //   transition(`* => true`, [
    //     query('.card', [
    //       style({ opacity: '0' }),
    //       stagger(300, [
    //         useAnimation(landingFadeIn, {
    //           params: {
    //             transform: 'translateY(20px)',
    //             opacity: '0',
    //           }
    //         })
    //       ])
    //     ]),
    //   ])
    // ]),
    // trigger('fadeObjBlog', [
    //   state('*', style({ visibility: 'hidden' })),
    //   state('true', style({ visibility: 'visible' }))
    // ]),
    // trigger('fadeInEvent', [
    //   transition(`* => true`, [
    //     query('.media', [
    //       style({ opacity: '0' }),
    //       stagger(300, [
    //         useAnimation(landingFadeIn, {
    //           params: {
    //             transform: 'translateY(20px)',
    //             opacity: '0',
    //           }
    //         })
    //       ])
    //     ]),
    //   ])
    // ]),
    // trigger('fadeObjEvent', [
    //   state('*', style({ visibility: 'hidden' })),
    //   state('true', style({ visibility: 'visible' }))
    // ]),
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

  @ViewChild('WorkRef', { static:true }) workRef: ElementRef;
  // @ViewChild('eventSection', { static:true }) eventSection: ElementRef;
  @ViewChild('biographySection', { static:true }) biographySection: ElementRef;

  readonly blog$ = this.contents.blogPreview('1', '13').pipe(
    map(res =>  
      res.map(el => ({
        ...el,
        thumbnail: this.images.stockGallery()
      }))
    ),
    map(res => {
      return {
        postsXL: res[0],
        postsL: res[1],
        postsM: [...res].splice(2, 3),
        postsS: [...res].splice(5, res.length - 5)
      }
    }),
  );
  readonly works$ = this.contents.workList$.pipe(
    map(res => 
      res.map(el => ({ ...el, brief: new Date(el.create_date).toDateString(), link: el.sound_cloud }))
    ),
  );
  readonly quote$ = this.contents.randomQuote$;
  readonly events$ = this.contents.eventAnnouncement('1', '4');
  readonly biography$ = this.contents.biography$.pipe(
    map(res => {
      const cutoff = this.languageCut(res)
      return cutoff != -1
      ? [res.slice(0, cutoff), res.slice(cutoff, res.length)]
      : [res]
    })
  );

  blogAnim = false;
  eventAnim = false;
  biographyAnim = false;

  constructor(private contents: ContentService, private images: ImageService) { }

  ngOnInit() {
  }
  
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent($event) {

    // if(!this.blogAnim && this.scrollOffset(this.blogSection))
    //   this.blogAnim = true;

    // if(!this.eventAnim && this.scrollOffset(this.eventSection))
    //   this.eventAnim = true;

    if(!this.biographyAnim && this.scrollOffset(this.biographySection))
      this.biographyAnim = true;
  }

  scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
  }

  scrolldown() {
    this.workRef.nativeElement.scrollIntoView({behavior:"smooth"});
    // el.scrollIntoView({behavior:"smooth"});
  }

  languageCut(msg: string) {
    for (var i = 0, n = msg.length; i < n; i++) {
      // Chinese is above the 30,000 range in Unicode
      if (msg.charCodeAt(i) > 30000) { 
        return i;
      }
    }

    return -1;
  }
}
