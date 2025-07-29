'use client';
import React, { useState } from 'react';
// import { schedulerData } from './appointments';

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  room: string;
  description: string;
  form?: string;
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

const getHours = (date: Date) => date.getHours();
const differenceInMinutes = (end: Date, start: Date) => (end.getTime() - start.getTime()) / (1000 * 60);
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const endOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

const areIntervalsOverlapping = (interval1: {start: Date, end: Date}, interval2: {start: Date, end: Date}) => {
  return interval1.start < interval2.end && interval2.start < interval1.end;
};

const allEvents: Event[] = [
  {
    id: 1,
    title: 'Hackathon Check-In',
    start: new Date('2025-08-01T18:00:00'),
    end: new Date('2025-08-01T23:00:00'),
    room: 'Main Hall',
    description: 'Kick off TerraHacks with opening remarks and event overview.',
  },
  {
    id: 2,
    title: 'Opening Ceremony + Hacking Begins',
    start: new Date('2025-08-01T20:00:00'),
    end: new Date('2025-08-01T21:00:00'),
    room: 'DCC 204',
    description: 'Explore the future of AI with hands-on demos and expert talks.',
  },
  {
    id: 3,
    title: 'Dinner',
    start: new Date('2025-08-01T21:00:00'),
    end: new Date('2025-08-01T22:00:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary dinner and network with other participants.',
  },
  {
    id: 4,
    title: 'Just Dance',
    start: new Date('2025-08-01T22:30:00'),
    end: new Date('2025-08-01T23:30:00'),
    room: 'TBD',
    description: 'Enjoy a complimentary lunch and network with other participants.',
  },
  {
    id: 5,
    title: 'Karaoke',
    start: new Date('2025-08-02T01:00:00'),
    end: new Date('2025-08-02T03:00:00'),
    room: 'DCC 204',
    description: 'Enjoy a complimentary lunch and network with other participants.',
  },
  {
    id: 6,
    title: 'Smash Bros Tournament',
    start: new Date('2025-08-01T22:30:00'),
    end: new Date('2025-08-01T24:00:00'),
    room: 'TBD',
    description: 'Enjoy a complimentary lunch and network with other participants.',
  },
  {
    id: 7,
    title: 'Breakfast',
    start: new Date('2025-08-02T09:30:00'),
    end: new Date('2025-08-02T10:30:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary breakfast and network with other participants.',
  },
  {
    id: 8,
    title: 'Cup Stacking Competition',
    start: new Date('2025-08-02T11:00:00'),
    end: new Date('2025-08-02T12:00:00'),
    room: 'DCC 204',
    description: 'Are you good with your hands? Join our cup stacking competition and win a prize!',
  },
  {
    id: 9,
    title: 'Candy Chopsticks',
    start: new Date('2025-08-02T11:00:00'),
    end: new Date('2025-08-02T12:00:00'),
    room: 'DCC 208',
    description: 'Get ready for a sweet challenge!',
  },
  {
    id: 10,
    title: 'Carnival Games',
    start: new Date('2025-08-02T13:00:00'),
    end: new Date('2025-08-02T15:00:00'),
    room: 'TBD',
    description: 'Join us for a fun-filled afternoon of carnival games and activities!',
  },

  {
    id: 11,
    title: 'Lunch',
    start: new Date('2025-08-02T13:30:00'),
    end: new Date('2025-08-02T15:00:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary lunch and network with other participants.',
  },
  {
    id: 12,
    title: 'AWS Cloud Club TMU Workshop',
    start: new Date('2025-08-02T15:30:00'),
    end: new Date('2025-08-02T16:30:00'),
    room: 'DCC 208',
    description: '',
  },
  // {
  //   id: 13,
  //   title: 'Resume Roast',
  //   start: new Date('2025-08-02T16:30:00'),
  //   end: new Date('2025-08-02T17:30:00'),
  //   room: 'DCC 208',
  //   description: 'TBD',
  // },
  {
    id: 14,
    title: 'Dinner',
    start: new Date('2025-08-02T21:00:00'),
    end: new Date('2025-08-02T22:30:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary dinner and network with other participants.',
  },
  {
    id: 15,
    title: 'Family Feud',
    start: new Date('2025-08-02T23:00:00'),
    end: new Date('2025-08-02T24:00:00'),
    room: 'DCC 208',
    description: 'Get ready for a sweet challenge!',
  },
  {
    id: 16,
    title: 'Typing Contest',
    start: new Date('2025-08-02T23:00:00'),
    end: new Date('2025-08-02T24:00:00'),
    room: 'TBD',
    description: 'Get ready for a sweet challenge!',
  },
  {
    id: 17,
    title: 'Spicy Noodle Challenge',
    start: new Date('2025-08-03T01:30:00'),
    end: new Date('2025-08-03T02:30:00'),
    room: 'DCC 103 /104',
    description: 'Think you can handle the heat? Join our spicy noodle challenge and win a prize!',
  },
  {
    id: 18,
    title: 'Breakfast',
    start: new Date('2025-08-03T09:00:00'),
    end: new Date('2025-08-03T10:00:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary breakfast and network with other participants.',
  },
  {
    id: 19,
    title: 'Judging',
    start: new Date('2025-08-03T11:00:00'),
    end: new Date('2025-08-03T16:30:00'),
    room: 'DCC 103 / 104',
    description: 'Judging will take place in DCC 103 / 104. Please ensure your project is ready for review by the judges.',
  },
  {
    id: 20,
    title: 'Closing Ceremony',
    start: new Date('2025-08-03T17:00:00'),
    end: new Date('2025-08-03T18:00:00'),
    room: 'DCC 208',
    description: 'Join us for the closing ceremony where we will announce the winners and celebrate the achievements of all participants!!',
  },
  {
    id: 21,
    title: 'Lunch',
    start: new Date('2025-08-03T12:00:00'),
    end: new Date('2025-08-03T13:00:00'),
    room: 'TBD',
    description: 'Enjoy a complimentary lunch and network with other participants.',
  },
  {
    id: 22,
    title: 'Dinner',
    start: new Date('2025-08-03T18:00:00'),
    end: new Date('2025-08-03T19:00:00'),
    room: 'DCC 103 / 104',
    description: 'Enjoy a complimentary dinner and network with other participants.',
  },
  {
    id: 23,
    title: 'Wellness Workshop Board Game Cafe',
    start: new Date('2025-08-03T12:00:00'),
    end: new Date('2025-08-03T16:00:00'),
    room: 'TBD',
    description: 'Join us for a relaxing evening of board games and wellness activities.',
  },


];

const days = [
  new Date(2025, 7, 1), // August 1, 2025
  new Date(2025, 7, 2), // August 2, 2025
  new Date(2025, 7, 3), // August 3, 2025
];

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CustomScheduler() {
  const [selected, setSelected] = useState<Event | null>(null);
  const [currentDay, setCurrentDay] = useState(0);

  const filteredEvents = allEvents.filter(e => {
    const dayStart = startOfDay(days[currentDay]);
    const dayEnd = endOfDay(days[currentDay]);
    // Only include events that start before the end of the day and end after the start of the day,
    // but exclude events that end exactly at midnight of the next day unless they also start that day.
    return (
      e.start <= dayEnd &&
      e.end > dayStart &&
      !(e.end.getTime() === dayEnd.getTime() + 1 && e.start < dayStart)
    );
  });

  const positionedEvents = filteredEvents.map((event, _, arr) => {
    const overlappingEvents = arr.filter(e =>
      areIntervalsOverlapping(
        { start: event.start, end: event.end },
        { start: e.start, end: e.end }
      )
    );

    const sorted = overlappingEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    const index = sorted.findIndex(e => e.id === event.id);
    const totalCols = sorted.length;

    return { ...event, column: index, totalCols };
  });

  const pxPerHour = 64; // Fixed height for consistency

  return (

    // <div>
    //   <h1 className="text-2xl font-bold mb-4">Coming soon!</h1>
    // </div>
    <div className="p-2 sm:p-6 max-w-full sm:max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📅 TerraHacks Schedule</h1>

      <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4 overflow-x-auto">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setCurrentDay(index)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium border transition whitespace-nowrap ${
              index === currentDay ? 'bg-[#63acc4] text-white' : 'bg-white border-blue-300 text-[#63acc4] hover:bg-[#b0d7e5] hover:text-white'
            }`}
          >
            {formatDate(day, 'MMMM do')}
          </button>
        ))}
      </div>

      <div
        className="relative border rounded-lg overflow-hidden"
        style={{ height: '70vh', minHeight: 400, maxHeight: 1536 }}
      >
        <div className="flex h-full overflow-y-auto">
          {/* Hour labels */}
          <div className="w-14 sm:w-20 border-r bg-gray-50 flex-shrink-0" style={{ minHeight: `${24 * pxPerHour}px` }}>
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-[10px] sm:text-xs text-gray-500 p-1 border-b border-gray-200 flex items-start"
                style={{ height: `${pxPerHour}px` }}
              >
                {formatDate(new Date(2025, 0, 1, hour), 'h a')}
              </div>
            ))}
          </div>
          
          {/* Events grid */}
          <div className="flex-1 relative" style={{ minHeight: `${24 * pxPerHour}px` }}>
            {/* Grid lines background - This is the key fix! */}
            <div className="absolute inset-0 pointer-events-none" style={{ height: `${24 * pxPerHour}px` }}>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="absolute w-full border-b border-gray-200"
                  style={{
                    top: `${hour * pxPerHour}px`,
                    height: `${pxPerHour}px`,
                  }}
                />
              ))}
            </div>
            
            {/* Events */}
            {positionedEvents.map(event => {
              const top = getHours(event.start) * pxPerHour + (event.start.getMinutes() / 60) * pxPerHour;
              const height = differenceInMinutes(event.end, event.start) * (pxPerHour / 60);
              const width = 100 / event.totalCols;
              const left = event.column * width;

              return (
                <div
                  key={event.id}
                  onClick={() => setSelected(event)}
                  className="absolute bg-[#b0d7e5] border-l-4 border-[#63acc4] rounded-md px-1 sm:px-2 py-1 shadow cursor-pointer hover:bg-white z-10"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    width: `${width}%`,
                    left: `${left}%`,
                    minWidth: 120,
                  }}
                >
                  <div className="text-xs sm:text-sm font-bold text-[#19414e] truncate">{event.title}</div>
                  <div className="text-xs sm:text-sm font-semibold text-[#19414e] truncate">{event.room}</div>
                  <div className="text-[12px] sm:text-xs text-[#19414e]">
                    {formatDate(event.start, 'h:mm a')} - {formatDate(event.end, 'h:mm a')}
                  </div>
                </div>
              );
            })}
            
            {/* Total height spacer to ensure full 24-hour grid */}
            <div style={{ height: `${24 * pxPerHour}px` }} />
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-[95vw] max-w-md shadow-xl relative">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl">
              ✕
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-2">{selected.title}</h2>
            <p className="text-gray-500 text-xs sm:text-base">
              {formatDate(selected.start, 'eeee, MMMM d, yyyy • h:mm a')}<br />
              to {formatDate(selected.end, 'h:mm a')}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Room:</span> {selected.room}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-700">{selected.description}</p>
          </div>
        </div>
      )}
    </div>

  );
}