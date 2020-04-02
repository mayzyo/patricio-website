import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('ContentRef', { static: true }) contentRef: ElementRef;
  subscriptions = new Subscription();
  editorType: string;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.adminService.toggle$.subscribe(res => {
        this.editorType = res;
        this.open();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async open() {
    try {
      await this.modalService.open(this.contentRef, { size: 'lg', backdrop: 'static' }).result;
    } finally {
      window.location.reload();
    }    
  }
}
