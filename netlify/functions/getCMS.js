const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const WEBFLOW_API_URL = 'https://api.webflow.com/collections/65bc8ff35b147be9e97e63f1/items';
  const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN; // Set this in your Netlify environment variables

  // Define headers outside of the try-catch block
  const headers = {
    'Access-Control-Allow-Origin': 'https://wildfires.webflow.io', // Match the requesting origin or use '*' for a wildcard
    'Access-Control-Allow-Methods': 'GET, OPTIONS', // Specify allowed methods
    'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(WEBFLOW_API_URL, {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0'
      }
    });

    if (!response.ok) {
      // Log the response for debugging
      console.error('Webflow API response error:', await response.text());

      return {
        statusCode: response.status,
        headers: headers, // Include headers in the error response
        body: `Error: ${response.statusText}`
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: headers, // Include headers in the successful response
      body: JSON.stringify(data.items)
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Webflow API response error:', error);

    return {
      statusCode: error.statusCode || 500,
      headers: headers, // Include headers in the error response
      body: JSON.stringify({ error: error.message }),
    };
  }
};
