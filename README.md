# Movie App

A full-stack movie application with user authentication, movie browsing, and admin functionality.

## 🎬 Live Application

- **Frontend**: https://movies-app-git-main-ananya-padmanabha-shettys-projects.vercel.app
- **Backend API**: https://movies-app-production-ff8a.up.railway.app

## 🚀 Features

- User authentication (register/login)
- Browse movies with pagination
- View detailed movie information
- Add and delete movie reviews
- Admin dashboard for movie management
- Search movies by title
- Filter by genre, year, and rating
- Responsive design

## 🛠️ Tech Stack

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🏗️ Project Structure

```
Movie App/
├── backend/
│   ├── controllers/
│   │   └── movieController.js
│   ├── models/
│   │   └── Movie.js
│   ├── routes/
│   │   └── moviesRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   │   ├── api/
│   │   │   └── store/
│   │   └── utils/
│   └── public/
└── README.md
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Movie App
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
- **Production**: `https://movies-app-production-ff8a.up.railway.app/api/v1`
- **Development**: `http://localhost:5000/api/v1`

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "Tia",
  "email": "tia@gmail.com",
  "password": "tia123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Movie Endpoints

#### Get All Movies
```http
GET /movies
```

Query Parameters:
- `page` (optional): Page number for pagination
- `limit` (optional): Number of movies per page
- `genre` (optional): Filter by genre
- `year` (optional): Filter by release year
- `rating` (optional): Filter by minimum rating

#### Get Specific Movie
```http
GET /movies/:id
```

#### Create Movie (Admin only)
```http
POST /movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Movie Title",
  "description": "Movie description",
  "image": "image_url",
  "genre": ["Action", "Adventure"],
  "releaseDate": "2023-01-01",
  "duration": 120
}
```

#### Update Movie (Admin only)
```http
PUT /movies/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Movie (Admin only)
```http
DELETE /movies/:id
Authorization: Bearer <token>
```

### Review Endpoints

#### Add Review to Movie
```http
POST /movies/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Great movie!"
}
```

#### Delete Review
```http
DELETE /movies/:movieId/reviews/:reviewId
Authorization: Bearer <token>
```

### Special Movie Endpoints

#### Get New Movies
```http
GET /movies/new
```

#### Get Top Rated Movies
```http
GET /movies/top
```

#### Get Random Movies
```http
GET /movies/random
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## 📊 Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## 🎯 Common Issues & Solutions

### 1. CORS Errors
Ensure the backend CORS configuration includes your frontend URL.

### 2. MongoDB Connection
Verify your MongoDB connection string is correct and the database is accessible.

### 3. JWT Token Issues
Make sure to include the token in the Authorization header for protected routes.

### 4. Review 500 Error
If you encounter a 500 error when posting reviews, check:
- User authentication token is valid
- Movie ID exists in the database
- User hasn't already reviewed the movie
- Request body contains valid rating and comment

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.


-----
**Note**: Make sure to replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual values when setting up the project locally.
