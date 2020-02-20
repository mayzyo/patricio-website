import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'src/app/models/Moment';
import { BehaviorSubject, from } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { map, scan, switchMap } from 'rxjs/operators';
import { rapidFire } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('media');
  readonly updateMoments$ = new BehaviorSubject<number>(1);
  readonly moments$ = this.updateMoments$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Moment[]>('/api/media/moments', { params: res })),
    switchMap(res => from(res).pipe(
      map(res => ({ ...res, image$: this.http.get(`/api/media/images/${res.imageKey}`) })),
      rapidFire(300),
    )),
    scan<Moment, Moment[]>((acc, cur) => [ ...acc, cur ], [])
  )

  current: Moment;
  closeResult: string;

  constructor(
    private http: HttpClient,
    private modals: NgbModal, 
    private quotes: QuotesService,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }

  async open(content: unknown, moment: Moment) {
    this.current = moment;
    try {
      const result = await this.modals.open(content, { centered: true, size: 'xl' }).result
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
