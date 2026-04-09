# Installation Guide - C++ Crow Server Setup

This guide explains what you need to install manually vs. what gets downloaded automatically.

## 📦 What You Need to Install

### Prerequisites (Install Manually)

These tools must be installed on your system:

| Tool | Purpose | macOS Installation |
|------|---------|-------------------|
| **CMake** | Build system generator | `brew install cmake` |
| **C++ Compiler** | Compiles C++ code | `xcode-select --install` |
| **Boost** | C++ libraries (required by Crow) | `brew install boost` |

### Dependencies (Auto-Downloaded by CMake)

These are **automatically** downloaded when you run CMake - no manual installation needed:

| Library | Version | Purpose |
|---------|---------|---------|
| **Crow** | v1.2.0 | Web framework for handling HTTP requests |
| **nlohmann/json** | v3.11.3 | JSON parsing and serialization |
| **ASIO** | 1.30.2 | Asynchronous I/O library (used by Crow) |

---

## 🚀 Installation Steps by Operating System

### macOS

```bash
# Step 1: Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Step 2: Install CMake
brew install cmake

# Step 3: Install C++ compiler (Xcode Command Line Tools)
xcode-select --install

# Step 4: Install Boost
brew install boost

# That's it! CMake will handle the rest.
```

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install CMake
sudo apt install cmake

# Install C++ compiler
sudo apt install build-essential

# Install Boost
sudo apt install libboost-all-dev

# Install Git (if not already installed)
sudo apt install git
```

### Linux (Fedora/RHEL)

```bash
# Install CMake
sudo dnf install cmake

# Install C++ compiler
sudo dnf groupinstall "Development Tools"

# Install Boost
sudo dnf install boost-devel

# Install Git
sudo dnf install git
```

### Windows

```bash
# Option 1: Using Chocolatey (Recommended)
choco install cmake
choco install mingw  # Or install Visual Studio
choco install boost-msvc-14.3

# Option 2: Using vcpkg (Alternative)
# 1. Install Visual Studio 2022 (Community Edition is free)
# 2. Install CMake from https://cmake.org/download/
# 3. Install vcpkg:
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
.\vcpkg install boost:x64-windows

# Then use CMake with vcpkg toolchain:
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=[path-to-vcpkg]/scripts/buildsystems/vcpkg.cmake
```

---

## ✅ Verification Commands

After installation, verify everything is installed correctly:

```bash
# Check CMake version
cmake --version
# Should show: cmake version 3.15 or higher

# Check C++ compiler
g++ --version  # Linux/macOS
# OR
clang++ --version  # macOS
# OR
cl  # Windows (Visual Studio)

# Check Boost installation
# macOS/Linux:
ls /usr/local/include/boost  # or /opt/homebrew/include/boost on M1/M2 Macs
# Windows:
# Check in vcpkg installed directory
```

---

## 🏗️ Building the Project

Once prerequisites are installed, building is the same on all platforms:

```bash
# Navigate to project directory
cd /path/to/project

# Step 1: Configure with CMake (downloads Crow, nlohmann/json, ASIO automatically)
cmake -B build -S .

# Step 2: Build the executable
cmake --build build

# Step 3: Run the server
./build/server        # macOS/Linux
.\build\Debug\server  # Windows
```

---

## 📋 Quick Reference

### Minimum Versions Required
- CMake: 3.15+
- C++ Standard: C++17
- Boost: 1.64+

### What Gets Downloaded Automatically?
When you run `cmake -B build -S .`, CMake's FetchContent will:
1. Clone Crow from GitHub
2. Clone nlohmann/json from GitHub  
3. Clone ASIO from GitHub
4. Configure all dependencies
5. Make them available to your project

This happens **once** the first time you configure. Subsequent builds are much faster.

### Disk Space Requirements
- CMake: ~100 MB
- Boost: ~400 MB
- Xcode Command Line Tools (macOS): ~1.5 GB
- Build artifacts: ~50 MB
- **Total**: ~2 GB

---

## 🐛 Common Issues

### Issue: "cmake: command not found"
**Solution**: CMake is not installed or not in PATH
```bash
# macOS:
brew install cmake

# Linux:
sudo apt install cmake

# Verify:
cmake --version
```

### Issue: "Could NOT find Boost"
**Solution**: Boost is not installed
```bash
# macOS:
brew install boost

# Linux:
sudo apt install libboost-all-dev
```

### Issue: "No C++ compiler found"
**Solution**: Install compiler toolchain
```bash
# macOS:
xcode-select --install

# Linux:
sudo apt install build-essential
```

### Issue: Git not found
**Solution**: Install Git
```bash
# macOS:
brew install git

# Linux:
sudo apt install git
```

---

## 💡 Pro Tips

1. **First build is slow**: CMake downloads dependencies from GitHub (~5-10 minutes)
2. **Subsequent builds are fast**: Dependencies are cached locally
3. **Clean build**: Delete the `build/` folder and run cmake again
4. **Offline mode**: Once downloaded, dependencies are in `build/_deps/`

---

## 📝 Summary Checklist

Before running the project on a new machine:

- [ ] Install CMake
- [ ] Install C++ compiler
- [ ] Install Boost libraries
- [ ] Install Git (usually pre-installed on Linux/macOS)
- [ ] Run `cmake -B build -S .` (downloads Crow, JSON, ASIO automatically)
- [ ] Run `cmake --build build`
- [ ] Run `./build/server`

That's it! The project is now ready to run.
