// oauthSetup.js
// Run this ONCE locally to get your GOOGLE_REFRESH_TOKEN.
//   node oauthSetup.js
// It prints a URL — open it, log in as the business's Google account, approve,
// then paste the resulting "code" param back into the terminal prompt.

import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // required to get a refresh_token
  scope: SCOPES,
  prompt: 'consent', // forces refresh_token even on repeat runs
});

console.log('1. Open this URL in your browser and approve access:\n');
console.log(authUrl);
console.log('\n2. After approving, copy the "code" value from the redirected URL.\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Paste the code here: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('\nSuccess! Add this to your .env file:\n');
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  rl.close();
});
