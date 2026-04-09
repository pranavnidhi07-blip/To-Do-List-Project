# TaskMaster - How to Run

## 🚀 Simple Workflow

### First Time Setup (ONE TIME ONLY)
```bash
# 1. Build the project
cmake -S . -B build
cmake --build build

# 2. Make scripts executable
chmod +x start.sh
chmod +x add-sample-tasks.sh
```

### Every Time You Want to Run TaskMaster

**Just run this ONE command:**
```bash
./start.sh
```

That's it! Then open your browser to: **http://localhost:8081**

---

## 📝 Adding Sample Tasks (Optional)

If you want some sample tasks for your demo:
```bash
./add-sample-tasks.sh
```

This adds 12 sample tasks. **Only run this once!** (It will warn you if tasks already exist)

---

## 🛑 Stopping the Servers

```bash
pkill server && lsof -ti:8081 | xargs kill -9
```

---

## 🔧 When Do I Need to Rebuild?

### ❌ NO rebuild needed for:
- Changing HTML files (frontend/index.html)
- Changing CSS files (frontend/styles.css)
- Changing JavaScript (frontend/script.js)
- Just refresh your browser (Cmd+R)

### ✅ YES rebuild needed for:
- Changing C++ files (src/*.cpp, src/*.h)
- After rebuild, restart servers with `./start.sh`

**Rebuild command:**
```bash
pkill server                 # Stop old server
cmake --build build          # Rebuild
./start.sh                   # Start new server
```

---

## 🎯 Full Demo Workflow

```bash
# 1. Start everything
./start.sh

# 2. Open browser
#    Go to: http://localhost:8081

# 3. Add sample data (optional, for demo)
#    In a NEW terminal tab:
./add-sample-tasks.sh

# 4. Refresh browser
#    Press Cmd+R in browser

# 5. Now add your own tasks manually through the UI!
```

---

## 🐛 Troubleshooting

### "Port already in use"
```bash
pkill server && lsof -ti:8081 | xargs kill -9
./start.sh
```

### "Can't connect to backend"
Check that BOTH servers are running:
- Backend: http://localhost:8080/api/tasks (should return JSON)
- Frontend: http://localhost:8081 (should show the website)

### "Tasks not showing up"
1. Refresh browser (Cmd+R)
2. Check browser console (Right-click → Inspect → Console)
3. Make sure you opened http://localhost:8081 (NOT file://)

---

## 📁 Important Files

- `start.sh` - Starts both servers (USE THIS!)
- `add-sample-tasks.sh` - Adds demo data (optional)
- `data/tasks.json` - Your tasks are saved here
- `frontend/` - Website files (HTML/CSS/JS)
- `src/` - C++ backend code

---

## 💡 Quick Tips

1. **Always use http://localhost:8081** in browser, never open index.html directly
2. **Use separate terminal tabs** - one for servers, one for commands
3. **Frontend changes = just refresh** browser
4. **Backend changes = rebuild + restart** servers
5. **Don't run add-sample-tasks.sh multiple times** - it duplicates tasks!
