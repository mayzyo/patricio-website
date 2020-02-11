import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { fadeIn, landingFadeIn } from 'src/app/animations/fade-in';
import { Moment } from 'src/app/models/Moment';
import { Observable } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';

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

  readonly quote$ = this.quotes.procedure$('media');
  readonly previews$: Observable<Moment[]> = this.http.get<Moment[]>('/api/media/gallery');

  current: Moment;
  closeResult: string;

  constructor(
    private http: HttpClient,
    private modals: NgbModal, 
    private quotes: QuotesService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  async open(content: unknown, moment: Moment) {
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
