# **Afro Lyrics Mania**

**Celebrating African music, one lyric at a time.**

## **Team Members**

Team members involved in the Afro Lyrics Mania project.

### Team Member Information

- **Name:** Okoyen E
- **Role:** Project Lead, Frontend/Backend Engineer

### Role Justification

As an ALX student with a passion for software engineering, I have taken on the role of Project Lead and Frontend/Backend Engineer to ensure a cohesive and efficient project development process.


## **Technologies**

Technologies necessary to complete the Afro Lyrics Mania project.

### Programming Languages

- **JavaScript**: Used for both frontend and backend development.

### Frontend Framework

- **React**: A JavaScript library for building user interfaces and can be used for developing the online music player's frontend.

### Backend Framework

- **Node.js**: A JavaScript runtime environment for building scalable server-side applications, used for developing the backend of the music management system.

### Database

- **MongoDB**: A NoSQL document-based database for storing and managing music metadata, lyrics, and other relevant data.

### Additional Libraries and Tools

- **Redux or MobX**: For state management in the React frontend.
- **Express.js**: A Node.js framework for building web applications and APIs.
- **Mongoose**: A MongoDB ORM (Object Relational Mapping) tool for interacting with the database.
- **axios or fetch**: For making HTTP requests from the frontend to the backend API.
- **Webpack or Rollup**: For bundling and managing frontend code.
- **Babel**: For transpiling modern JavaScript code to ensure compatibility with older browsers.

### Hardware

- **Computer**: A decent computer with a reliable internet connection for development, testing, and deployment.
- **Server**: A cloud-based or virtual private server (VPS) for hosting the backend API and database.

### Resources

- **MDN Web Docs**: For JavaScript, React, and Node.js documentation and reference.
- **MongoDB Documentation**: For MongoDB database management and query optimization.
- **Stack Overflow**: A Q&A platform for developers to ask and answer questions related to the project's technologies.
- **Udemy or online courses**: For learning and improving skills in React, Node.js, and MongoDB.

### Books

- **"React: Up & Running" by Stoyan Stefanov and Kirupa Chavan**: A book on building fast, scalable, and maintainable frontend applications with React.
- **"Node: Up and Running" by Tom Hughes-Croucher and Mike Wilson**: A book on building fast, scalable, and maintainable server-side applications with Node.js.
- **"MongoDB: The Definitive Guide" by Kristina Chodorow**: A comprehensive guide to MongoDB database management and development.

## **Challenge**

Problem that Afro Lyrics Mania aims to solve, its limitations, and its target audience.

### Problem Statement

The current process of publishing music lyrics online is time-consuming and inefficient for artists and musicians. Afro Lyrics Mania aims to solve this problem by providing a cutting-edge AI-powered system that enables music artists to seamlessly upload, edit, synchronize, and publish their music lyrics simultaneously, with more features to be implemented in the future. Additionally, Afro Lyrics Mania will provide a platform for music streaming, allowing users to access and enjoy African music.

### Limitations

While Afro Lyrics Mania will revolutionize the way music lyrics are published online, it will not solve the problem of music piracy or copyright infringement.

### Target Audience

Afro Lyrics Mania will help music artists, musicians, and music enthusiasts by providing a convenient and efficient way to publish and access music lyrics. The users of this platform will include:

- Music artists and musicians who want to publish their lyrics online
- Music enthusiasts who want to access and explore African music lyrics
- Music industry professionals who need a reliable platform to access and manage music lyrics

### Project Relevance and Locale

Afro Lyrics Mania is a global platform designed to cater to African music artists and enthusiasts worldwide. While it is focused on African music, its relevance extends to the global music community, providing a unique platform for cross-cultural exchange and appreciation. The project's AI-powered system will be accessible from anywhere in the world, making it a valuable resource for African music artists and enthusiasts globally.

## **Risks**

Potential risks associated with Afro Lyrics Mania, their potential impact, and the safeguards or strategies in place to mitigate these risks.

### Technical Risks

- **Risk:** Technical difficulties with AI-powered system integration
    
- **Impact:** Delayed project timeline, increased development costs
    
- **Mitigation:** Conduct thorough research and testing, collaborate with AI experts, and allocate sufficient resources for development and testing
    
- **Risk:** Inadequate data storage and management
    
- **Impact:** Data loss, security breaches, and compliance issues
    
- **Mitigation:** Implement robust data storage and management systems, ensure data encryption and backups, and comply with relevant data protection regulations
    

### Business Risks

- **Risk:** Insufficient market demand for Afro Lyrics Mania
    
- **Impact:** Low user adoption, revenue loss
    
- **Mitigation:** Conduct market research, gather feedback from potential users, and develop a marketing strategy to promote Afro Lyrics Mania
    
- **Risk:** Competition from established music streaming services
    
- **Impact:** Difficulty in gaining market share, revenue loss
    
- **Mitigation:** Develop a unique value proposition, focus on African music, and offer features that differentiate Afro Lyrics Mania from competitors
    

## **Existing Solutions**

Existing solutions that are similar to Afro Lyrics Mania, highlighting their similarities and differences.

### Similar Products or Solutions

- **Genius (formerly Rap Genius)**: A popular platform for annotating and sharing song lyrics, with a large user base and a wide range of features.
    - Similarities: Both Afro Lyrics Mania and Genius provide a platform for users to access and engage with song lyrics.
    - Differences: Genius focuses on user-generated content and annotations, while Afro Lyrics Mania will provide a more comprehensive platform for music streaming and lyrics publishing.
- **MetroLyrics**: A lyrics database that provides access to a large collection of song lyrics.
    - Similarities: Both Afro Lyrics Mania and MetroLyrics provide access to song lyrics.
    - Differences: MetroLyrics is primarily a lyrics database, while Afro Lyrics Mania will provide a more comprehensive platform for music streaming and lyrics publishing.
- **MusixMatch**: A lyrics database that provides access to a large collection of song lyrics, with features like lyrics translation and synchronization.
    - Similarities: Both Afro Lyrics Mania and MusixMatch provide access to song lyrics.
    - Differences: MusixMatch is primarily a lyrics database, while Afro Lyrics Mania will provide a more comprehensive platform for music streaming and lyrics publishing.

### Why Afro Lyrics Mania?

While there are existing solutions that provide access to song lyrics, Afro Lyrics Mania aims to provide a more comprehensive platform that combines music streaming and lyrics publishing. By leveraging AI-powered technology and integrating with popular music streaming services, Afro Lyrics Mania will provide a unique and innovative solution that sets it apart from existing solutions.


## **Portfolio Project's MVP**

In this section, we'll outline the Minimum Viable Product (MVP) for Afro Lyrics Mania, including an end-to-end map for the data flowing through the system.

**MVP Overview**

The MVP for Afro Lyrics Mania will include the following features:

- User registration and login
- Music lyrics publishing and editing
- Music streaming and playback
- Basic search functionality
- User profile management

**End-to-End Data Flow Map**

Here is a high-level overview of the data flow through the system:

1. **User Registration**
    - User submits registration form with email, password, and other details
    - Data is sent to the backend API for processing
    - Backend API creates a new user account and stores user data in the database
2. **User Login**
    - User submits login form with email and password
    - Data is sent to the backend API for processing
    - Backend API verifies user credentials and returns a JSON Web Token (JWT) for authentication
3. **Music Lyrics Publishing**
    - User submits music lyrics for publishing
    - Data is sent to the backend API for processing
    - Backend API stores music lyrics in the database and associates them with the user's account
4. **Music Streaming and Playback**
    - User requests to stream a song
    - Backend API retrieves the song's metadata and lyrics from the database
    - Backend API sends the song's metadata and lyrics to the frontend for playback
5. **Search Functionality**
    - User submits a search query
    - Backend API searches the database for matching music lyrics and metadata
    - Backend API returns search results to the frontend for display
6. **User Profile Management**
    - User updates their profile information
    - Data is sent to the backend API for processing
    - Backend API updates the user's profile information in the database

**System Components**

The MVP will consist of the following system components:

- **Frontend**: Built using React, Redux, Rug, and Material-UI for a responsive and user-friendly interface.
- **Backend API**: Built using Node.js, Express.js, and MongoDB
- **Database**: MongoDB for storing user data, music lyrics, and metadata
- **Authentication**: JSON Web Tokens (JWT) for authentication and authorization

**Data Flow Diagram**

Here is a simple data flow diagram illustrating the flow of data through the system:

+---------------+
| User |
+---------------+
	 |
	 |
	 v
+---------------+
|  Frontend  |
|  (React, Redux) |
+---------------+
	 |
	 |
	 v
+---------------+
|  Backend API  |
|  (Node.js, Express.js) |
+---------------+
	 |
	 |
	 v
+---------------+
|  Database  |
|  (MongoDB)    |
+---------------+
	 |
	 |
	 v
+---------------+
|  Authentication  |
|  (JWT)          |
+---------------+


## **APIs and Methods**

In this section, we'll outline the API routes and endpoints that will be created for the Afro Lyrics Mania project.

**User APIs**

- **/api/users**
    - **GET**: Returns a list of all users
    - **POST**: Creates a new user account
- **/api/users/:id**
    - **GET**: Returns a user's information based on their ID
    - **PUT**: Updates a user's information
    - **DELETE**: Deletes a user account
- **/api/users/:id/profile**
    - **GET**: Returns a user's profile information
    - **PUT**: Updates a user's profile information

**Music APIs**

- **/api/musics**
    - **GET**: Returns a list of all music tracks
    - **POST**: Creates a new music track
- **/api/musics/:id**
    - **GET**: Returns a music track's information based on its ID
    - **PUT**: Updates a music track's information
    - **DELETE**: Deletes a music track
- **/api/musics/:id/lyrics**
    - **GET**: Returns a music track's lyrics
    - **POST**: Creates new lyrics for a music track
    - **PUT**: Updates a music track's lyrics
    - **DELETE**: Deletes a music track's lyrics

**Lyrics APIs**

- **/api/lyrics**
    - **GET**: Returns a list of all lyrics
    - **POST**: Creates new lyrics
- **/api/lyrics/:id**
    - **GET**: Returns a lyric's information based on its ID
    - **PUT**: Updates a lyric's information
    - **DELETE**: Deletes a lyric

**Search APIs**

- **/api/search**
    - **GET**: Returns search results for music tracks, lyrics, and users
- **/api/search/musics**
    - **GET**: Returns search results for music tracks
- **/api/search/lyrics**
    - **GET**: Returns search results for lyrics
- **/api/search/users**
    - **GET**: Returns search results for users

**Streaming APIs**

- **/api/stream**
    - **GET**: Returns a music track's streaming URL
- **/api/stream/:id**
    - **GET**: Returns a music track's streaming URL based on its ID

**Third-Party APIs**

- **Spotify API**: Used for music streaming and metadata retrieval
    - **GET**: Retrieves a music track's metadata
    - **GET**: Retrieves a music track's streaming URL
- **MusixMatch API**: Used for lyrics retrieval
    - **GET**: Retrieves a music track's lyrics
- **Apple Music API**: Used for music streaming and metadata retrieval
    - **GET**: Retrieves a music track's metadata
    - **GET**: Retrieves a music track's streaming URL