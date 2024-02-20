import { eventReducer, initialState, EventState } from './event.reducer';
import * as EventActions from '../../actions/event.actions';

describe('Event Reducer', () => {
  let state: EventState;

  beforeEach(() => {
    state = initialState;
  });

  it('should add a new event', () => {
    const event = { id: '1', title: 'Test Event' };
    const action = EventActions.addEvent({ event });
    const nextState = eventReducer(state, action);

    expect(nextState).toEqual({
      entities: {
        [event.id]: event
      }
    } as any);
  });
});
