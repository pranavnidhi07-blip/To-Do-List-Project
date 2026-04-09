╔══════════════════════════════════════════════════════════════╗
║                    TASKMASTER QUICK START                    ║
╚══════════════════════════════════════════════════════════════╝

📋 FIRST TIME SETUP (DO THIS NOW):
────────────────────────────────────────────────────────────────
1. pkill server && lsof -ti:8081 | xargs kill -9
2. cmake --build build
3. chmod +x start.sh
4. ./start.sh
5. Open browser: http://localhost:8081
6. Try adding a task!

📝 WANT SAMPLE DATA?
────────────────────────────────────────────────────────────────
   (In a NEW terminal tab):
   ./add-sample-tasks.sh
   
   Then refresh browser (Cmd+R)
   ⚠️  Only run ONCE to avoid duplicates!

🔄 EVERY DAY WORKFLOW:
────────────────────────────────────────────────────────────────
   Start:  ./start.sh
   Use:    http://localhost:8081
   Stop:   pkill server && lsof -ti:8081 | xargs kill -9

🎬 DEMO DAY:
────────────────────────────────────────────────────────────────
   1. ./start.sh
   2. ./add-sample-tasks.sh (if fresh start)
   3. Open: http://localhost:8081
   4. Show: Add task, Calendar, Analytics, Complete task

🐛 IF BROKEN:
────────────────────────────────────────────────────────────────
   pkill server && lsof -ti:8081 | xargs kill -9
   ./start.sh

💡 REMEMBER:
────────────────────────────────────────────────────────────────
   ✓ Always use http://localhost:8081 (NOT file://)
   ✓ Frontend changes = just refresh browser
   ✓ Backend changes = rebuild + restart
   ✓ Keep server terminal open while using app
   ✓ Use separate terminal for commands

📖 MORE HELP:
────────────────────────────────────────────────────────────────
   Read: COMPLETE-GUIDE.md (detailed instructions)
   Read: HOW-TO-RUN.md (troubleshooting)

════════════════════════════════════════════════════════════════
