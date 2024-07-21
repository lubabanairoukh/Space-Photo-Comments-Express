

# Space Photo Comments Express

## Project Description
This project is a social media-style web application for viewing and commenting on daily space photos from NASA's Astronomy Picture of the Day (APOD) API. The site is designed as a Single Page Application (SPA) and uses Node.js with Express to manage user comments. This project is built to fulfill the requirements of two exercises: Asynchronous JS with REST API and a full-fledged MVC with database.

## Features

### Part 1: Asynchronous JS with REST API
1. **User Authentication:**
   - Users must enter a username (24 characters max) to access the site.
   - Username validation ensures only alphanumeric characters are used.

2. **NASA APOD Integration:**
   - Users can browse daily space photos from NASA.
   - Photos are displayed with relevant information such as date, title, explanation, and copyright.

3. **Comment System:**
   - Users can add comments (up to 128 characters) to photos.
   - Users can delete their own comments.
   - Comments are refreshed every 15 seconds using polling to ensure up-to-date data across multiple sessions.

4. **Responsive Design:**
   - The site uses Bootstrap for a responsive and user-friendly layout.
   - Photos and comments are displayed in a grid format to ensure readability.

5. **Infinite Scrolling or Load More:**
   - Users can load more photos by either infinite scrolling or clicking a "Load More" button.

6. **Server-Side API:**
   - A RESTful API built with Express to manage comments.
   - Supports create, read, and delete operations for comments.
   - Error handling for invalid requests and server issues.

### Part 2: MVC with Database and User Registration
1. **User Registration:**
   - A landing page with a login form and a link to a registration page.
   - The registration page includes fields for email, first name, and last name.
   - Validation for email uniqueness and proper input formats.
   - Password selection with validation and encryption using bcrypt.
   - Cookies are used to manage the registration process with a 30-second timeout.

2. **Login System:**
   - A login form that authenticates users based on their email and password.
   - Session management for logged-in users.
   - Redirect to the main SPA page upon successful login.
   - Logout functionality to end the user session.

3. **Database Integration:**
   - Uses Sequelize and SQLite for database management.
   - Models for users and comments.
   - Secure password storage with bcrypt.
   - Routes for user registration, login, and comment management.

4. **Error Handling and Validation:**
   - Comprehensive error handling for server and client-side issues.
   - Ensures smooth user experience with meaningful error messages.

## Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/lubabanairoukh/Space-Photo-Comments-Express.git
   cd Space-Photo-Comments-Express
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add your NASA API key:
   ```env
   API_KEY=your_nasa_api_key
   ```

4. **Run Database Migrations:**
   ```sh
   npx sequelize-cli db:migrate
   ```

5. ** Run:**:
 ```sh
    npm install --save express body-parser sequelize sequelize-cli sqlite3 nodemon
   ```
6. **Start the Server:**
   ```sh
   npm start
   ```

## Usage

1. **Access the Site:**
   Open your web browser and navigate to `http://localhost:3000`.

2. **User Registration:**
   - Go to the registration page and fill in the required fields.
   - Complete the registration within 30 seconds to avoid timeout.

3. **Login:**
   - Use the login form to authenticate.
   - Upon successful login, browse and comment on NASA's daily photos.

4. **Commenting:**
   - Add and delete comments on photos.
   - Comments are refreshed every 15 seconds for real-time updates.


## Dependencies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for SQL databases.
- **SQLite3**: Database engine.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module to load environment variables.
- **EJS**: Templating engine.
- **Bootstrap**: CSS framework for responsive design.

## Notes

- The project uses a NASA API key that needs to be obtained from [NASA API](https://api.nasa.gov).

## Authors

- [Lubaba Nairoukh](https://github.com/your-username)

## Acknowledgements

- NASA API for providing the daily space photos.
- Course instructors for guidance and support throughout the development of this project.

## Conclusion

This project integrates asynchronous JavaScript with REST APIs and an Express server with database management to create a fully functional social media-style application for viewing and commenting on NASA's daily space photos.
