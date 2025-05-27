# Event Calendar Application

A dynamic, interactive event calendar built with React that allows users to manage their schedule effectively. This application supports event creation, editing, deletion, and includes features like recurring events, drag-and-drop rescheduling, and event conflict management.

## 🌟 Key Features

### Core Features
- 📅 Multiple calendar views (Daily, Weekly, Monthly)
- ➕ Add, edit, and delete events
- 🔄 Recurring event support (Daily, Weekly, Monthly, Custom)
- 🖱️ Drag-and-drop event rescheduling
- ⚠️ Event conflict detection and management
- 🔍 Event filtering and search functionality
- 💾 Local storage persistence
- 📱 Responsive design
- ⌨️ Power user keyboard shortcuts
- ♿ Accessibility features

### Advanced Features
- **Smart Date Handling**
  - Timezone-aware event management
  - Intelligent recurring event patterns
  - Past date restrictions

- **Enhanced User Experience**
  - Keyboard shortcuts for power users
  - Drag and drop interface
  - Real-time conflict detection
  - Instant search and filtering

- **Performance Optimizations**
  - Efficient state management
  - Optimized rendering
  - Smart event caching
  - Debounced search

### Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus management
- Screen reader friendly notifications
## 📸 Screenshots

### 🔷 Full Calendar View with All Categories
![Full Calendar]((https://github.com/nandinidevi17/calendar/blob/4e9101b9645de1c13ce336eef65447de25f27f1c/src/assets/calendar-full.png))

### 🔵 Filtered by Category: Work
![Work Category](https://github.com/nandinidevi17/calendar/blob/4e9101b9645de1c13ce336eef65447de25f27f1c/src/assets/calendar-work.png)

### 🟢 Filtered by Category: Personal
![Personal Category](https://github.com/nandinidevi17/calendar/blob/4e9101b9645de1c13ce336eef65447de25f27f1c/src/assets/calendar-personal.png)


### Keyboard Shortcuts
- `Ctrl/⌘ + N`: Create new event
- `Alt + →`: Next period
- `Alt + ←`: Previous period
- `Alt + D`: Daily view
- `Alt + W`: Weekly view
- `Alt + M`: Monthly view
- `Ctrl/⌘ + F`: Focus search

## 🛠️ Technology Stack

### Core Technologies
- React 18 with Hooks
- Modern JavaScript (ES6+)
- Tailwind CSS for styling
- Local Storage for persistence

### Key Libraries
- date-fns for date manipulation
- Lucide React for icons
- React DnD for drag and drop

### Development Tools
- ESLint for code quality
- Prettier for code formatting
- React Testing Library for tests
- Chrome DevTools for debugging

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-calendar.git
   ```

2. Navigate to the project directory:
   ```bash
   cd event-calendar
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📖 Usage

### Creating an Event
1. Use `Ctrl/⌘ + N` or click the "+" button
2. Fill in the event details
3. Set recurrence pattern if needed
4. Click "Create Event"

### Power User Features
- Use keyboard shortcuts for quick navigation
- Drag and drop events between dates
- Quick search with `Ctrl/⌘ + F`
- View switching with `Alt + D/W/M`

### Event Management
- Create, edit, and delete events
- Set recurring patterns
- Manage conflicts
- Filter and search events

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets (iPad, Android tablets)
- Mobile devices (iOS, Android)

## 🔒 Security

- Input sanitization
- XSS protection
- Secure local storage handling
- No sensitive data exposure

## 🎯 Future Enhancements

- [ ] Google Calendar integration
- [ ] Dark mode support
- [ ] Multiple calendars
- [ ] Event sharing
- [ ] Email notifications
- [ ] Offline support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Open source community for inspiration
- All contributors who helped improve the project
