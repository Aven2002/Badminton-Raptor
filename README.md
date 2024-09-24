# Badminton Raptor

## Project Overview

Badminton Raptor is a full-stack web application designed to manage badminton-related data. The project consists of two components:

1. **Backend API (Badminton-Raptor-API)**
2. **Frontend Application (Badminton-Raptor)**

This document provides a step-by-step guide to setting up and running both the backend and frontend of the application.

---

## Prerequisites

Before setting up the application, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **NPM** (Node Package Manager)
- **A Relational Database Management System (RDBMS)** such as MySQL or PostgreSQL.

## Backend Setup (Badminton-Raptor-API)
### 1. Database Setup

Before running the API, you need to set up the database by following these steps:

1. **Create the database schema:**
   - Navigate to `Badminton-Raptor-API/assets` and locate the `DbStructure.sql` file.
   - Import the `DbStructure.sql` file into your RDBMS to set up the database structure.

2. **Populate the database:**
   - Once the structure is created, import the `DbData.sql` file from the same directory to populate the initial data.

### 2. Running the API

1. Navigate to the backend project directory:

   - cd Badminton-Raptor-API
   - node index.js

## Frontend Setup (Badminton-Raptor)
1. Navigate to the frontend project directory:

   - cd Badminton-Raptor
   - npm run serve
