// === src/hooks/useEvents.js ===
import useLocalStorage from './useLocalStorage';
import { isConflict } from '../utils/eventUtils';

const useEvents = () => {
  const [events, setEvents] = useLocalStorage('events', []);
  const [conflictMsg, setConflictMsg] = useLocalStorage('conflictMsg', '');

  const addEvent = (newEvent) => {
    if (isConflict(events, newEvent)) {
      setConflictMsg('⚠️ Event conflict detected.');
      return false;
    }
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setConflictMsg('');
    return true;
  };

  const updateEvent = (updatedEvent) => {
    if (isConflict(events, updatedEvent)) {
      setConflictMsg('⚠️ Conflict with another event.');
      return false;
    }
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setConflictMsg('');
    return true;
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    conflictMsg,
  };
};

export default useEvents;
