const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Adjusted URL to fetch collection schema instead of items
  const WEBFLOW_API_URL = 'https://api.webflow.com/v2/collections/65bc8ff35b147be9e97e63f1';
  const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN; // Set this in your Netlify environment variables

  const headers = {
    'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
    'accept-version': '1.0.0',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(WEBFLOW_API_URL, { headers });

    if (!response.ok) {
      console.error('Webflow API response error:', await response.text());
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': 'https://wildfires.webflow.io',
        },
        body: `Error: ${response.statusText}`
      };
    }

    const schema = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://wildfires.webflow.io',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schema) // Return the entire schema object
    };
  } catch (error) {
    console.error('Webflow API response error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://wildfires.webflow.io',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
