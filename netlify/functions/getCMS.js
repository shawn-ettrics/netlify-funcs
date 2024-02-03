const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const WEBFLOW_API_URL = 'https://api.webflow.com/collections/65bc8ff35b147be9e97e63f1/items';
  const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN; // Set this in your Netlify environment variables

  try {
    const response = await fetch(WEBFLOW_API_URL, {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Log the response for debugging
      console.error('Webflow API response error:', await response.text());

      return {
        statusCode: response.status,
        body: `Error: ${response.statusText}`
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.items)
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Function error:', error);

    return {
      statusCode: 500,
      body: `Internal Server Error: ${error.message}`
    };
  }
};
