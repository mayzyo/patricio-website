import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'src/app/models/Moment';
import { BehaviorSubject, from, interval, zip } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { map, switchMap, withLatestFrom, scan, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  readonly quote$ = this.quotes.procedure$('media');
  readonly updateBacklog$ = new BehaviorSubject<number>(1);
  readonly backlog$ = this.updateBacklog$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Moment[]>('/api/media/moments', { params: res })),
    withLatestFrom(this.updateBacklog$),
    scan<[Moment[], number], Moment[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), []),
    switchMap(res => from(res)),
  );
  readonly previews$ = zip(
    this.backlog$,
    interval(300)
  ).pipe(
    pluck('0'),
    map(res => ({ ...res, image$: this.http.get(`/api/media/images/${res.imageKey}`) }))
  );

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
