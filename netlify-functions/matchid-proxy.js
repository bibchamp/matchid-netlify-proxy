const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q || "";
  const from = event.queryStringParameters.from || 0;
  const size = event.queryStringParameters.size || 10;

  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaWRyaXNzLmJhdG91QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiNDMwNTI1Iiwic2NvcGVzIjpbInVzZXIiXSwiaWF0IjoxNzU1NjgyMjY4LCJleHAiOjE3NTgyNzQyNjgsImp0aSI6IjE3NTU2ODIyNjgifQ.4vpLvF6u0ZDHVEf-QzL3cZUcFDlsYl5SnOp7tmFLt_E";

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
