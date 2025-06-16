'use client';
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Calendar() {
    return (
        <Paper elevation={3} style={{ padding: 32, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box textAlign="center">
                <Typography variant="h3" gutterBottom>
                    Coming Soon
                </Typography>
                <Typography variant="subtitle1">
                    The calendar feature is under development. Please check back later!
                </Typography>
            </Box>
        </Paper>
    );
}
