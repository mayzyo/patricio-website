import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { fadeIn, fadeObject, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { ImageService } from 'src/app/services/image.service';
import { Howl, Howler } from 'howler';

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

  @ViewChild('HighlightRef', { static:true }) highlightRef: ElementRef;
  @ViewChild('UpcomingRef', { static:true }) upcomingRef: ElementRef;
  @ViewChild('BiographyRef', { static:true }) biographyRef: ElementRef;

  readonly quote$ = this.contents.randomQuote$;
  readonly works$ = this.contents.workList$.pipe(
    map(res => 
      res.map(el => ({ ...el, brief: new Date(el.create_date).toDateString(), link: el.sound_cloud }))
    ),
  );
  readonly announcement$ = this.contents.eventAnnouncement('1', '4');
  readonly biography$ = this.contents.biography$.pipe(
    map(res => {
      const cutoff = this.languageCut(res)
      return cutoff != -1
      ? [res.slice(0, cutoff), res.slice(cutoff, res.length)]
      : [res]
    })
  );

  highlightAnim = false;
  upcomingAnim = false;
  biographyAnim = false;

  constructor(private contents: ContentService, private images: ImageService) {}

  ngOnInit() {
    var sound = new Howl({
      src: ['assets/I Have A Dream.mp3'],
      onload: () => sound.play()
    });
  }
  
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent($event) {

    if(!this.highlightAnim && this.scrollOffset(this.highlightRef))
      this.highlightAnim = true;

    if(!this.upcomingAnim && this.scrollOffset(this.upcomingRef))
      this.upcomingAnim = true;

    if(!this.biographyAnim && this.scrollOffset(this.biographyRef))
      this.biographyAnim = true;
  }

  scrolldown() {
    this.highlightRef.nativeElement.scrollIntoView({behavior:"smooth"});
  }

  languageCut(msg: string) {
    for (var i = 0, n = msg.length; i < n; i++) {
      // Chinese characters are above the 30,000 range in Unicode
      if (msg.charCodeAt(i) > 30000) { 
        return i;
      }
    }

    return -1;
  }

  private scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
  }
}
