# Geminotes

Geminotes is a Chrome extension and web application designed to help users save notes alongside their URLs in the browser and manage them easily. The notes are stored in Firestore and can be accessed via the web app, where users can interact, chat, and collaborate on their notes using Firebase Cloud Functions and the Gemini model.

![Geminotes Preview](assets/geminotes-preview.png)

## Features

### Chrome Extension
- **Save Notes with URLs**: Easily capture and save notes while browsing, with the URLs automatically saved alongside the note.
- **Firestore Integration**: Notes are securely stored in Firestore for easy retrieval across devices.

### Web Application
- **Notes Dashboard**: Access all saved notes in a structured and organized dashboard built with Angular.
- **Chat and Collaboration**: Users can chat and interact with their notes and collaborate with others via Firebase Cloud Functions.
- **Gemini Model Integration**: Utilize the Gemini model for enhanced interaction with your notes, allowing intelligent suggestions and insights.

## Technologies Used

### Frontend
- **Angular**: The web app is built using Angular for a dynamic and responsive user experience.
- **Tailwind CSS**: For styling and responsive design.

### Backend
- **Firebase Firestore**: Stores the notes with their associated URLs.
- **Firebase Cloud Functions**: Manages backend logic and provides real-time communication between users.
- **Gemini Model**: Adds AI-powered capabilities to enhance note interaction and collaboration.

### Chrome Extension
- **JavaScript**: Implements the logic for capturing notes and URLs.
- **Chrome API**: Enables interaction with the browser and integrates with Firestore.

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)
- Chrome Browser (for extension installation)

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/geminotes.git
   cd geminotes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Cloud Functions.
   - Replace the placeholders in `src/environments/environment.ts` with your Firebase credentials.

4. Set up Google API:
   - Obtain your Google API Key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Replace the placeholder in `functions/src/index.ts` with your Google API Key.

5. Run the application:
   ```bash
   ng serve
   ```

6. For the Chrome extension, follow the instructions in the `chrome-extension` directory to load the extension in your browser.

## License
This project is licensed under the MIT License.


