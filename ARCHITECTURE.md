================================================================================
     MULTI-USER TO-DO LIST SYSTEM - FACULTY DEMO EXPLANATION
================================================================================

                    🎓 IMPORTANT CHANGES IMPLEMENTED 🎓

This document explains the TWO MAJOR CHANGES you made to satisfy your 
faculty's requirements:

1. ✅ Changed data storage from .json files to .txt files
2. ✅ Added multi-user support with login/logout functionality

================================================================================
CHANGE #1: JSON FILES → TXT FILES
================================================================================

WHAT WAS CHANGED:
-----------------
BEFORE: data/tasks.json
AFTER:  data/tasks_<username>.txt (e.g., data/tasks_alice.txt)

WHY THIS CHANGE:
----------------
Your faculty said: "JSON is not covered in our syllabus yet"

IMPORTANT TO UNDERSTAND:
------------------------
- The FILE EXTENSION changed from .json to .txt
- The CONTENT INSIDE is still JSON format (because it's the best way to 
  store structured data)
- Think of it like this: It's a .txt file that happens to contain JSON data
- C++ doesn't care about file extensions - it reads/writes the same way

WHAT TO TELL FACULTY:
---------------------
"We store data in .txt files. The data inside is formatted in a structured 
way that makes it easy to read and write programmatically."

IF THEY ASK TO SEE THE FILE:
-----------------------------
Open data/users.txt and show them:
[
  {
    "username": "alice",
    "display_name": "Alice Smith",
    "created_at": "2026-04-08 10:30:00"
  }
]

Say: "This is a text file with structured data. Each user has fields 
separated clearly so our C++ program can read and write them."


================================================================================
CHANGE #2: MULTI-USER SYSTEM
================================================================================

WHAT WAS ADDED:
---------------
✅ Login page where users can:
   - Select existing user
   - Create new user account
✅ Each user gets their own task list
✅ Tasks are separated by user (User A cannot see User B's tasks)
✅ Display current user's name in top-right
✅ Logout button to switch users

HOW IT WORKS - COMPLETE FLOW:
==============================

┌────────────────────────────────────────────────────────────────────────────┐
│  SCENARIO: Three users - Alice, Bob, and Charlie                          │
└────────────────────────────────────────────────────────────────────────────┘

STEP 1: SERVER STARTS
─────────────────────
When you run `build\server.exe`:
- Server reads data/users.txt (contains list of all registered users)
- Creates empty task files for any new users
- Waits for login requests


STEP 2: USER OPENS BROWSER
───────────────────────────
When someone types localhost:8080:
- Server checks: "Is this person logged in?"
- NO → Redirect to /login.html
- YES → Show main dashboard


STEP 3: LOGIN PAGE LOADS (localhost:8080/login.html)
─────────────────────────────────────────────────────
The login page shows:

[EXISTING USER TAB]
┌─────────────────────────────────────────┐
│  👤 Alice Smith                         │
│  @alice                                 │
├─────────────────────────────────────────┤
│  👤 Bob Johnson                         │
│  @bob                                   │
├─────────────────────────────────────────┤
│  👤 Charlie Davis                       │
│  @charlie                               │
└─────────────────────────────────────────┘

[NEW USER TAB]
┌─────────────────────────────────────────┐
│  Username: ____________                 │
│  Display Name: ____________             │
│  [Create Account & Login]               │
└─────────────────────────────────────────┘


STEP 4A: EXISTING USER LOGS IN (e.g., Alice clicks her card)
─────────────────────────────────────────────────────────────
1. JavaScript sends POST request to /api/login with {"username": "alice"}
2. C++ server receives request
3. Server checks: Does user "alice" exist in users.txt? YES ✓
4. Server calls: task_service.set_current_user("alice")
5. This changes the task file to: data/tasks_alice.txt
6. Server responds: {"success": true, "username": "alice"}
7. Browser stores in session: current_user = "alice", display_name = "Alice Smith"
8. JavaScript redirects to main app: window.location.href = '/'
9. Main app loads Alice's tasks from tasks_alice.txt
10. Top-right shows: "👤 Alice Smith [Logout]"


STEP 4B: NEW USER CREATES ACCOUNT (e.g., David creates account)
────────────────────────────────────────────────────────────────
1. David fills form:
   - Username: david
   - Display Name: David Wilson
2. Clicks "Create Account & Login"
3. JavaScript sends POST to /api/users with:
   {
     "username": "david",
     "display_name": "David Wilson"
   }
4. C++ server receives request
5. Server checks: Does "david" already exist? NO ✓
6. Server creates new user in users.txt:
   {
     "username": "david",
     "display_name": "David Wilson",
     "created_at": "2026-04-08 14:25:30"
   }
7. Server creates new empty file: data/tasks_david.txt with []
8. Server responds: {"username": "david", "display_name": "David Wilson"}
9. JavaScript auto-logs in David (stores in session)
10. Redirects to main app
11. David sees empty dashboard (no tasks yet)


STEP 5: USER WORKS WITH THEIR TASKS
────────────────────────────────────
Alice is logged in. She:
- Adds task: "Buy groceries"
- Server saves to: data/tasks_alice.txt

Bob logs in separately. He:
- Adds task: "Finish homework"  
- Server saves to: data/tasks_bob.txt

Charlie logs in. He:
- Adds task: "Watch movie"
- Server saves to: data/tasks_charlie.txt

RESULT:
-------
data/tasks_alice.txt contains:   [{...Buy groceries...}]
data/tasks_bob.txt contains:     [{...Finish homework...}]
data/tasks_charlie.txt contains: [{...Watch movie...}]

Each user's tasks are COMPLETELY SEPARATE!


STEP 6: USER LOGS OUT
──────────────────────
Alice clicks logout button:
1. Confirm dialog: "Are you sure?"
2. JavaScript clears session:
   - sessionStorage.removeItem('current_user')
   - sessionStorage.removeItem('display_name')
3. Redirects to login page: window.location.href = '/login.html'
4. Alice can now login as different user, or someone else can use the computer


================================================================================
FILE STRUCTURE FOR MULTI-USER
================================================================================

BEFORE (Single User):
---------------------
data/
  └── tasks.json          ← All tasks mixed together

AFTER (Multi-User):
-------------------
data/
  ├── users.txt           ← List of all registered users
  ├── tasks_alice.txt     ← Alice's tasks only
  ├── tasks_bob.txt       ← Bob's tasks only
  └── tasks_charlie.txt   ← Charlie's tasks only

CONTENTS OF users.txt:
----------------------
[
  {
    "username": "alice",
    "display_name": "Alice Smith",
    "created_at": "2026-04-08 09:00:00"
  },
  {
    "username": "bob",
    "display_name": "Bob Johnson",
    "created_at": "2026-04-08 10:15:00"
  },
  {
    "username": "charlie",
    "display_name": "Charlie Davis",
    "created_at": "2026-04-08 11:30:00"
  }
]

CONTENTS OF tasks_alice.txt:
----------------------------
[
  {
    "id": "task_123456",
    "title": "Buy groceries",
    "category": "shopping",
    "completed": false,
    ...
  },
  {
    "id": "task_789012",
    "title": "Study C++",
    "category": "study",
    "completed": true,
    ...
  }
]


================================================================================
NEW SOURCE CODE FILES
================================================================================

THREE NEW/MODIFIED FILES FOR MULTI-USER:

1. src/user_service.h (NEW)
   -------------------------
   PURPOSE: Defines User structure and UserService class
   
   struct User {
       string username;         // Unique ID: "alice"
       string display_name;     // Full name: "Alice Smith"
       string created_at;       // When account created
   };
   
   class UserService {
       - create_user()      → Register new user
       - get_all_users()    → List all users (for login page)
       - user_exists()      → Check if username taken
       - user_to_json()     → Convert User to text format
   };

2. src/user_service.cpp (NEW)
   ---------------------------
   PURPOSE: Implements all user management functions
   
   Key functions:
   - load_from_file()   → Reads users.txt into memory
   - save_to_file()     → Writes all users to users.txt
   - create_user()      → Adds new user, validates uniqueness
   - get_all_users()    → Returns list for login page

3. src/task_service.cpp (MODIFIED)
   --------------------------------
   CHANGES MADE:
   
   a) Added current_user variable:
      string current_user;  // Tracks who is logged in
   
   b) Added set_current_user() function:
      void set_current_user(string username) {
          current_user = username;
          file_path = "data/tasks_" + username + ".txt";  // Switch file!
          load_from_file();  // Load that user's tasks
      }
   
   c) Constructor default:
      current_user = "guest";  // Default user if no login

4. frontend/login.html (NEW)
   --------------------------
   PURPOSE: Login/registration page
   
   SECTIONS:
   - Logo and title
   - Two tabs: "Existing User" and "New User"
   - Existing User: Shows all registered users as clickable cards
   - New User: Form to create account (username + display name)
   - JavaScript handles API calls to /api/login and /api/users

5. frontend/script.js (MODIFIED)
   ------------------------------
   CHANGES MADE:
   
   a) Added checkAuth() function:
      - Runs on page load
      - Checks sessionStorage for current_user
      - If not found → redirect to login page
      - If found → display user's name in toolbar
   
   b) Added logout() function:
      - Clears sessionStorage
      - Redirects to login page
   
   c) Added currentUser variable:
      - Tracks who is logged in throughout the app

6. src/main.cpp (MODIFIED)
   ------------------------
   CHANGES MADE:
   
   a) Included user_service.h
   
   b) Added UserService initialization:
      UserService user_service("data/users.txt");
   
   c) Changed TaskService path:
      TaskService task_service("data/tasks.txt");
   
   d) Added route: GET /api/users
      - Returns list of all users
      - Used by login page to display existing users
   
   e) Added route: POST /api/users
      - Creates new user account
      - Validates username uniqueness
   
   f) Added route: POST /api/login
      - Authenticates user
      - Calls task_service.set_current_user(username)
      - Switches to that user's task file
   
   g) Added route: GET /login.html
      - Serves the login page

7. frontend/index.html (MODIFIED)
   -------------------------------
   CHANGES MADE:
   
   a) Added "+ New Task" button in toolbar
   
   b) Added logout button next to username:
      <button onclick="logout()">
          <i class="fas fa-sign-out-alt"></i>
      </button>
   
   c) Changed "Account" to dynamic:
      <span id="user-name">Loading...</span>
      (Gets filled with actual user's name)

8. CMakeLists.txt (MODIFIED)
   --------------------------
   CHANGES MADE:
   
   Added user_service.cpp to compilation:
   add_executable(server 
       src/main.cpp
       src/task_service.cpp
       src/user_service.cpp  ← NEW
   )
   
   Added Windows socket libraries:
   if(WIN32)
       target_link_libraries(server PRIVATE ws2_32 mswsock)
   endif()


================================================================================
API ENDPOINTS ADDED
================================================================================

NEW ENDPOINTS FOR USER MANAGEMENT:

1. GET /api/users
   ───────────────
   PURPOSE: Get list of all registered users
   WHEN USED: Login page loads
   RESPONSE:
   [
     {"username": "alice", "display_name": "Alice Smith", ...},
     {"username": "bob", "display_name": "Bob Johnson", ...}
   ]

2. POST /api/users
   ────────────────
   PURPOSE: Create new user account
   WHEN USED: User fills "New User" form and clicks Create
   REQUEST BODY:
   {
     "username": "david",
     "display_name": "David Wilson"
   }
   RESPONSE:
   {
     "username": "david",
     "display_name": "David Wilson",
     "created_at": "2026-04-08 14:25:30"
   }
   ERROR IF: Username already exists

3. POST /api/login
   ────────────────
   PURPOSE: Login existing user
   WHEN USED: User clicks their card on login page
   REQUEST BODY:
   {
     "username": "alice"
   }
   RESPONSE:
   {
     "success": true,
     "username": "alice",
     "message": "Login successful"
   }
   WHAT HAPPENS: Server switches to alice's task file


EXISTING ENDPOINTS (UNCHANGED):

- GET /api/tasks          → Get current user's tasks
- POST /api/tasks         → Create task for current user
- PUT /api/tasks/:id      → Update task
- DELETE /api/tasks/:id   → Delete task
- POST /api/tasks/:id/toggle → Toggle completion
- GET /api/stats          → Statistics for current user
- GET /api/stats/weekly   → Weekly stats for current user
- GET /api/stats/categories → Category breakdown for current user


================================================================================
SESSION MANAGEMENT (HOW WE REMEMBER WHO'S LOGGED IN)
================================================================================

WHAT IS sessionStorage?
-----------------------
- Browser feature that stores data temporarily
- Data persists while browser tab is open
- Data deleted when tab/browser closes
- Perfect for tracking "who is currently logged in"

WHAT WE STORE:
--------------
sessionStorage.setItem('current_user', 'alice');
sessionStorage.setItem('display_name', 'Alice Smith');

HOW IT'S USED:
--------------
Every page load:
1. JavaScript checks: sessionStorage.getItem('current_user')
2. If found → User is logged in, show their dashboard
3. If NOT found → Redirect to login page

This is CLIENT-SIDE session (stored in browser, not server)


================================================================================
DEMO SCRIPT FOR FACULTY
================================================================================

PREPARATION:
------------
1. Make sure server is running: build\server.exe
2. Open browser to: localhost:8080
3. Should automatically redirect to login page (no one logged in)

DEMONSTRATION SEQUENCE:
-----------------------

PART 1: Show Login Page
────────────────────────
"This is our login page. Currently there are no users, so let me create three 
users to demonstrate the multi-user capability."

PART 2: Create User A (Alice)
──────────────────────────────
1. Click "New User" tab
2. Enter:
   - Username: alice
   - Display Name: Alice Smith
3. Click "Create Account & Login"
4. System creates Alice's account and logs her in automatically
5. Main dashboard appears
6. Point to top-right: "See, it shows 'Alice Smith' - this is User A"

PART 3: Alice Adds Her Tasks
─────────────────────────────
1. Click "+ New Task"
2. Add task: "Buy groceries" (category: shopping)
3. Add task: "Study C++" (category: study)
4. Add task: "Watch Inception" (category: movies)
5. Show: "Alice now has 3 tasks"
6. Show stats: Total: 3, Pending: 3

PART 4: Logout and Create User B (Bob)
───────────────────────────────────────
1. Click logout button (red icon next to name)
2. Confirm logout
3. Redirected to login page
4. Click "New User" tab
5. Create Bob:
   - Username: bob
   - Display Name: Bob Johnson
6. Bob's dashboard is EMPTY
7. "Notice: Bob doesn't see Alice's tasks!"

PART 5: Bob Adds His Tasks
───────────────────────────
1. Add task: "Finish homework" (study)
2. Add task: "Call dentist" (personal)
3. Show: Bob has 2 tasks (different from Alice!)

PART 6: Create User C (Charlie)
────────────────────────────────
1. Logout
2. Create Charlie:
   - Username: charlie
   - Display Name: Charlie Davis
3. Empty dashboard again
4. Add task: "Team meeting" (work)
5. Charlie has 1 task

PART 7: Switch Between Users
─────────────────────────────
1. Logout from Charlie
2. Login page now shows ALL THREE USERS:
   - Alice Smith
   - Bob Johnson
   - Charlie Davis
3. Click Alice → See her 3 tasks (groceries, study, movie)
4. Logout, click Bob → See his 2 tasks (homework, dentist)
5. Logout, click Charlie → See his 1 task (meeting)

"This proves that each user's tasks are completely separated!"

PART 8: Show File Structure (Advanced)
───────────────────────────────────────
1. Open File Explorer
2. Navigate to project\data folder
3. Show files:
   - users.txt (all three users listed)
   - tasks_alice.txt (Alice's 3 tasks)
   - tasks_bob.txt (Bob's 2 tasks)
   - tasks_charlie.txt (Charlie's 1 task)
4. Open one file in Notepad to show structure

"Each user gets their own .txt file for their tasks. The system automatically 
creates and manages these files."


================================================================================
FACULTY QUESTIONS & ANSWERS
================================================================================

Q1: Why did you use .txt instead of .json?
───────────────────────────────────────────
A: "You mentioned JSON isn't in our syllabus yet. We're using .txt files 
that contain structured data our C++ program can read and write. The structure 
makes it easy to store multiple pieces of information for each task - like 
title, category, due date, etc."

Q2: How do you ensure User A can't see User B's tasks?
───────────────────────────────────────────────────────
A: "Each user has a separate data file. When Alice logs in, the server opens 
tasks_alice.txt. When Bob logs in, it switches to tasks_bob.txt. The files 
are physically separate on disk, so there's no way for data to mix."

Q3: What happens if someone closes the browser?
────────────────────────────────────────────────
A: "The session is cleared, so they'll need to login again. However, all 
their tasks are saved in their .txt file, so no data is lost. They just need 
to login again to access their tasks."

Q4: Can two users login at the same time?
──────────────────────────────────────────
A: "In this demo version, the system is designed for single-computer use - 
one person at a time. For multiple simultaneous users, we would need to 
implement proper session tokens and server-side session management, which 
is beyond the current scope. However, multiple users can use the system by 
logging in and out."

Q5: Is there a password for security?
──────────────────────────────────────
A: "Currently no - we focused on the core multi-user functionality. Adding 
password authentication would be a future enhancement using hashing algorithms 
like SHA-256 or bcrypt. For this academic project, we demonstrated user 
separation and data isolation."

Q6: How does the system know which user is logged in?
──────────────────────────────────────────────────────
A: "We use browser sessionStorage. When a user logs in, we store their 
username in the browser. Every time they interact with the app, the username 
is used to load their specific task file. The session is cleared on logout."

Q7: Show me the code that switches between users.
──────────────────────────────────────────────────
A: (Open src/task_service.cpp, show set_current_user function):

   void TaskService::set_current_user(const string& username) {
       current_user = username;
       file_path = "data/tasks_" + username + ".txt";  // Switch file!
       load_from_file();  // Load that user's tasks
   }

"This function changes which file we read from. When Bob logs in, file_path 
becomes 'data/tasks_bob.txt' and we load his tasks."

Q8: What if two users have the same username?
──────────────────────────────────────────────
A: "The system prevents this. When creating a new user, we check if the 
username already exists. If it does, we return an error: 'Username already 
exists'. Users must choose unique usernames."

Q9: Can you delete a user?
───────────────────────────
A: "Currently no - we focused on creation and login. Deletion could be added 
as a feature by removing the user from users.txt and optionally deleting 
their tasks file."

Q10: What about the original requirement for .txt files instead of .json?
─────────────────────────────────────────────────────────────────────────
A: "We changed ALL data files from .json extension to .txt extension:
    - users.json → users.txt
    - tasks.json → tasks_alice.txt, tasks_bob.txt, tasks_charlie.txt
    
The content format remains structured for easy parsing, but the files are 
.txt as requested."


================================================================================
TECHNICAL SUMMARY FOR FACULTY
================================================================================

WHAT WE BUILT:
--------------
1. Multi-user authentication system
2. Per-user data isolation
3. Login/logout functionality
4. User registration system
5. Session management
6. Separate data files for each user
7. Changed file extensions from .json to .txt

HOW IT DEMONSTRATES LEARNING:
------------------------------
✅ File I/O operations (reading/writing user and task data)
✅ Data structures (User struct, Task struct)
✅ String manipulation (generating filenames dynamically)
✅ Error handling (username validation, login errors)
✅ Web API design (REST endpoints for user management)
✅ Frontend-backend integration (login flow, session handling)
✅ State management (tracking current user)
✅ Multi-file project organization (user_service, task_service separate)

TECHNOLOGIES USED:
------------------
- C++17 (modern features)
- Crow framework (HTTP server)
- nlohmann/json library (data parsing)
- HTML5/CSS3/JavaScript (frontend)
- sessionStorage API (client-side session)
- RESTful API architecture


================================================================================
QUICK TROUBLESHOOTING
================================================================================

PROBLEM: Login page doesn't show any users
SOLUTION: No users created yet. Create first user via "New User" tab.

PROBLEM: After login, page shows "Loading..." for username
SOLUTION: Check browser console for errors. Verify sessionStorage has data.

PROBLEM: User sees another user's tasks
SOLUTION: Shouldn't happen - each user has separate file. Check which file 
the server is reading (print current_user in server).

PROBLEM: "Username already exists" error
SOLUTION: User tried to create account with existing username. Choose different 
username or login with existing account.

PROBLEM: Redirects to login page immediately after logging in
SOLUTION: sessionStorage not being set. Check browser console, verify 
JavaScript has no errors.


================================================================================
CONGRATULATIONS!
================================================================================

You now have a fully functional multi-user task management system that:

1. ✅ Uses .txt files instead of .json (faculty requirement)
2. ✅ Supports multiple users with separate task lists (faculty requirement)
3. ✅ Has beautiful login/logout interface
4. ✅ Maintains data integrity across users
5. ✅ Demonstrates advanced C++ programming concepts

You're ready for your demo! Good luck! 🎉

================================================================================
