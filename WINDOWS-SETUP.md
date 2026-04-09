# Habit Tracker API Documentation

Base URL: `http://localhost:8080/api`

## Overview

This API provides endpoints for managing habits and tracking daily completions. All responses are in JSON format.

---

## Endpoints

### 1. Get All Habits

**GET** `/api/habits`

Retrieves all habits.

**Response (200 OK):**
```json
[
  {
    "id": "habit_123456",
    "name": "Morning Exercise",
    "description": "30 minutes of cardio",
    "completed_dates": ["2026-04-01", "2026-04-02", "2026-04-04"],
    "streak": 2,
    "created_at": "2026-04-01"
  }
]
```

---

### 2. Get Specific Habit

**GET** `/api/habits/{id}`

Retrieves a single habit by ID.

**Parameters:**
- `id` (path) - Habit ID

**Response (200 OK):**
```json
{
  "id": "habit_123456",
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "completed_dates": ["2026-04-01", "2026-04-02"],
  "streak": 2,
  "created_at": "2026-04-01"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Habit not found"
}
```

---

### 3. Create New Habit

**POST** `/api/habits`

Creates a new habit.

**Request Body:**
```json
{
  "name": "Morning Exercise",
  "description": "30 minutes of cardio"  // optional
}
```

**Response (201 Created):**
```json
{
  "id": "habit_123456",
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "completed_dates": [],
  "streak": 0,
  "created_at": "2026-04-04"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Name is required"
}
```

---

### 4. Update Habit

**PUT** `/api/habits/{id}`

Updates an existing habit's name and description.

**Parameters:**
- `id` (path) - Habit ID

**Request Body:**
```json
{
  "name": "Evening Exercise",
  "description": "45 minutes workout"
}
```

**Response (200 OK):**
```json
{
  "id": "habit_123456",
  "name": "Evening Exercise",
  "description": "45 minutes workout",
  "completed_dates": ["2026-04-01", "2026-04-02"],
  "streak": 2,
  "created_at": "2026-04-01"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Habit not found"
}
```

---

### 5. Delete Habit

**DELETE** `/api/habits/{id}`

Deletes a habit permanently.

**Parameters:**
- `id` (path) - Habit ID

**Response (200 OK):**
```json
{
  "message": "Habit deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Habit not found"
}
```

---

### 6. Mark Habit Complete

**POST** `/api/habits/{id}/complete`

Marks a habit as completed for a specific date.

**Parameters:**
- `id` (path) - Habit ID

**Request Body:**
```json
{
  "date": "2026-04-04"  // YYYY-MM-DD format
}
```

**Response (200 OK):**
```json
{
  "id": "habit_123456",
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "completed_dates": ["2026-04-01", "2026-04-02", "2026-04-04"],
  "streak": 3,
  "created_at": "2026-04-01"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Date is required (YYYY-MM-DD)"
}
```

OR

```json
{
  "error": "Already marked or habit not found"
}
```

---

### 7. Unmark Habit Complete

**DELETE** `/api/habits/{id}/complete`

Removes a completion mark for a specific date.

**Parameters:**
- `id` (path) - Habit ID

**Request Body:**
```json
{
  "date": "2026-04-04"  // YYYY-MM-DD format
}
```

**Response (200 OK):**
```json
{
  "id": "habit_123456",
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "completed_dates": ["2026-04-01", "2026-04-02"],
  "streak": 2,
  "created_at": "2026-04-01"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Date not found or habit not found"
}
```

---

## Data Models

### Habit Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (auto-generated) |
| `name` | string | Habit name (required) |
| `description` | string | Optional description |
| `completed_dates` | array[string] | Array of completion dates in YYYY-MM-DD format |
| `streak` | number | Current consecutive completion streak |
| `created_at` | string | Creation date in YYYY-MM-DD format |

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## CORS Headers

All API responses include CORS headers:
```
Access-Control-Allow-Origin: *
Content-Type: application/json
```

---

## Example Usage

### JavaScript (Fetch API)

```javascript
// Get all habits
const habits = await fetch('http://localhost:8080/api/habits')
  .then(res => res.json());

// Create habit
const newHabit = await fetch('http://localhost:8080/api/habits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    name: 'Read Daily',
    description: '30 minutes'
  })
}).then(res => res.json());

// Mark complete
await fetch('http://localhost:8080/api/habits/habit_123456/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ date: '2026-04-04' })
});
```

### cURL

```bash
# Get all habits
curl http://localhost:8080/api/habits

# Create habit
curl -X POST http://localhost:8080/api/habits \
  -H "Content-Type: application/json" \
  -d '{"name":"Read Daily","description":"30 minutes"}'

# Mark complete
curl -X POST http://localhost:8080/api/habits/habit_123456/complete \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-04-04"}'
```

---

## Notes

- All dates must be in `YYYY-MM-DD` format
- Habit IDs are auto-generated as `habit_XXXXXX`
- Streaks are automatically calculated based on consecutive completion dates
- Data is persisted in `data/habits.json`
