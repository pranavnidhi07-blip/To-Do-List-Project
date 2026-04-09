#!/bin/bash

echo "======================================"
echo "📝 Adding Sample Tasks"
echo "======================================"
echo ""

# Check if tasks already exist
TASK_COUNT=$(curl -s http://localhost:8080/api/tasks | grep -o '"id"' | wc -l)
if [ "$TASK_COUNT" -gt 0 ]; then
    echo "⚠️  Warning: You already have $TASK_COUNT tasks!"
    echo "This will add 12 MORE tasks."
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

API="http://localhost:8080/api/tasks"

echo "Adding sample tasks..."

# Task 1: Work - Today - High Priority
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Complete C++ Project",
  "description": "Finish the TaskMaster application with all features",
  "category": "work",
  "priority": 1,
  "due_date": "2026-04-04",
  "due_time": "17:00",
  "reminder_time": "16:30",
  "notes": "Demo for professor tomorrow"
}' > /dev/null

# Task 2: Study - Today - Medium Priority
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Prepare for Database Exam",
  "description": "Review chapters 5-8 for midterm",
  "category": "study",
  "priority": 2,
  "due_date": "2026-04-04",
  "due_time": "20:00",
  "notes": "Focus on SQL joins and indexing"
}' > /dev/null

# Task 3: Shopping - Today
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Buy Groceries",
  "description": "Milk, eggs, bread, vegetables",
  "category": "shopping",
  "priority": 2,
  "due_date": "2026-04-04",
  "due_time": "18:00"
}' > /dev/null

# Task 4: Personal - Yesterday (will be overdue) 
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Call Mom",
  "description": "Check in about weekend plans",
  "category": "personal",
  "priority": 1,
  "due_date": "2026-04-03",
  "due_time": "19:00"
}' > /dev/null

# Task 5: Movies - This weekend
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Watch Inception",
  "description": "Christopher Nolan masterpiece",
  "category": "movies",
  "priority": 3,
  "notes": "Friends recommended this"
}' > /dev/null

# Task 6: Work - Tomorrow
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Team Meeting",
  "description": "Weekly standup with development team",
  "category": "work",
  "priority": 2,
  "due_date": "2026-04-05",
  "due_time": "10:00",
  "reminder_time": "09:45"
}' > /dev/null

# Task 7: Study - Yesterday (completed)
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Finish Algorithms Assignment",
  "description": "Binary search tree implementation",
  "category": "study",
  "priority": 1,
  "due_date": "2026-04-03",
  "due_time": "23:59"
}' > /dev/null

# Task 8: Shopping - Weekend
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Buy Birthday Gift for Sarah",
  "description": "Check her wishlist on Amazon",
  "category": "shopping",
  "priority": 2,
  "notes": "Budget: $50"
}' > /dev/null

# Task 9: Personal - Today
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Gym Workout",
  "description": "Leg day - squats and deadlifts",
  "category": "personal",
  "priority": 2,
  "due_date": "2026-04-04",
  "due_time": "19:00"
}' > /dev/null

# Task 10: Wishlist
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Learn React",
  "description": "Build a personal portfolio website",
  "category": "wishlist",
  "priority": 3,
  "notes": "Udemy course bookmarked"
}' > /dev/null

# Task 11: Work - High Priority
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Code Review for PR #245",
  "description": "Review authentication module changes",
  "category": "work",
  "priority": 1,
  "due_date": "2026-04-04",
  "due_time": "15:00"
}' > /dev/null

# Task 12: Movies
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "title": "Watch Interstellar",
  "description": "Sci-fi movie night",
  "category": "movies",
  "priority": 3
}' > /dev/null

echo "✅ Sample tasks added successfully!"
echo ""
echo "Now completing some tasks..."

# Get task IDs and complete a few
TASK_ID=$(curl -s http://localhost:8080/api/tasks | grep -o '"id":"task_[0-9]*"' | head -1 | cut -d'"' -f4)
if [ ! -z "$TASK_ID" ]; then
  curl -s -X POST "http://localhost:8080/api/tasks/$TASK_ID/toggle" > /dev/null
  echo "✅ Marked one task as completed"
fi

echo ""
echo "🎉 All done! Refresh your browser at http://localhost:8081"
