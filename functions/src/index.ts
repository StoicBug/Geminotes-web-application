import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from "@google/generative-ai";

admin.initializeApp();

// Replace with your Google API Key
const API_KEY = 'YOUR_GOOGLE_API_KEY';

async function callGeminiPro(prompt: string) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  try {
    const result = await model.generateContent(prompt);
    return await result.response.text();
  } catch (error) {
    console.error('Error calling Gemini Pro:', error);
    throw error;
  }
}

export const chatWithNotes = functions.https.onCall(async (data, context) => {
  const { query, noteIds } = data;

  // Retrieve notes from Firestore
  const notesRef = admin.firestore().collection('notes');
  const notesSnap = await notesRef.where(admin.firestore.FieldPath.documentId(), 'in', noteIds).get();

  let notesContent = '';
  notesSnap.forEach(doc => {
    notesContent += doc.data().content + '\n\n' + doc.data().title + '\n\n' + doc.data().url + '\n\n';
  });

  // Prepare prompt for Gemini Pro
  const prompt = 
  `You have the following notes saved from various sources:\n\n${notesContent}\n\n
  Based on the above information, answer the following question with the appropriate format:
  ${query} Response Guidelines:
  1. For general information queries:
    - Provide a concise summary of relevant information from the notes.
    - Use plain text without headings or bullet points.

  2. For URLs or sources queries:
    - List the relevant URLs in a simple numbered format.
    - Example:
      1. Title: How to create a UX Sitemap: a simple guideline
          URL: https://uxdesign.cc/how-to-create-a-ux-sitemap-a-simple-guideline-8786c16f85c1

  3. For specific information queries:
    - Provide specific details in a clear and concise manner without special formatting.
    - Example:
      - Key Point 1: Explanation in plain text.
      - Key Point 2: Explanation in plain text.`;

  try {
    // Call Gemini Pro API
    const generatedText = await callGeminiPro(prompt);

    return { response: generatedText || 'Sorry, I couldn\'t generate a response.' };
  } catch (error) {
    console.error('Error in chatWithNotes:', error);
    throw new functions.https.HttpsError('internal', 'An error occurred while processing your request.');
  }
});