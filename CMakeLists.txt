#!/bin/bash
# Simple script to start both servers

echo "Starting C++ backend server..."
./build/server &
BACKEND_PID=$!

sleep 2

echo ""
echo "Starting frontend server..."
cd frontend
python3 -m http.server 8081 &
FRONTEND_PID=$!

echo ""
echo "=========================================="
echo "✅ Both servers are running!"
echo "=========================================="
echo "Backend API: http://localhost:8080"
echo "Frontend UI: http://localhost:8081"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait and cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
