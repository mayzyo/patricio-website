import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl, Howler } from 'howler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @ViewChild('playerModal', { static:true }) playerModal: any;
  closeResult: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    var sound = new Howl({
      src: ['assets/I Have A Dream.mp3'],
      onload: () => sound.play()
    });
  }

  open() {
    this.modalService.open(this.playerModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
