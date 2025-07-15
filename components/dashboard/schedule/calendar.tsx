'use client';
import React from 'react';

/* 
// Uncomment when schedule is ready to be displayed

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  room: string;
  description: string;
};

// Helper functions to replace date-fns
const formatDate = (date: Date, format: string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (format === 'MMMM do') {
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th';
    return `${months[date.getMonth()]} ${day}${suffix}`;
  }
  if (format === 'h a') {
    const hour = date.getHours();
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${displayHour} ${ampm}`;
  }
  if (format === 'h:mm a') {
    const hour = date.getHours();
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${displayHour}:${minutes} ${ampm}`;
  }
  if (format === 'eeee, MMMM d, yyyy • h:mm a') {
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${dayName}, ${monthName} ${day}, ${year} • ${displayHour}:${minutes} ${ampm}`;
  }
  return date.toString();
};

// ... rest of the schedule implementation
*/

export default function CustomScheduler() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">📅 TerraHacks Schedule</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Coming Soon!</h2>
        <p className="text-blue-700">
          We are putting the finishing touches on our event schedule. 
          Check back soon for the full lineup of activities, workshops, and sessions.
        </p>
      </div>
    </div>
  );
}