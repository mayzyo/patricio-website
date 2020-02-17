import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { pluck, map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('ContentRef', { static: true }) contentRef: ElementRef;
  subscriptions = new Subscription();
  closeResult: string;
  editorType: string;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.adminService.toggle$
      .subscribe(res => {
        this.editorType = res;
        this.open();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  open() {
    this.modalService.open(this.contentRef, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      window.location.reload();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      window.location.reload();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
