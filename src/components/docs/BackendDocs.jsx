import React from "react";
import { Code } from "../global/Code";

const BackendDocs = () => {
  // Code snippets stored as variables to avoid syntax errors
  const exampleEndpointStructure = `{
  "folders": [
    {
      "name": "User Management",
      "endpoints": [
        {
          "path": "/api/users/profile",
          "method": "GET",
          "description": "Retrieves the current user's profile information including name, email, preferences, and account status. Returns a 404 if the user is not found or a 401 if unauthorized.",
          "schema": {
            "user_id": "{user_id}"
          }
        },
        {
          "path": "/api/users/update",
          "method": "PUT",
          "description": "Updates the user's profile information. Can modify name, email, and preferences. Returns the updated user object or errors for invalid inputs.",
          "schema": {
            "user_id": "{user_id}",
            "name": "string",
            "email": "string",
            "preferences": {
              "notifications": "boolean",
              "theme": "string"
            }
          }
        }
      ]
    },
    {
      "name": "Products",
      "endpoints": [
        {
          "path": "/api/products/list",
          "method": "GET",
          "description": "Retrieves a paginated list of products with optional filtering by category, price range, and availability. Returns product information including ID, name, price, and description.",
          "schema": {
            "category": "string",
            "min_price": "number",
            "max_price": "number",
            "in_stock": "boolean",
            "page": "number",
            "limit": "number"
          }
        },
        {
          "path": "/api/products/{product_id}",
          "method": "GET",
          "description": "Retrieves detailed information about a specific product including features, specifications, pricing, and availability. Returns a 404 if the product is not found.",
          "schema": {
            "product_id": "{product_id}"
          }
        }
      ]
    }
  ]
}`;

  const corsConfigDjango = `# settings.py

INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

# Allow requests from Limeblock domains
CORS_ALLOWED_ORIGINS = [
    "https://limeblock.io",
    "https://limeblockbackend.onrender.com",
]

# If you need to allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Optional: Specify which HTTP methods are allowed
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
]`;

  const corsConfigExpress = `const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors({
  origin: [
    "https://limeblock.io",
    "https://limeblockbackend.onrender.com",
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Your routes and other middleware`;

  const contextParamsExample = `{
    "user_id": "{user_id}",
    "time_period": "30 days",
    "include_archived": true
}`;

  const schemaInstructionsExample = `// Example of well-defined schema with actual values
{
  "userId": "{userId}",          // Context parameter in correct casing
  "orderDetails": {
    "orderId": "ORD-78945",      // Actual string value
    "totalAmount": 149.99,       // Actual number value
    "isCompleted": true,         // Actual boolean value
    "items": [                   // Array with actual values
      {
        "productId": "PROD-123",
        "quantity": 2,
        "unitPrice": 59.99
      },
      {
        "productId": "PROD-456",
        "quantity": 1,
        "unitPrice": 29.99
      }
    ],
    "shippingAddress": {         // Nested object with actual values
      "street": "123 Elm Street",
      "city": "San Francisco",
      "zipCode": "94105"
    }
  },
  "preferences": {
    "notificationOptIn": true,
    "preferredTheme": "dark"
  }
}`;

  const contextImplementationExample = `// When making API requests from your app
const context = {
  userId: "user_12345",  // Must match casing exactly
  timePeriod: "30 days", // Must match casing
  includeArchived: true  // Must match casing
};

// This will be sent to the endpoint as:
{
  "userId": "user_12345",
  "timePeriod": "30 days",
  "includeArchived": true
}`;

  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
          <div className="flex flex-row space-x-2 items-center mb-6">
            <img src="/LimeblockLogo.png" className="size-6" />
            <p className="font-aeonik text-sm text-gray-900 text-center">
              Limeblock Docs
            </p>
          </div>
          <h1 className="text-4xl font-aeonik font-medium mb-8">
            Endpoint Tree Docs
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              This guide will walk you through the process of configuring your
              backend to work seamlessly with Limeblock. Proper backend
              integration enables your Limeblock AI endpoints to access data,
              perform actions, and provide a more personalized experience to
              your users.
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Backend URL Configuration
            </h2>
            <p className="mb-4">
              The first step in backend integration is to specify your API's
              base URL:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to the Backend tab in your Limeblock dashboard</li>
              <li>
                Enter your API's base URL in the "Edit URL" section (e.g.,{" "}
                <code>https://api.yourapp.com</code>)
              </li>
              <li>Save the configuration</li>
            </ol>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              API Endpoint Configuration
            </h2>
            <p className="mb-4">
              Limeblock can interact with your backend through the API endpoints
              you defined in app. Follow these guidelines to configure them
              effectively:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Organize with Folders</strong>: Group related endpoints
                in logical folders (e.g., "User Management", "Content",
                "Transactions")
              </li>
              <li>
                <strong>Define Clear Paths</strong>: Use RESTful paths that
                clearly indicate the endpoint's purpose
              </li>
              <li>
                <strong>Provide Detailed Descriptions</strong>: Write
                comprehensive descriptions that help the AI understand when and
                how to use each endpoint
              </li>
            </ul>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Example API Endpoint Structure
            </h3>
            <Code
              code={exampleEndpointStructure}
              language="json"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h3 className="text-3xl font-aeonik font-medium mt-12 mb-4">
              Best Practices for Endpoint Descriptions
            </h3>
            <p className="mb-4">Write detailed descriptions that include:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>What the endpoint does</li>
              <li>What parameters it accepts</li>
              <li>What response it returns</li>
              <li>Potential error cases</li>
              <li>Use cases for when this endpoint should be called</li>
            </ul>

            <h4 className="text-lg font-aeonik font-medium mt-4 mb-2">
              Example of a Good Description:
            </h4>
            <Code
              code={`Creates a new order in the system with the provided items and shipping information. Validates inventory availability and calculates final price including taxes and shipping. Returns the created order ID and confirmation details, or specific error messages if validation fails (e.g., insufficient inventory, invalid shipping address).       `}
              language="text"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h3 className="text-3xl font-aeonik font-medium mt-10 mb-4">
              Best Practices for Instructions
            </h3>
            <p className="mb-4">Effective instructions should include:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Clear and concise language</li>
              <li>Step-by-step breakdown of actions</li>
              <li>Expected outcomes or goals</li>
              <li>Important warnings or tips to avoid potential errors</li>
              <li>Examples to clarify complex situations</li>
              <li>
                Desired structure of schema when sending (example- send the
                whole schema context or just the part meant to be updated)
              </li>
            </ul>

            <h4 className="text-lg font-aeonik font-medium mt-4 mb-2">
              Example of Good Instructions:
            </h4>
            <Code
              code={`You can leave the name field blank. Make sure to send the entire schema structure including the context, not just the new part. Create unique ids.         `}
              language="text"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            {/* NEW SECTION: Schema Instructions */}
            <h3 className="text-3xl font-aeonik font-medium mt-12 mb-4">
              Schema Instructions
            </h3>
            <p className="mb-4">
              Proper schema definition is crucial for successful AI integration.
              Follow these guidelines to ensure your schemas are correctly
              formatted:
            </p>

            <h4 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Context Parameters Formatting
            </h4>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Wrap in curly braces</strong>: Context parameters must
                be wrapped in curly braces (e.g., <code>{`"{userId}"`}</code>)
              </li>
              <li>
                <strong>Exact casing</strong>: Use the exact casing your backend
                expects (camelCase, snake_case, etc.)
              </li>
              <li>
                <strong>Consistency</strong>: Maintain the same casing
                throughout your schema and implementation
              </li>
              <li>
                <strong>No spaces</strong>: Avoid spaces in parameter names (use{" "}
                <code>timePeriod</code> instead of <code>time period</code>)
              </li>
            </ul>

            <h4 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Data Format Guidelines
            </h4>
            <p className="mb-4">
              Use actual values in your schema examples to demonstrate expected
              formats:
            </p>
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format Example
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      String
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <code>"ORD-78945"</code>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      Use quotes for all string values
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Number
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <code>149.99</code>
                    </td>
                    <td className="px-4 py-4 text-sm">No quotes for numbers</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Boolean
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <code>true</code> or <code>false</code>
                    </td>
                    <td className="px-4 py-4 text-sm">No quotes, lowercase</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Array
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <code>[{"{...}"}]</code>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      Contains actual objects with values
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Object
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <code>{"{...}"}</code>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      Nested structures with actual values
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Schema Example with Actual Values
            </h4>
            <p className="mb-4">
              Here's an example schema demonstrating correct casing, context
              parameters, and actual values:
            </p>
            <Code
              code={schemaInstructionsExample}
              language="json"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important:</strong> This example shows the exact
                structure and value types that would be sent to your endpoint.
                The AI will generate requests matching this format exactly.
                Context parameters like <code>{`"{userId}"`}</code> will be
                replaced with actual values at runtime.
              </p>
            </div>

            <h4 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Context Implementation Consistency
            </h4>
            <p className="mb-4">
              When providing context in your implementation, the casing must
              match exactly what you defined in your schema:
            </p>
            <Code
              code={contextImplementationExample}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">
                <strong>Warning:</strong> Casing mismatches will cause context
                parameters to not be replaced properly.
                <code>userId</code> and <code>userid</code> are considered
                different parameters. This is the most common integration error.
              </p>
            </div>

            <h2 className="text-3xl font-aeonik font-medium mt-12 mb-4">
              Configuring Backend Access
            </h2>
            <p className="mb-4">
              For Limeblock to communicate with your backend, you need to set up
              proper access controls:
            </p>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              CORS Configuration
            </h3>
            <p className="mb-4">
              Configure your server to accept requests from Limeblock's domains
              by adding appropriate CORS (Cross-Origin Resource Sharing)
              headers.
            </p>

            <h4 className="text-lg font-aeonik font-medium mt-4 mb-2">
              Django Example
            </h4>
            <Code
              code={corsConfigDjango}
              language="python"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h4 className="text-lg font-aeonik font-medium mt-4 mb-2">
              Express.js Example
            </h4>
            <Code
              code={corsConfigExpress}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Authentication
            </h3>
            <p className="mb-4">
              To secure your API endpoints, consider implementing one of these
              authentication methods:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>API Key Authentication</strong>: Include your Limeblock
                API key in requests
              </li>
              <li>
                <strong>OAuth 2.0</strong>: For more advanced security needs
              </li>
              <li>
                <strong>JWT Tokens</strong>: For stateless authentication
              </li>
            </ul>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Testing Your Backend Integration
            </h2>
            <p className="mb-4">Before deploying to production:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Use the "Test Endpoint" feature (With the edit and delete
                buttons) in the Limeblock endpoint preview box to verify
                connectivity
              </li>
              <li>Test with various inputs to ensure robust error handling</li>
              <li>Verify context parameter substitution works correctly</li>
              <li>Check that the AI can properly interpret the responses</li>
            </ul>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Troubleshooting
            </h2>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Issue</th>
                  <th className="p-2 border border-gray-300">
                    Potential Solution
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300">
                    403 Forbidden errors
                  </td>
                  <td className="p-2 border border-gray-300">
                    Check CORS configuration and authentication
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    Endpoint not being called
                  </td>
                  <td className="p-2 border border-gray-300">
                    Verify URL path and description accuracy
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    Context parameters not being substituted
                  </td>
                  <td className="p-2 border border-gray-300">
                    Ensure parameter names match in schema and implementation
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    AI misinterpreting responses
                  </td>
                  <td className="p-2 border border-gray-300">
                    Improve endpoint descriptions and provide example responses
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col">
              <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
                Getting Help
              </h2>
              <p className="mb-4">
                If you need assistance with your Limeblock implementation:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>
                  Contact our founder directly at{" "}
                  <a
                    href="mailto:byjuaditya@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    byjuaditya@gmail.com
                  </a>{" "}
                  for personalized support
                </li>
                <li>
                  Check our comprehensive{" "}
                  <a href="/docs" className="text-blue-600 hover:underline">
                    documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendDocs;
