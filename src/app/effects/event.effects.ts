import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventActions } from '../actions/event.actions';
import { INITIAL_EVENTS } from '../helpers/event-utils';

@Injectable()
export class EventEffects {
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadEvents),
      map(() => EventActions.loadEventsSuccess({ events: INITIAL_EVENTS })),
      catchError(error => of(EventActions.loadEventsFailure({ error })))
    )
  );

  constructor(private actions$: Actions) {}
}
