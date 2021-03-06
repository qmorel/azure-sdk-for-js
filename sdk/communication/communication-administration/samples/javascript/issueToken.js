// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the CommunicationIdentityClient to
 * issue a user token.
 */

const { CommunicationIdentityClient } = require("@azure/communication-administration");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("== Issue Token Sample ==");

  const client = new CommunicationIdentityClient(connectionString);
  const scopes = ["chat"];

  // Create user
  console.log("Creating User");

  const user = await client.createUser();

  console.log(`Created user with id: ${user.communicationUserId}`);
  console.log("Issuing Token");

  // Issue token and get token from response
  const { token } = await client.issueToken(user, scopes);

  console.log(`Issued token: ${token}`);
}

main().catch((error) => {
  console.error("Encountered an error while issuing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
