import { createReducer, on } from '@ngrx/store';
import { EventActions } from '../../actions/event.actions';

export interface EventState {
  entities: { [id: string]: Event };
}

export const initialState: EventState = {
  entities: {},
};

export const eventReducer = createReducer(
  initialState,
  on(EventActions.addEvent, (state, { event }) => {
    const entities = { ...state.entities, [event.id]: event };
    return { ...state, entities };
  })
);
