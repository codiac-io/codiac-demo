import { Observable, timer, NEVER, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, tap, takeWhile, share, startWith, switchMap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const INTERVAL = 1000;
const MINUTES = 0.1;
const TIME = MINUTES * 1000 * 60;
@Injectable({ providedIn: "root" })
export class CountDownService {

  constructor(
  ) { }

  /**
   * Set a countdown via interval and timer, timeRemaining$ subscribe => complete will give you the termination
   * The coutdown is resetable at anytime via toggle.next(true)
   */

  public interval: number = INTERVAL;
  public time: number = TIME;
  public toggle$ = new BehaviorSubject(false);

  private current: number;

  private toMinutesDisplay = (ms: number) => Math.floor(ms / 1000 / 60);
  private toSecondsDisplay = (ms: number) => Math.floor(ms / 1000) % 60;

  private toSecondsDisplayString = (ms: number) => {
    const seconds = this.toSecondsDisplay(ms);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  };

  private currentSeconds = () => this.time / this.interval;
  private toMs = (t: number) => t * this.interval
  private toRemainingSeconds = (t: number) => this.currentSeconds() - t;

  public timeRemaining$ = this.toggle$.pipe(
    switchMap((running: boolean) => (running ? timer(0, this.interval) : NEVER)),
    map(this.toRemainingSeconds),
    takeWhile(t => t >= 0),
  );

  public ms$ = this.timeRemaining$.pipe(
    map(this.toMs),
    tap(t => this.current = t)
  );

  public minutes$ = this.ms$.pipe(
    map(this.toMinutesDisplay),
    map(s => s.toString()),
    startWith(this.toMinutesDisplay(this.time).toString())
  );

  public seconds$ = this.ms$.pipe(
    map(this.toSecondsDisplayString),
    startWith(this.toSecondsDisplayString(this.time).toString())
  );
}
