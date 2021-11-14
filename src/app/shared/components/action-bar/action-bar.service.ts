import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ActionBarService {
    actionBarResized = new Subject<number>();
    calculateSpaceLeft = new  Subject<number>();
    screenActionsElementWidth_returned = new Subject<number>();
    screenActionsElementWidth_requested = new Subject<number>();
    spaceLeftChanged = new Subject<number>();

}