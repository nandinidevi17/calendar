// import React from 'react';
// import { Clock, MoreHorizontal } from 'lucide-react';

// const CalendarGrid = ({ 
//   days, 
//   currentDate, 
//   events, 
//   categories, 
//   conflicts,
//   onDateClick, 
//   onEventClick, 
//   onDragStart, 
//   onDragOver, 
//   onDrop,
//   isToday,
//   formatDate,
//   getEventsForDate,
//   hasConflict
// }) => {
//   return (
//     <div className="grid grid-cols-7 gap-1 calendar-grid">
//       {/* Day Headers */}
//       {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
//         <div key={day} className="p-4 text-center font-semibold text-gray-600 bg-gray-100 border border-gray-200">
//           <span className="hidden sm:inline">{day}</span>
//           <span className="sm:hidden">{day.slice(0, 3)}</span>
//         </div>
//       ))}
      
//       {/* Calendar Days */}
//       {days.map((day, index) => (
//         <CalendarDay
//           key={index}
//           day={day}
//           events={day ? getEventsForDate(day) : []}
//           categories={categories}
//           isToday={day ? isToday(day) : false}
//           hasConflict={hasConflict}
//           onDateClick={onDateClick}
//           onEventClick={onEventClick}
//           onDragStart={onDragStart}
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//         />
//       ))}
//     </div>
//   );
// };


// const CalendarDay = ({ 
//   day, 
//   events, 
//   categories, 
//   isToday, 
//   hasConflict,
//   onDateClick, 
//   onEventClick, 
//   onDragStart, 
//   onDragOver, 
//   onDrop 
// }) => {
//   const [showAllEvents, setShowAllEvents] = React.useState(false);
//   const maxVisibleEvents = 3;
//   const isPast = (date) => {
//   const today = new Date();
//   return date < new Date(today.setHours(0, 0, 0, 0));
// };

//   if (!day) {
//     return <div className="min-h-32 p-2 bg-gray-50 border border-gray-200"></div>;
//   }

//   const visibleEvents = showAllEvents ? events : events.slice(0, maxVisibleEvents);
//   const hiddenCount = events.length - maxVisibleEvents;

//   return (
// <div
//   className={`min-h-32 p-2 border border-gray-200 cursor-pointer transition-all duration-200
//     ${isToday ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' : 'bg-white'}
//     ${isPast(day) ? 'opacity-40 pointer-events-none' : 'hover:bg-blue-50 hover:border-blue-300'}
//   `}
//   onClick={() => {
//     if (isPast(day)) {
//       alert("🚫 Cannot add event in the past!");
//       return;
//     }
//     onDateClick(day);
//   }}
//   onDragOver={onDragOver}
//   onDrop={(e) => onDrop(e, day)}
// >

//       <div className={`text-sm font-medium mb-2 ${
//         isToday ? 'text-blue-700 font-bold' : 'text-gray-700'
//       }`}>
//         {day.getDate()}
//         {isToday && <span className="ml-1 text-xs">(Today)</span>}
//       </div>
      
//       <div className="space-y-1">
//         {visibleEvents.map(event => {
//           const category = categories.find(cat => cat.value === event.category);
//           const isConflicted = hasConflict(event.id);
          
//           return (
//             <EventItem
//               key={event.id}
//               event={event}
//               category={category}
//               isConflicted={isConflicted}
//               onEventClick={onEventClick}
//               onDragStart={onDragStart}
//             />
//           );
//         })}
        
//         {hiddenCount > 0 && !showAllEvents && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAllEvents(true);
//             }}
//             className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 flex items-center justify-center gap-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
//           >
//             <MoreHorizontal className="w-3 h-3" />
//             +{hiddenCount} more
//           </button>
//         )}
        
//         {showAllEvents && hiddenCount > 0 && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAllEvents(false);
//             }}
//             className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 text-center"
//           >
//             Show less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const EventItem = ({ event, category, isConflicted, onEventClick, onDragStart }) => {
//   return (
//     <div
//       className={`text-xs p-2 rounded cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md event-item ${
//         category?.color || 'bg-gray-500'
//       } text-white ${
//         isConflicted ? 'ring-2 ring-red-500 conflict-event' : ''
//       } ${
//         event.isRecurring ? 'opacity-80 border-l-4 border-white' : ''
//       }`}
//       draggable={!event.isRecurring}
//       onDragStart={(e) => onDragStart(e, event)}
//       onClick={(e) => onEventClick(event, e)}
//       title={`${event.title} at ${event.time}${isConflicted ? ' (CONFLICT)' : ''}${event.isRecurring ? ' (Recurring)' : ''}`}
//     >
//       <div className="flex items-center gap-1 mb-1">
//         <Clock className="w-3 h-3 flex-shrink-0" />
//         <span className="font-medium truncate">{event.time}</span>
//       </div>
//       <div className="font-medium truncate">{event.title}</div>
//       {event.description && (
//         <div className="text-xs opacity-75 truncate mt-1">{event.description}</div>
//       )}
//     </div>
//   );
// };

// export default CalendarGrid;

// import React from 'react';
// import { Clock, MoreHorizontal } from 'lucide-react';

// const CalendarGrid = ({
//   days,
//   currentDate,
//   events,
//   categories,
//   conflicts,
//   onDateClick,
//   onEventClick,
//   onDragStart,
//   onDragOver,
//   onDrop,
//   isToday,
//   formatDate,
//   getEventsForDate,
//   hasConflict,
// }) => {
//   const isPast = (date) => {
//     const today = new Date();
//     return date < new Date(today.setHours(0, 0, 0, 0));
//   };

//   return (
//     <div className="grid grid-cols-7 gap-1 calendar-grid">
//       {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
//         (day) => (
//           <div
//             key={day}
//             className="p-4 text-center font-semibold text-gray-600 bg-gray-100 border border-gray-200"
//           >
//             <span className="hidden sm:inline">{day}</span>
//             <span className="sm:hidden">{day.slice(0, 3)}</span>
//           </div>
//         )
//       )}

//       {days.map((day, index) => (
//         <CalendarDay
//           key={index}
//           day={day}
//           events={day ? getEventsForDate(day) : []}
//           categories={categories}
//           isToday={day ? isToday(day) : false}
//           hasConflict={hasConflict}
//           onDateClick={onDateClick}
//           onEventClick={onEventClick}
//           onDragStart={onDragStart}
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           isPast={day ? isPast(day) : false}
//         />
//       ))}
//     </div>
//   );
// };

// const CalendarDay = ({
//   day,
//   events,
//   categories,
//   isToday,
//   hasConflict,
//   onDateClick,
//   onEventClick,
//   onDragStart,
//   onDragOver,
//   onDrop,
//   isPast,
// }) => {
//   const [showAllEvents, setShowAllEvents] = React.useState(false);
//   const maxVisibleEvents = 3;

//   if (!day)
//     return (
//       <div className="min-h-32 p-2 bg-gray-50 border border-gray-200"></div>
//     );

//   const visibleEvents = showAllEvents ? events : events.slice(0, maxVisibleEvents);
//   const hiddenCount = events.length - maxVisibleEvents;

//   return (
//     <div
//       className={`min-h-32 p-2 border border-gray-200 cursor-pointer transition-all duration-200
//         ${isToday ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' : 'bg-white'}
//         ${isPast ? 'opacity-40 pointer-events-none' : 'hover:bg-blue-50 hover:border-blue-300'}`}
//       onClick={() => {
//         if (isPast) {
//           alert("🚫 You can't create events in the past, mynaa!");
//           return;
//         }
//         onDateClick(day);
//       }}
//       onDragOver={onDragOver}
//       onDrop={(e) => onDrop(e, day)}
//     >
//       <div
//         className={`text-sm font-medium mb-2 ${
//           isToday ? 'text-blue-700 font-bold' : 'text-gray-700'
//         }`}
//       >
//         {day.getDate()}
//         {isToday && <span className="ml-1 text-xs">(Today)</span>}
//       </div>

//       <div className="space-y-1">
//         {visibleEvents.map((event) => {
//           const category = categories.find((cat) => cat.value === event.category);
//           const isConflicted = hasConflict(event.id);
//           return (
//             <EventItem
//               key={event.id}
//               event={event}
//               category={category}
//               isConflicted={isConflicted}
//               onEventClick={onEventClick}
//               onDragStart={onDragStart}
//             />
//           );
//         })}

//         {hiddenCount > 0 && !showAllEvents && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAllEvents(true);
//             }}
//             className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 flex items-center justify-center gap-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
//           >
//             <MoreHorizontal className="w-3 h-3" /> +{hiddenCount} more
//           </button>
//         )}

//         {showAllEvents && hiddenCount > 0 && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAllEvents(false);
//             }}
//             className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 text-center"
//           >
//             Show less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const EventItem = ({
//   event,
//   category,
//   isConflicted,
//   onEventClick,
//   onDragStart,
// }) => {
//   return (
//     <div
//       className={`text-xs p-2 rounded cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md event-item
//         ${category?.color || 'bg-gray-500'} text-white
//         ${isConflicted ? 'ring-2 ring-red-500 conflict-event' : ''}
//         ${event.isRecurring ? 'opacity-80 border-l-4 border-white' : ''}`}
//       draggable={!event.isRecurring}
//       onDragStart={(e) => onDragStart(e, event)}
//       onClick={(e) => onEventClick(event, e)}
//       title={`${event.title} at ${event.time}${
//         isConflicted ? ' (CONFLICT)' : ''
//       }${event.isRecurring ? ' (Recurring)' : ''}`}
//     >
//       <div className="flex items-center gap-1 mb-1">
//         <Clock className="w-3 h-3 flex-shrink-0" />
//         <span className="font-medium truncate">{event.time}</span>
//       </div>
//       <div className="font-medium truncate">{event.title}</div>
//       {event.description && (
//         <div className="text-xs opacity-75 truncate mt-1">{event.description}</div>
//       )}
//     </div>
//   );
// };

// export default CalendarGrid;

import React from 'react';
import { Clock, MoreHorizontal } from 'lucide-react';

const CalendarGrid = ({
  days,
  view = 'month', // 'day', 'week', 'month'
  events,
  categories,
  onDateClick,
  onEventClick,
  onDragStart,
  onDragOver,
  onDrop,
  isToday,
  getEventsForDate,
  hasConflict,
}) => {
  const isPast = (date) => {
    const today = new Date();
    return date < new Date(today.setHours(0, 0, 0, 0));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className={`calendar-grid grid gap-1 ${view === 'week' ? 'grid-cols-7' : view === 'day' ? 'grid-cols-1' : 'grid-cols-7'}`}>
      {view === 'month' &&
        daysOfWeek.map((day) => (
          <div key={day} className="p-4 text-center font-semibold text-gray-600 bg-gray-100 border border-gray-200">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 3)}</span>
          </div>
        ))}

      {days.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          events={day ? getEventsForDate(day) : []}
          categories={categories}
          isToday={day ? isToday(day) : false}
          hasConflict={hasConflict}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          isPast={day ? isPast(day) : false}
        />
      ))}
    </div>
  );
};

const CalendarDay = ({
  day,
  events,
  categories,
  isToday,
  hasConflict,
  onDateClick,
  onEventClick,
  onDragStart,
  onDragOver,
  onDrop,
  isPast,
}) => {
  const [showAllEvents, setShowAllEvents] = React.useState(false);
  const maxVisibleEvents = 3;

  if (!day) return <div className="min-h-32 p-2 bg-gray-50 border border-gray-200"></div>;

  const visibleEvents = showAllEvents ? events : events.slice(0, maxVisibleEvents);
  const hiddenCount = events.length - maxVisibleEvents;

  return (
    <div
      className={`min-h-32 p-2 border border-gray-200 cursor-pointer transition-all duration-200
        ${isToday ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' : 'bg-white'}
        ${isPast ? 'opacity-40 pointer-events-none' : 'hover:bg-blue-50 hover:border-blue-300'}`}
      onClick={() => {
        if (isPast) {
          alert("🚫 You can't create events in the past, mynaa!");
          return;
        }
        onDateClick(day.toISOString().split('T')[0]);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, day)}
    >
      <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>
        {day.getDate()}
        {isToday && <span className="ml-1 text-xs">(Today)</span>}
      </div>

      <div className="space-y-1">
        {visibleEvents.map((event) => {
          const category = categories.find((cat) => cat.value === event.category);
          const isConflicted = hasConflict(event.id);
          return (
            <EventItem
              key={event.id}
              event={event}
              category={category}
              isConflicted={isConflicted}
              onEventClick={onEventClick}
              onDragStart={onDragStart}
            />
          );
        })}

        {hiddenCount > 0 && !showAllEvents && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAllEvents(true);
            }}
            className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 flex items-center justify-center gap-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <MoreHorizontal className="w-3 h-3" /> +{hiddenCount} more
          </button>
        )}

        {showAllEvents && hiddenCount > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAllEvents(false);
            }}
            className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 text-center"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

const EventItem = ({ event, category, isConflicted, onEventClick, onDragStart }) => {
  return (
    <div
      className={`text-xs p-2 rounded cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md event-item
        ${category?.color || 'bg-gray-500'} text-white
        ${isConflicted ? 'ring-2 ring-red-500 conflict-event' : ''}
        ${event.isRecurring ? 'opacity-80 border-l-4 border-white' : ''}`}
      draggable={!event.isRecurring}
      onDragStart={(e) => onDragStart(e, event)}
      onClick={(e) => onEventClick(event, e)}
      title={`${event.title} at ${event.time}${isConflicted ? ' (CONFLICT)' : ''}${event.isRecurring ? ' (Recurring)' : ''}`}
    >
      <div className="flex items-center gap-1 mb-1">
        <Clock className="w-3 h-3 flex-shrink-0" />
        <span className="font-medium truncate">{event.time}</span>
      </div>
      <div className="font-medium truncate">{event.title}</div>
      {event.description && (
        <div className="text-xs opacity-75 truncate mt-1">{event.description}</div>
      )}
    </div>
  );
};

export default CalendarGrid;

