GitHub Repository Search & Favorites App
📌 Project Overview

This is a full-stack web application that allows users to search GitHub repositories and save their favorite repositories.
It integrates with the GitHub API and stores selected repositories in a MongoDB database.

Tech Stack

Frontend - React.js (Next.js App Router), Tailwind CSS

Backend - Node.js (Next.js API Routes)

Database - MongoDB

Tools & Libraries - Axios, React Hot Toast, Git & GitHub

Features - 
Repository Search
Search repositories using keywords
Fetch data from GitHub API
Display Results
Repository name
Owner name
Star count ⭐
Direct GitHub link

Favorites System - 
Add repositories to favorites
Prevent duplicate entries
Data stored in MongoDB

Favorites Page - 
View all saved repositories
Open repository link
Remove from favorites

Remove Favorites - 
Delete repositories from database
Real-time UI update

UI Enhancements - 
Toast notifications (success & error)
Disabled button for already added repos
Smooth UI experience with Tailwind CSS

🔗 API Endpoints - 
 
GET /api/favorites
Fetch all saved repositories

POST /api/favorites
Save a repository to favorites

DELETE /api/favorites/:id
Remove repository from favorites
