'use client';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    WeekView,
    DateNavigator,
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2024-08-02';
const schedulerData = [

    // Friday
    { startDate: '2024-08-02T20:00', endDate: '2024-08-02T21:00', title: 'Opening Ceremoney' },
    { startDate: '2024-08-02T21:00', endDate: '2024-08-02T22:00', title: 'Dinner' },
    { startDate: '2024-08-02T18:00', endDate: '2024-08-02T23:00', title: 'Check-In' },

    // Saturday
    { startDate: '2024-08-03T01:00', endDate: '2024-08-03T02:00', title: 'Karaoke' },
    { startDate: '2024-08-03T09:30', endDate: '2024-08-03T10:30', title: 'Breakfast' },
    { startDate: '2024-08-03T11:00', endDate: '2024-08-03T12:00', title: 'Cup Stacking' },
    { startDate: '2024-08-03T11:00', endDate: '2024-08-03T12:00', title: 'Bingo' },
    { startDate: '2024-08-03T14:00', endDate: '2024-08-03T15:30', title: 'Lunch' },
    { startDate: '2024-08-03T15:00', endDate: '2024-08-03T17:00', title: 'Networking Block' },
    { startDate: '2024-08-03T18:00', endDate: '2024-08-03T19:30', title: 'Intro to React' },
    { startDate: '2024-08-03T21:00', endDate: '2024-08-03T22:30', title: 'Dinner' },
    { startDate: '2024-08-03T23:00', endDate: '2024-08-03T24:00', title: 'Super Smash Tournament' },



    // Sunday
    { startDate: '2024-08-04T01:30', endDate: '2024-08-04T02:30', title: 'Spicy Noodle Challenge' },
    { startDate: '2024-08-04T11:00', endDate: '2024-08-04T16:30', title: 'Judging' },
    { startDate: '2024-08-04T13:00', endDate: '2024-08-04T15:00', title: 'Lunch' },
    { startDate: '2024-08-04T13:00', endDate: '2024-08-04T15:00', title: 'Networking Block' },
    { startDate: '2024-08-04T15:00', endDate: '2024-08-04T16:00', title: 'Board Games' },
    { startDate: '2024-08-04T15:00', endDate: '2024-08-04T16:00', title: 'Typing Contest' },
    { startDate: '2024-08-04T17:00', endDate: '2024-08-04T16:00', title: 'Closing Ceremony' },
];

export default function Calendar() {

    return (
        <Paper>
            <Scheduler data={schedulerData}>
                <ViewState currentDate={currentDate} />
                <DayView
                    startDayHour={0}
                    endDayHour={24}
                    intervalCount={3}
                    cellDuration={60}


                />

                <Appointments />
            </Scheduler>
        </Paper>
    );

};