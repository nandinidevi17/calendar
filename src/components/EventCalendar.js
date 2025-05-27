import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Plus, Edit3, Trash2, Search, Filter, ChevronLeft, ChevronRight, X, Save, AlertCircle } from 'lucide-react';
import EventForm from './EventForm';

const LOCAL_STORAGE_KEY = 'calendar-events';

const EventCalendar = () => {
  console.log('EventCalendar rendering...');
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    // Initialize events from localStorage
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [conflicts, setConflicts] = useState([]);
  const [viewMode, setViewMode] = useState('month'); // 'day', 'week', 'month'

  const categories = [
    { value: 'work', label: 'Work', color: 'bg-blue-500' },
    { value: 'personal', label: 'Personal', color: 'bg-green-500' },
    { value: 'health', label: 'Health', color: 'bg-red-500' },
    { value: 'social', label: 'Social', color: 'bg-purple-500' },
    { value: 'other', label: 'Other', color: 'bg-gray-500' }
  ];

  const [eventForm, setEventForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    description: '',
    category: 'personal',
    recurrence: 'none',
    customRecurrence: 1,
    weeklyDays: [],
    endDate: ''
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
      console.log('Events saved to localStorage:', events);
      checkConflicts();
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  const checkConflicts = useCallback(() => {
    const conflictList = [];
    const sortedEvents = [...events].sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
    
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      for (let j = i + 1; j < sortedEvents.length; j++) {
        const event1 = sortedEvents[i];
        const event2 = sortedEvents[j];
        
        if (event1.date === event2.date && event1.time === event2.time) {
          conflictList.push({ event1: event1.id, event2: event2.id });
        }
      }
    }
    setConflicts(conflictList);
  }, [events]);

  const generateRecurringEvents = (baseEvent, startDate, endDate) => {
    const recurringEvents = [];
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
    
    let current = new Date(start);
    
    while (current <= end) {
      if (current > start) {
        recurringEvents.push({
          ...baseEvent,
          id: `${baseEvent.id}-${current.toISOString().split('T')[0]}`,
          date: current.toISOString().split('T')[0],
          isRecurring: true,
          parentId: baseEvent.id
        });
      }
      
      switch (baseEvent.recurrence) {
        case 'daily':
          current.setDate(current.getDate() + 1);
          break;
        case 'weekly':
          if (baseEvent.weeklyDays.length > 0) {
            let nextDay = new Date(current);
            nextDay.setDate(nextDay.getDate() + 1);
            while (!baseEvent.weeklyDays.includes(nextDay.getDay()) && nextDay <= end) {
              nextDay.setDate(nextDay.getDate() + 1);
            }
            current = nextDay;
          } else {
            current.setDate(current.getDate() + 7);
          }
          break;
        case 'monthly':
          current.setMonth(current.getMonth() + 1);
          break;
        case 'custom':
          current.setDate(current.getDate() + (baseEvent.customRecurrence || 1));
          break;
        default:
          current = new Date(end.getTime() + 1);
      }
    }
    
    return recurringEvents;
  };

  const getAllEvents = () => {
    const allEvents = [...events];
    
    events.filter(event => event.recurrence !== 'none').forEach(event => {
      const recurring = generateRecurringEvents(event, event.date, event.endDate);
      allEvents.push(...recurring);
    });
    
    return allEvents;
  };

  const filteredEvents = getAllEvents().filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const hasConflict = (eventId) => {
    return conflicts.some(conflict => conflict.event1 === eventId || conflict.event2 === eventId);
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      description: '',
      category: 'personal',
      recurrence: 'none',
      customRecurrence: 1,
      weeklyDays: [],
      endDate: ''
    });
    setEditingEvent(null);
  };

  const handleDateClick = (date) => {
    // Check if the date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
    
    if (date < today) {
      alert("Cannot create events in the past!");
      return;
    }
    
    setSelectedDate(date);
    // Format date without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    setEventForm(prev => ({
      ...prev,
      date: formattedDate
    }));
    setShowEventForm(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      category: event.category,
      recurrence: event.recurrence || 'none',
      customRecurrence: event.customRecurrence || 1,
      weeklyDays: event.weeklyDays || [],
      endDate: event.endDate || ''
    });
    setShowEventForm(true);
  };

  const handleFormSubmit = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    const eventData = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time,
      description: eventForm.description,
      category: eventForm.category,
      recurrence: eventForm.recurrence,
      customRecurrence: eventForm.customRecurrence,
      weeklyDays: eventForm.weeklyDays,
      endDate: eventForm.endDate
    };

    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? eventData : event
      ));
    } else {
      setEvents(prev => [...prev, eventData]);
    }

    setShowEventForm(false);
    resetForm();
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      setShowEventForm(false);
      resetForm();
    }
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDate) => {
    e.preventDefault();
    if (draggedEvent && targetDate) {
      const newDate = formatDate(targetDate);
      if (draggedEvent.isRecurring) {
        // For recurring events, create a new standalone event
        const newEvent = {
          ...draggedEvent,
          id: Date.now().toString(),
          date: newDate,
          isRecurring: false,
          parentId: undefined
        };
        setEvents(prev => [...prev, newEvent]);
      } else {
        // For regular events, update the date
        setEvents(prev => prev.map(event => 
          event.id === draggedEvent.id 
            ? { ...event, date: newDate }
            : event
        ));
      }
    }
    setDraggedEvent(null);
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getDays = () => {
    switch (viewMode) {
      case 'day':
        return [currentDate];
      case 'week':
        return getWeekDays(currentDate);
      case 'month':
      default:
        return getDaysInMonth(currentDate);
    }
  };

  const navigateDate = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (viewMode) {
        case 'day':
          newDate.setDate(prev.getDate() + direction);
          break;
        case 'week':
          newDate.setDate(prev.getDate() + (direction * 7));
          break;
        case 'month':
          newDate.setMonth(prev.getMonth() + direction);
          break;
      }
      return newDate;
    });
  };

  const getHeaderText = () => {
    const options = { month: 'long', year: 'numeric' };
    switch (viewMode) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', { ...options, day: 'numeric' });
      case 'week':
        const weekStart = getWeekDays(currentDate)[0];
        const weekEnd = getWeekDays(currentDate)[6];
        return `${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
      case 'month':
      default:
        return currentDate.toLocaleDateString('en-US', options);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
        return;
      }

      switch(e.key.toLowerCase()) {
        case 'n':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setEditingEvent(null);
            setEventForm({
              title: '',
              date: new Date().toISOString().split('T')[0],
              time: '',
              description: '',
              category: 'personal',
              recurrence: 'none',
              customRecurrence: 1,
              weeklyDays: [],
              endDate: ''
            });
            setShowEventForm(true);
          }
          break;
        case 'arrowleft':
          if (e.altKey) {
            e.preventDefault();
            navigateDate(-1);
          }
          break;
        case 'arrowright':
          if (e.altKey) {
            e.preventDefault();
            navigateDate(1);
          }
          break;
        case 'd':
          if (e.altKey) {
            e.preventDefault();
            setViewMode('day');
          }
          break;
        case 'w':
          if (e.altKey) {
            e.preventDefault();
            setViewMode('week');
          }
          break;
        case 'm':
          if (e.altKey) {
            e.preventDefault();
            setViewMode('month');
          }
          break;
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            document.querySelector('input[type="text"]')?.focus();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Add a keyboard shortcuts help modal
  const [showShortcuts, setShowShortcuts] = useState(false);

  const ShortcutsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Keyboard Shortcuts</h3>
          <button
            onClick={() => setShowShortcuts(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Ctrl/⌘ + N</div>
            <div>Create new event</div>
            <div className="font-medium">Alt + →</div>
            <div>Next period</div>
            <div className="font-medium">Alt + ←</div>
            <div>Previous period</div>
            <div className="font-medium">Alt + D</div>
            <div>Daily view</div>
            <div className="font-medium">Alt + W</div>
            <div>Weekly view</div>
            <div className="font-medium">Alt + M</div>
            <div>Monthly view</div>
            <div className="font-medium">Ctrl/⌘ + F</div>
            <div>Focus search</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Event Calendar</h1>
          </div>
          
          {/* View Mode, Search/Filter, and Keyboard Shortcuts */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowShortcuts(true)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              title="Show keyboard shortcuts"
            >
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">?</kbd>
            </button>
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 capitalize ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateDate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <h2 className="text-2xl font-semibold text-gray-800">{getHeaderText()}</h2>
          
          <button
            onClick={() => navigateDate(1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Conflicts Warning */}
        {conflicts.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">
              {conflicts.length} event conflict{conflicts.length > 1 ? 's' : ''} detected. Check events with red borders.
            </span>
          </div>
        )}

        {/* Calendar Grid */}
        <div className={`grid gap-1 ${
          viewMode === 'month' ? 'grid-cols-7' : 
          viewMode === 'week' ? 'grid-cols-7' : 
          'grid-cols-1'
        } mb-6`}>
          {/* Day Headers */}
          {(viewMode === 'month' || viewMode === 'week') && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center font-semibold text-gray-600 bg-gray-100">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {getDays().map((day, index) => {
            const isPastDay = day && new Date(day.setHours(0, 0, 0, 0)) < new Date().setHours(0, 0, 0, 0);
            
            return (
              <div
                key={index}
                className={`${
                  viewMode === 'day' ? 'min-h-[600px]' : 'min-h-32'
                } p-2 border border-gray-200 cursor-pointer transition-colors ${
                  day ? 'hover:bg-blue-50' : 'bg-gray-50'
                } ${day && isToday(day) ? 'bg-blue-100 border-blue-300' : ''}
                ${isPastDay ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                onClick={() => day && !isPastDay && handleDateClick(day)}
                onDragOver={handleDragOver}
                onDrop={(e) => day && !isPastDay && handleDrop(e, day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-blue-700' : isPastDay ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {viewMode === 'day' ? getHeaderText() : day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getEventsForDate(day).map(event => {
                        const category = categories.find(cat => cat.value === event.category);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded cursor-pointer transition-all ${category?.color || 'bg-gray-500'} text-white hover:shadow-md ${
                              hasConflict(event.id) ? 'ring-2 ring-red-500' : ''
                            } ${isPastDay ? 'opacity-75' : ''}`}
                            draggable={!event.isRecurring && !isPastDay}
                            onDragStart={(e) => !isPastDay && handleDragStart(e, event)}
                            onClick={(e) => handleEventClick(event, e)}
                            title={`${event.title} at ${event.time}${hasConflict(event.id) ? ' (CONFLICT)' : ''}`}
                          >
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="truncate">{event.title}</span>
                              {viewMode === 'day' && (
                                <span className="ml-2 text-xs opacity-75">{event.time}</span>
                              )}
                            </div>
                            {viewMode === 'day' && event.description && (
                              <div className="mt-1 text-xs opacity-75 truncate">{event.description}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Event Button */}
        <button
          onClick={() => {
            setEditingEvent(null);
            setEventForm({
              title: '',
              date: new Date().toISOString().split('T')[0],
              time: '',
              description: '',
              category: 'personal',
              recurrence: 'none',
              customRecurrence: 1,
              weeklyDays: [],
              endDate: ''
            });
            setShowEventForm(true);
          }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Event Form Modal */}
        {showEventForm && (
          <EventForm
            eventForm={eventForm}
            setEventForm={setEventForm}
            editingEvent={editingEvent}
            onSubmit={handleFormSubmit}
            onDelete={handleDeleteEvent}
            onClose={() => {
              setShowEventForm(false);
              resetForm();
            }}
            categories={categories}
          />
        )}

        {showShortcuts && <ShortcutsModal />}
      </div>
    </div>
  );
};

export default EventCalendar;