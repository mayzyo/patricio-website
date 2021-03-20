import { BreakpointObserver } from '@angular/cdk/layout';
import { GlobalPositionStrategy, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { Filter, MediaService } from '../media.service';
import { Media } from '../models';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {
  readonly breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );
  private readonly viewerSub: Subscription = new Subscription();
  filter: string = 'all';

  constructor(private breakpointObserver: BreakpointObserver, private overlay: Overlay, public media: MediaService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.viewerSub.unsubscribe();
  }

  changeFilter() {
    switch(this.filter) {
      case 'all':
        this.media.getList$.next(Filter.ALL);
        break;
      case 'photos':
        this.media.getList$.next(Filter.PHOTOS);
        break;
      case 'videos':
        this.media.getList$.next(Filter.VIDEOS);
        break;
    };
  }

  openViewer(item: Media & { coverImage$: any }) {
    this.media.current$.next(item);
    // Clear Image Viewer subscriptions.
    this.viewerSub.unsubscribe();

    const configs = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      // backdropClass: 'modal-background'
    });

    const overlayRef = this.overlay.create(configs);
    const compRef = overlayRef.attach(new ComponentPortal(ImageViewerComponent));
    overlayRef.backdropClick().subscribe(() =>
      overlayRef.dispose()
    );
    // Listen to close Output event from Image Viewer and add listener to subscription.
    this.viewerSub.add(
      compRef.instance.closePanel.subscribe(() => overlayRef.dispose())
    );
  }
}
