'use client';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { schedulerData } from './appointments';
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';

const CustomTooltipContent = ({ appointmentData, ...restProps }) => {
    if (!appointmentData) {
        return null;
    }

    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <div style={{ marginTop: 8 }}>
                <div><strong>Title:</strong> {appointmentData.title}</div>
                <div><strong>Start Date:</strong> {format(new Date(appointmentData.startDate), 'PPPpp')}</div>
                <div><strong>End Date:</strong> {format(new Date(appointmentData.endDate), 'PPPpp')}</div>
                <div><strong>Room:</strong> {appointmentData.room}</div>
                <div><strong>Details:</strong> {appointmentData.details}</div>
            </div>
        </AppointmentTooltip.Content>
    );
};

export default function Calendar({ data = schedulerData, currentDate = '2024-08-02' }) {
    if (process.env.NODE_ENV === 'production') {
        console.error = () => {
            return;
        };
    }

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
                <AppointmentTooltip
                    contentComponent={CustomTooltipContent}
                    showCloseButton
                />
            </Scheduler>
        </Paper>
    );
};