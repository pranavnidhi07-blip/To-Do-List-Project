# Habit Tracker - Architecture Documentation

## 📐 System Overview

This is a **full-stack habit tracking application** with:
- **Backend**: C++ using Crow web framework
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Storage**: JSON file-based persistence

---

## 🗂️ Project Structure

```
project/
│
├── src/                          # Backend source code
│   ├── main.cpp                  # Entry point, API routes
│   ├── habit_service.cpp         # Business logic implementation
│   └── habit_service.h           # Service interface
│
├── frontend/                     # Frontend files
│   ├── index.html                # UI structure
│   ├── styles.css                # Styling
│   └── script.js                 # Frontend logic & API calls
│
├── data/                         # Data storage
│   └── habits.json               # JSON file storing all habits
│
├── docs/                         # Documentation
│   └── api.md                    # API endpoint documentation
│
├── build/                        # Build artifacts (generated)
│
├── CMakeLists.txt                # Build configuration
└── README.md                     # Project overview
```

---

## 🔄 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ index.html   │  │  styles.css  │  │  script.js   │     │
│  │ (Structure)  │  │  (Design)    │  │  (Logic)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                           │                                 │
│                           │ HTTP Requests (Fetch API)       │
│                           ↓                                 │
└───────────────────────────────────────────────────────────┘
                            │
                            │ REST API (JSON)
                            │
┌───────────────────────────────────────────────────────────┐
│                        BACKEND                            │
│  ┌──────────────────────────────────────────────────────┐│
│  │              main.cpp (API Layer)                     ││
│  │  • Routes HTTP requests to handlers                   ││
│  │  • Validates input                                    ││
│  │  • Returns JSON responses                             ││
│  └──────────────────────────────────────────────────────┘│
│                           │                                │
│                           │ Function calls                 │
│                           ↓                                │
│  ┌──────────────────────────────────────────────────────┐│
│  │       habit_service.cpp (Business Logic)              ││
│  │  • CRUD operations (Create, Read, Update, Delete)     ││
│  │  • Streak calculation                                 ││
│  │  • Date management                                    ││
│  │  • Data validation                                    ││
│  └──────────────────────────────────────────────────────┘│
│                           │                                │
│                           │ File I/O                       │
│                           ↓                                │
└───────────────────────────────────────────────────────────┘
                            │
                            │ Read/Write JSON
                            ↓
┌───────────────────────────────────────────────────────────┐
│                    DATA STORAGE                           │
│  ┌──────────────────────────────────────────────────────┐│
│  │              data/habits.json                         ││
│  │  [                                                    ││
│  │    {                                                  ││
│  │      "id": "habit_123456",                            ││
│  │      "name": "Exercise",                              ││
│  │      "completed_dates": ["2026-04-04"],               ││
│  │      "streak": 1                                      ││
│  │    }                                                  ││
│  │  ]                                                    ││
│  └──────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Examples

### Example 1: Creating a New Habit

```
USER ACTION: Fills form and clicks "Add Habit"
    ↓
[Frontend - script.js]
    → Captures form data (name, description)
    → Sends POST request to /api/habits
    ↓
[Backend - main.cpp]
    → Receives POST /api/habits
    → Parses JSON request body
    → Validates: name is required
    → Calls habit_service.create_habit(name, description)
    ↓
[Service - habit_service.cpp]
    → Generates unique ID
    → Creates Habit object with current date
    → Converts to JSON
    → Appends to habits array
    → Writes to data/habits.json
    → Returns created Habit
    ↓
[Backend - main.cpp]
    → Returns 201 Created with habit JSON
    ↓
[Frontend - script.js]
    → Receives response
    → Reloads all habits from server
    → Updates UI to show new habit
    ↓
USER: Sees new habit in the list
```

### Example 2: Marking Habit Complete

```
USER ACTION: Clicks "Complete Today" button
    ↓
[Frontend - script.js]
    → Gets today's date (YYYY-MM-DD)
    → Sends POST to /api/habits/{id}/complete
    → Body: { "date": "2026-04-04" }
    ↓
[Backend - main.cpp]
    → Receives POST /api/habits/{id}/complete
    → Extracts habit ID and date
    → Calls habit_service.mark_habit_complete(id, date)
    ↓
[Service - habit_service.cpp]
    → Finds habit by ID in JSON data
    → Checks if date already exists
    → Adds date to completed_dates array
    → Recalculates streak
    → Saves to data/habits.json
    → Returns updated Habit
    ↓
[Backend - main.cpp]
    → Returns 200 OK with updated habit JSON
    ↓
[Frontend - script.js]
    → Receives response
    → Reloads habits from server
    → Updates UI (button changes to "Completed", streak updates)
    ↓
USER: Sees updated streak and button state
```

---

## 🔧 File Responsibilities

### Backend Files

#### `src/main.cpp`
**Role**: API Layer / Router

**Responsibilities**:
- Initialize Crow web server
- Define HTTP routes (endpoints)
- Parse HTTP requests
- Validate request data
- Call service layer functions
- Format and return HTTP responses
- Handle errors and return appropriate status codes
- Serve static frontend files (future enhancement)

**Key Functions**:
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create habit
- `PUT /api/habits/{id}` - Update habit
- `DELETE /api/habits/{id}` - Delete habit
- `POST /api/habits/{id}/complete` - Mark complete
- `DELETE /api/habits/{id}/complete` - Unmark complete

---

#### `src/habit_service.h`
**Role**: Service Interface

**Responsibilities**:
- Define `Habit` struct
- Declare `HabitService` class interface
- Define public API for habit operations

**Key Structures**:
```cpp
struct Habit {
    std::string id;
    std::string name;
    std::string description;
    std::vector<std::string> completed_dates;
    int streak;
    std::string created_at;
};
```

---

#### `src/habit_service.cpp`
**Role**: Business Logic Layer

**Responsibilities**:
- Implement CRUD operations
- Manage JSON file I/O
- Generate unique IDs
- Calculate habit streaks
- Validate data
- Handle date operations
- Convert between Habit objects and JSON

**Key Methods**:
- `load_from_file()` - Read habits.json
- `save_to_file()` - Write to habits.json
- `create_habit()` - Add new habit
- `update_habit()` - Modify existing habit
- `delete_habit()` - Remove habit
- `mark_habit_complete()` - Add completion date
- `update_streak()` - Calculate consecutive days

---

### Frontend Files

#### `frontend/index.html`
**Role**: UI Structure

**Responsibilities**:
- Define page layout
- Create form elements
- Define habit card templates
- Include CSS and JavaScript

**Key Sections**:
- Header with title
- Add habit form
- Habits list container
- Edit modal

---

#### `frontend/styles.css`
**Role**: Visual Design

**Responsibilities**:
- Define colors and typography
- Create responsive layout
- Style buttons and forms
- Add hover effects and animations
- Make UI mobile-friendly

**Key Features**:
- Gradient background
- Card-based design
- Button states (hover, active)
- Modal styling
- Responsive breakpoints

---

#### `frontend/script.js`
**Role**: Frontend Logic

**Responsibilities**:
- Make HTTP requests to backend API
- Update DOM based on data
- Handle user interactions
- Manage UI state
- Format dates
- Display errors

**Key Functions**:
- `loadHabits()` - Fetch all habits from API
- `renderHabits()` - Update UI with habit data
- `addHabit()` - Send new habit to API
- `toggleComplete()` - Mark/unmark completion
- `updateHabit()` - Update habit details
- `deleteHabit()` - Remove habit

---

### Data Files

#### `data/habits.json`
**Role**: Persistent Storage

**Structure**:
```json
[
  {
    "id": "habit_123456",
    "name": "Morning Exercise",
    "description": "30 minutes of cardio",
    "completed_dates": ["2026-04-01", "2026-04-04"],
    "streak": 2,
    "created_at": "2026-04-01"
  }
]
```

**Responsibilities**:
- Store all habit data
- Persist across server restarts
- Human-readable format
- Easy to backup

---

## 🌐 Frontend-Backend Communication

### Communication Protocol: HTTP REST API

**Request Format**:
```
Method: GET | POST | PUT | DELETE
URL: http://localhost:8080/api/habits
Headers: Content-Type: application/json
Body: JSON data (for POST/PUT)
```

**Response Format**:
```
Status: 200 | 201 | 400 | 404 | 500
Headers: 
  - Content-Type: application/json
  - Access-Control-Allow-Origin: *
Body: JSON data or error message
```

### Example Communication:

**Frontend Request (JavaScript)**:
```javascript
fetch('http://localhost:8080/api/habits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    name: 'Read Daily',
    description: '30 minutes'
  })
})
```

**Backend Processing (C++)**:
```cpp
CROW_ROUTE(app, "/api/habits").methods(crow::HTTPMethod::Post)
([&habit_service](const crow::request& req){
    auto body = json::parse(req.body);
    auto habit = habit_service.create_habit(
        body["name"], 
        body["description"]
    );
    return crow::response(habit_to_json(habit).dump());
});
```

**Backend Response**:
```json
{
  "id": "habit_789012",
  "name": "Read Daily",
  "description": "30 minutes",
  "completed_dates": [],
  "streak": 0,
  "created_at": "2026-04-04"
}
```

---

## 🎯 Design Principles

### 1. **Separation of Concerns**
- Frontend handles UI only
- Backend handles business logic
- Service layer manages data storage
- Each file has a single, clear responsibility

### 2. **RESTful API Design**
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Resource-based URLs (`/api/habits/{id}`)
- JSON for data exchange
- Proper status codes

### 3. **No Over-Engineering**
- Simple JSON file storage (no database needed)
- Vanilla JavaScript (no frameworks)
- Direct API calls (no state management library)
- Clear, readable code

### 4. **Beginner-Friendly**
- Clear file organization
- Descriptive variable names
- Comments where helpful
- Simple data structures

---

## 🚀 How to Extend

### Add a New Feature (e.g., Habit Categories)

**1. Update Data Model** (`habit_service.h`):
```cpp
struct Habit {
    // ... existing fields
    std::string category;  // NEW
};
```

**2. Update Service** (`habit_service.cpp`):
```cpp
Habit HabitService::create_habit(
    const std::string& name,
    const std::string& description,
    const std::string& category  // NEW parameter
) {
    habit.category = category;  // NEW
    // ... rest of logic
}
```

**3. Update API** (`main.cpp`):
```cpp
CROW_ROUTE(app, "/api/habits").methods(crow::HTTPMethod::Post)
([&habit_service](const crow::request& req){
    auto body = json::parse(req.body);
    auto habit = habit_service.create_habit(
        body["name"],
        body["description"],
        body["category"]  // NEW
    );
    // ...
});
```

**4. Update Frontend** (`script.js`):
```javascript
async function addHabit() {
    const category = document.getElementById('habit-category').value;
    // ... add to request body
}
```

**5. Update UI** (`index.html` & `styles.css`):
```html
<input type="text" id="habit-category" placeholder="Category">
```

---

## 🔐 Security Considerations

**Current Level**: Basic (suitable for local development)

**Improvements for Production**:
1. Input validation (prevent injection attacks)
2. Rate limiting
3. Authentication/Authorization
4. HTTPS encryption
5. Database instead of JSON file
6. Backup strategy

---

## 📚 Learning Path

**Beginner → Intermediate → Advanced**

1. ✅ **Current**: JSON file storage, simple CRUD
2. ⬆️ **Next**: SQLite database, better error handling
3. 🚀 **Advanced**: User accounts, cloud deployment, mobile app

---

This architecture is designed to be:
- ✅ **Simple** - Easy to understand
- ✅ **Practical** - Works for real use
- ✅ **Extensible** - Easy to add features
- ✅ **Educational** - Clear patterns to learn from
