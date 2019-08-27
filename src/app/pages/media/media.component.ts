import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { fadeIn, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { ImageService } from 'src/app/services/image.service';
import { Moment } from 'src/app/models/Moment';
import { switchMap, scan, map } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.thumbnail-img')),
  // ]
  animations: [
    trigger('fadeIn', [
      transition(`* => *`, [
        query('.thumbnail-img', [
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
export class MediaComponent implements OnInit {

  readonly quote$ = this.contents.randomQuote$;
  readonly momentList$ = this.contents.momentPreview$.pipe(
    switchMap(res => 
      merge(...res.slice(0, 10).map(el => 
        this.images.imageBypass(el.image).pipe(
          map(x => {
            el.thumbnail = x;
            return el;
          })
        )
      ))
    ),
    scan((acc, cur:Moment) => acc.concat(cur), new Array<Moment>())
  );

  current: Moment;
  closeResult: string;

  constructor(private modals: NgbModal, private contents: ContentService, private images: ImageService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  async open(content:any, moment: Moment) {
    this.current = moment;

    try {
      const result = await this.modals.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl' }).result
      this.closeResult = `Closed with: ${result}`;
    } catch(rej) {
      this.closeResult = `Dismissed ${this.getDismissReason(rej)}`;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
