import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn('.thumbnail')),
  ]
})
export class MediaComponent implements OnInit {

  thumbnails$ = this.images.galleryThumbnails$;
  currentImg: string;
  closeResult: string;

  constructor(private modals: NgbModal, private images: ImageService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  async open(content, img) {
    this.currentImg = img;
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
