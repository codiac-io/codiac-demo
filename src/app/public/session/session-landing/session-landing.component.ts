import {
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../slideInAnimation';
import { SessionFormatterService } from '../session-formatter.service';

@Component({
  selector: 'app-session-landing',
  templateUrl: './session-landing.component.html',
  styleUrls: ['./session-landing.component.scss'],
  animations: [slideInAnimation]
})
export class SessionLanding {

  containerClasses$ = this.sessionFormatter.containerClasses$;

  constructor(private sessionFormatter: SessionFormatterService) {}

  prepareRoute(outlet: RouterOutlet) {
    const state =
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
    return state;
  }

}
