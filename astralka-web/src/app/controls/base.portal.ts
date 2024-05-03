import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {Directive, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {CdkPortal} from "@angular/cdk/portal";
import {Observable} from "rxjs";

@Directive()
export class AstralkaBasePortalComponent {
  private overlayRef!: OverlayRef;
  private showing: boolean = false;
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
  @ViewChild("button") public btn!: ElementRef;

  constructor(protected overlay: Overlay) {
  }

  public show(): void {
    if (!this.showing) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.contentTemplate);
      this.overlayRef.backdropClick().subscribe(() => this.hide());
      this.showing = true;
    }
  }

  public hide(): void {
    this.overlayRef.detach();
    this.showing = false;
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.btn.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 2,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -2,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  public toggle() {
    if (!this.showing) {
      this.show();
    } else {
      this.hide();
    }
  }
}
