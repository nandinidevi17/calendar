import { addDays, addWeeks, addMonths, parseISO, format } from 'date-fns';

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const createEvent = (eventData) => {
  return {
    id: generateId(),
    title: eventData.title,
    date: eventData.date,
    time: eventData.time,
    description: eventData.description || '',
    category: eventData.category || 'personal',
    recurrence: eventData.recurrence || 'none',
    customRecurrence: eventData.customRecurrence || 1,
    weeklyDays: eventData.weeklyDays || [],
    endDate: eventData.endDate || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const updateEvent = (existingEvent, updates) => {
  return {
    ...existingEvent,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

export const generateRecurringEvents = (baseEvent, startDate, endDate) => {
  const recurringEvents = [];
  const start = parseISO(startDate);
  const end = endDate ? parseISO(endDate) : addMonths(start, 12); // Default to 1 year if no end date
  
  let current = new Date(start);
  
  while (current <= end) {
    // Skip the original event date
    if (current > start) {
      recurringEvents.push({
        ...baseEvent,
        id: `${baseEvent.id}-${format(current, 'yyyy-MM-dd')}`,
        date: format(current, 'yyyy-MM-dd'),
        isRecurring: true,
        parentId: baseEvent.id
      });
    }
    
    // Calculate next occurrence based on recurrence type
    switch (baseEvent.recurrence) {
      case 'daily':
        current = addDays(current, 1);
        break;
      case 'weekly':
        if (baseEvent.weeklyDays && baseEvent.weeklyDays.length > 0) {
          // Find next occurrence based on selected days
          let nextDay = addDays(current, 1);
          while (!baseEvent.weeklyDays.includes(nextDay.getDay()) && nextDay <= end) {
            nextDay = addDays(nextDay, 1);
          }
          current = nextDay;
        } else {
          current = addWeeks(current, 1);
        }
        break;
      case 'monthly':
        current = addMonths(current, 1);
        break;
      case 'custom':
        current = addDays(current, baseEvent.customRecurrence || 1);
        break;
      default:
        current = new Date(end.getTime() + 1); // Break the loop
    }
  }
  
  return recurringEvents;
};

export const detectConflicts = (events) => {
  const conflicts = [];
  const sortedEvents = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA - dateTimeB;
  });
  
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    for (let j = i + 1; j < sortedEvents.length; j++) {
      const event1 = sortedEvents[i];
      const event2 = sortedEvents[j];
      
      if (event1.date === event2.date && event1.time === event2.time) {
        conflicts.push({
          event1: event1.id,
          event2: event2.id,
          date: event1.date,
          time: event1.time
        });
      }
    }
  }
  
  return conflicts;
};

export const filterEvents = (events, searchTerm, category) => {
  return events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' || event.category === category;
    
    return matchesSearch && matchesCategory;
  });
};

export const getEventsForDate = (events, date) => {
  const dateString = typeof date === 'string' ? date : format(date, 'yyyy-MM-dd');
  return events.filter(event => event.date === dateString);
};

export const sortEventsByTime = (events) => {
  return [...events].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
};

export const validateEvent = (eventData) => {
  const errors = [];
  
  if (!eventData.title || eventData.title.trim() === '') {
    errors.push('Event title is required');
  }
  
  if (!eventData.date) {
    errors.push('Event date is required');
  }
  
  if (!eventData.time) {
    errors.push('Event time is required');
  }
  
  if (eventData.recurrence === 'custom' && (!eventData.customRecurrence || eventData.customRecurrence < 1)) {
    errors.push('Custom recurrence must be at least 1 day');
  }
  
  if (eventData.recurrence === 'weekly' && eventData.weeklyDays && eventData.weeklyDays.length === 0) {
    errors.push('Please select at least one day for weekly recurrence');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};