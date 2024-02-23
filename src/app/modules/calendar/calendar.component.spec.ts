import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { initialState } from 'src/app/reducers/reducers/event.reducer';
import { CalendarApi, DateSelectArg } from '@fullcalendar/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let store: MockStore;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [MatDialogModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: { open: jest.fn() } },
      ],
    }).compileComponents();

    store = TestBed.inject<Store<any>>(Store) as MockStore<any>;
    mockMatDialog = TestBed.inject(MatDialog) as MatDialog;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when handleDateSelect is called', () => {
    const openSpy = spyOn(mockMatDialog, 'open').and.returnValue({
      afterClosed: () => ({ subscribe: () => {} }),
    } as any);

    const selectInfo: DateSelectArg = {
      jsEvent: null,
      view: {
        calendar: {} as CalendarApi,
        type: 'dayGridMonth',
        title: 'Month',
        activeStart: new Date(),
        activeEnd: new Date(),
        currentStart: new Date(),
        currentEnd: new Date(),
        getOption: (name: string) => {},
      },
      start: new Date(),
      end: new Date(),
      allDay: false,
      startStr: '',
      endStr: '',
    };

    component.handleDateSelect(selectInfo);

    expect(openSpy).toHaveBeenCalled();
  });

  it('should dispatch addEvent action when new event is added', () => {
    const event = {
      id: '123',
      title: 'Test Event',
      description: 'Test Description',
      type: 'Test Type',
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      backgroundColor: '#ffffff',
    };

    const dispatchSpy = spyOn(store, 'dispatch');

    const selectInfo: DateSelectArg = {
      jsEvent: null,
      view: {
        calendar: {} as CalendarApi,
        type: 'dayGridMonth',
        title: 'Month',
        activeStart: new Date(),
        activeEnd: new Date(),
        currentStart: new Date(),
        currentEnd: new Date(),
        getOption: (name: string) => {},
      },
      start: new Date(),
      end: new Date(),
      allDay: false,
      startStr: '',
      endStr: '',
    };

    component.handleDateSelect(selectInfo);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: '[Event] Add Event',
      event,
    });
  });
});
