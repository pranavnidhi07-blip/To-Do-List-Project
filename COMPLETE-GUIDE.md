# TaskMaster - Windows Setup Guide

## 📦 Transferring Project from Mac to Windows

### Step 1: Package the Project on Mac

On your Mac, run these commands:

```bash
cd /Users/keerthinidhiar/Documents/repos
zip -r taskmaster-project.zip project/ -x "project/build/*" "project/.git/*" "project/*.zip"
```

This creates `taskmaster-project.zip` excluding build files.

**Transfer this ZIP file to Windows** via:
- USB drive
- Email
- Cloud storage (Google Drive, OneDrive, Dropbox)
- GitHub (recommended - see below)

---

## 🔧 Windows System Requirements

- **OS:** Windows 10 or 11 (64-bit)
- **RAM:** 4GB minimum
- **Disk Space:** 2GB free

---

## 📥 Windows Installation Steps

### 1. Install Required Software Using Commands

**Open PowerShell as Administrator:**
- Press `Win + X`
- Click "Windows PowerShell (Admin)" or "Terminal (Admin)"

#### A. Install CMake
Run this command in PowerShell (Admin):
```powershell
winget install Kitware.CMake
```

Wait for installation to complete, then **restart PowerShell**.

To verify:
```powershell
cmake --version
```
Should show version 3.x.x

#### B. Install Visual Studio 2022 Build Tools (C++ Compiler)
Run this command in PowerShell (Admin):
```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

**After installation starts, you'll see a GUI window:**
1. In the Workloads tab, check: **"Desktop development with C++"**
2. Click "Install" button
3. Wait 15-30 minutes for installation
4. Restart computer when done

**Alternative: Visual Studio Community (if you want the full IDE):**
```powershell
winget install Microsoft.VisualStudio.2022.Community
```
Then select "Desktop development with C++" workload.

#### C. Install Git (Optional but recommended)
```powershell
winget install Git.Git
```

**Restart PowerShell** after all installations.

---

### ⚠️ If winget doesn't work:

**Install Chocolatey first (alternative package manager):**

In PowerShell (Admin), run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Then install packages:
```powershell
choco install cmake -y
choco install visualstudio2022buildtools --package-parameters "--add Microsoft.VisualStudio.Workload.VCTools" -y
choco install git -y
```

---

### 🌐 Manual Download (Last Resort Only)

**Only if commands above fail:**
- CMake: https://cmake.org/download/ (check "Add to PATH")
- Visual Studio: https://visualstudio.microsoft.com/downloads/
- Git: https://git-scm.com/download/win

---

## 🚀 Setting Up the Project on Windows

### Method 1: Using the ZIP File

1. **Extract the ZIP file**
   
   Open PowerShell or Command Prompt (regular, not admin):
   ```powershell
   cd C:\Users\YourName\Downloads
   tar -xf taskmaster-project.zip
   ```
   
   Or right-click ZIP → Extract All

2. **Navigate to project folder**
   ```powershell
   cd taskmaster-project\project
   ```
   
   (Adjust path if extracted elsewhere)

3. **Build the project**
   ```powershell
   cmake -S . -B build -G "Visual Studio 17 2022"
   cmake --build build --config Release
   ```
   
   First build takes 5-10 minutes (downloads dependencies).

4. **Run the server**
   ```powershell
   build\Release\server.exe
   ```

5. **Open browser**
   - Go to: `http://localhost:8080`

---

## 🎯 Important Windows-Specific Notes

### File Paths
- Windows uses backslashes: `build\server.exe` (not forward slashes)
- But CMake handles this automatically

### Firewall
First time running, Windows Firewall may ask:
- Click "Allow access" for both Private and Public networks

### Port Issues
If port 8080 is busy:
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

### Data Persistence
- Tasks are saved in: `data\tasks.json`
- This file works the same on Windows and Mac

---

## 🔄 Alternative: Using GitHub (Recommended)

### On Mac:
```bash
cd /Users/keerthinidhiar/Documents/repos/project
git init
git add .
git commit -m "Initial commit - TaskMaster project"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/taskmaster.git
git push -u origin main
```

### On Windows:

Open PowerShell or Command Prompt:
```powershell
cd C:\Users\YourName\Documents
git clone https://github.com/YOUR_USERNAME/taskmaster.git
cd taskmaster
cmake -S . -B build -G "Visual Studio 17 2022"
cmake --build build --config Release
build\Release\server.exe
```

---

## 📋 What Gets Transferred

### ✅ Included:
- All source code (`src/`)
- Frontend files (`frontend/`)
- Sample data (`data/tasks.json`)
- Build configuration (`CMakeLists.txt`)
- Documentation files

### ❌ Excluded (will be regenerated):
- `build/` folder (platform-specific)
- Compiled binaries
- CMake cache files

---

## 🐛 Troubleshooting Windows

### "CMake is not recognized"
- Restart Command Prompt after installing CMake
- Or manually add to PATH: `C:\Program Files\CMake\bin`

### "No compiler found"
- Make sure Visual Studio 2022 with C++ is installed
- Restart computer after VS installation

### "Cannot find nlohmann/json.hpp or crow.h"
- CMake automatically downloads these
- Check internet connection
- Delete `build/` and rebuild

### Build takes forever
- First build downloads dependencies (5-10 minutes)
- Subsequent builds are much faster

### Server crashes on start
- Check if another program uses port 8080
- Try running as Administrator (right-click cmd → Run as administrator)

---

## ✅ Verification

After setup, you should see:
```
===========================================
📋 To-Do List & Planner Server
===========================================
Dashboard: http://localhost:8080
API Base: http://localhost:8080/api/tasks
===========================================
(2026-04-04 ...) [INFO] Crow/master server is running at http://0.0.0.0:8080
```

Open browser to `http://localhost:8080` and you should see all your tasks!

---

## 📞 Team Member Quick Checklist

**Commands to run in PowerShell (Admin):**
- [ ] `winget install Kitware.CMake`
- [ ] `winget install Microsoft.VisualStudio.2022.BuildTools` (then select C++ workload)
- [ ] `winget install Git.Git`
- [ ] Restart computer

**Commands to run in PowerShell (regular):**
- [ ] Extract ZIP or: `git clone <repo-url>`
- [ ] `cd project-folder`
- [ ] `cmake -S . -B build -G "Visual Studio 17 2022"`
- [ ] `cmake --build build --config Release`
- [ ] `build\Release\server.exe`

**In Browser:**
- [ ] Open: `http://localhost:8080`
- [ ] Test adding a task manually

---

## 🎓 Learning Resources

- CMake basics: https://cmake.org/cmake/help/latest/guide/tutorial/
- Crow framework: https://crowcpp.org/master/
- C++ reference: https://en.cppreference.com/
