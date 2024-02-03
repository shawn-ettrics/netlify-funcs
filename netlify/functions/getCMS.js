const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This will allow any origin

exports.handler = async function(event, context) {
  const WEBFLOW_API_URL = 'https://api.webflow.com/collections/65bc8ff35b147be9e97e63f1/items';
  const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN; // Set this in your Netlify environment variables

  const response = await fetch(WEBFLOW_API_URL, {
    headers: {
      'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
      'accept-version': '1.0.0'
    }
  });

  if (!response.ok) {
    // If the call was unsuccessful, return the error status
    return {
      statusCode: response.status,
      body: response.statusText
    };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data.items) // Send back the items from the CMS collection
  };
};
