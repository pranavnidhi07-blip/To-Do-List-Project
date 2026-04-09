cmake_minimum_required(VERSION 3.15)
project(CrowServer)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(Threads REQUIRED)

# Include FetchContent module to download dependencies
include(FetchContent)

# Fetch ASIO (standalone, no Boost required)
FetchContent_Declare(
  asio
  GIT_REPOSITORY https://github.com/chriskohlhoff/asio.git
  GIT_TAG asio-1-30-2
)

# Fetch Crow framework
FetchContent_Declare(
  crow
  GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
  GIT_TAG v1.2.0
)

# Fetch nlohmann/json
FetchContent_Declare(
  json
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG v3.11.3
)

# Make dependencies available
FetchContent_MakeAvailable(asio json)

# Manually set up Crow (header-only)
FetchContent_GetProperties(crow)
if(NOT crow_POPULATED)
  FetchContent_Populate(crow)
endif()

# Add executable
add_executable(server 
    src/main.cpp
    src/task_service.cpp
    src/user_service.cpp
)

# Include directories
target_include_directories(server 
    PRIVATE 
    ${crow_SOURCE_DIR}/include
    ${asio_SOURCE_DIR}/asio/include
)

# Link libraries
target_link_libraries(server 
    PRIVATE 
    nlohmann_json::nlohmann_json
    Threads::Threads
)

# Windows-specific socket libraries
if(WIN32)
    target_link_libraries(server PRIVATE ws2_32 mswsock)
endif()

# Enable ASIO standalone (required by Crow)
target_compile_definitions(server PRIVATE ASIO_STANDALONE)
