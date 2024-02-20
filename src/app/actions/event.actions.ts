import { createAction, props } from '@ngrx/store';

export const loadEvents = createAction('[Event] Load Events');
export const loadEventsSuccess = createAction('[Event] Load Events Success', props<{ events: any[] }>());
export const loadEventsFailure = createAction('[Event] Load Events Failure', props<{ error: any }>());

export const addEvent = createAction('[Event] Add Event', props<{ event: any }>());
export const deleteEvent = createAction('[Event] Delete Event', props<{ eventId: string }>());


export const EventActions = {
  loadEvents,
  loadEventsSuccess,
  loadEventsFailure,
  addEvent
};
