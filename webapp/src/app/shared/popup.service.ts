import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { NoticeComponent } from './notice/notice.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private noticeCompRef?: ComponentRef<NoticeComponent>;

  constructor(private overlay: Overlay) { }

  createNotice(message: string) {
    if(!this.noticeCompRef) {
      const configs = new OverlayConfig({
        positionStrategy: this.overlay.position().global().bottom().right(),
        panelClass: ['modal', 'is-active']
      });

      var overlayRef = this.overlay.create(configs);
      this.noticeCompRef = overlayRef.attach(new ComponentPortal(NoticeComponent));
      this.noticeCompRef.instance.closePanel.subscribe(() => {
        overlayRef.dispose();
        this.noticeCompRef = undefined;
      });
    } else {
      this.noticeCompRef.instance.refreshTimer$.next();
    }

    this.noticeCompRef.instance.messages.push(message);
  }
}
