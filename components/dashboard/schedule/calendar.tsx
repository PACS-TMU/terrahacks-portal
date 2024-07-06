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
    { startDate: '2024-08-02T09:45', endDate: '2024-08-02T11:00', title: 'Meeting' },
    { startDate: '2024-08-03T12:00', endDate: '2024-08-03T13:30', title: 'Go to the gym' },
    { startDate: '2024-08-04T14:00', endDate: '2024-08-04T15:30', title: 'Lunch with friends' },
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