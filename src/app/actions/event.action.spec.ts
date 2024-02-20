import * as EventActions from './event.actions';
import { addEvent } from '../actions/event.actions';

describe('Event Actions', () => {
  it('should create an action to add an event', () => {
    const event = { id: '1', title: 'Test Event' };
    const action = EventActions.addEvent({ event });
    expect({ ...action }).toEqual({
      type: '[Event] Add Event',
      event
    });
  });
});
