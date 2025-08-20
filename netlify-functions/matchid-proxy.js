const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q || "";
  const from = event.queryStringParameters.from || 0;
  const size = event.queryStringParameters.size || 10;

  const apiKey = "VOTRE_CLE_API_ICI";

  const url =
    `https://deces.matchid.io/deces/api/v1/search?q=${encodeURIComponent(query)}&from=${from}&size=${size}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: await response.text()
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
