import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { fadeIn, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { Subject, Observable, merge, of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { scan, switchMap, share, take, pluck, tap, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('fadeInCard', [
      transition(`* => *`, [
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
    trigger('fadeInOpt', [
      transition(`* => *`, [
        query('.anim-obj', [
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
  ]
})
export class BlogsComponent implements OnInit {

  @ViewChild('shareLink', { static:false }) shareLink: ElementRef;

  readonly updateHistory$: Subject<void>;
  readonly history$: Observable<Post[]>;

  readonly updateCurrent$: Subject<Post>;
  readonly current$: Observable<SafeHtml>;
  
  readonly profile$ = this.contents.profile$;
  readonly portrait$ = this.images.portrait$;
  title: string;
  date: string;

  constructor(
    private contents: ContentService, 
    private images: ImageService, 
    private sanitizer: DomSanitizer, 
    route: ActivatedRoute
  ) {
    this.updateHistory$ = new Subject();
    this.updateCurrent$ = new Subject();

    this.history$ = this.setupPagination(this.updateHistory$);
    this.current$ = this.setupPostArticle(
      this.updateCurrent$, 
      route.paramMap.pipe(
        switchMap(res => this.history$.pipe(
          take(1), 
          map(x => res.get('title') ? x.find(el => el.title == res.get('title')) : x[0])
        )),
        tap(res => {
          this.title = res.title;
          this.date = new Date(res.create_date).toDateString();
        })
      )
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onSelect(post: Post) {
    this.title = post.title;
    this.date = new Date(post.create_date).toDateString();
    this.updateCurrent$.next(post);
  }

  private setupPagination(update$: Subject<void>) {
    return merge(of(null), update$).pipe(
      scan(acc => acc + 1, 0), 
      switchMap(res => this.contents.blogPreview(res.toString(), '10')),
      scan((acc, cur) => acc.concat(cur), new Array<Post>()),
      share()
    );
  }

  private setupPostArticle(update$: Subject<Post>, first$: Observable<Post>) {
    return merge(first$, update$).pipe(
      switchMap(res => this.contents.blogArticle(res)),
      map(res => this.sanitizer.bypassSecurityTrustHtml(res))
    );
  }

  selectAll()
  {
    this.shareLink.nativeElement.select();
  }
}
