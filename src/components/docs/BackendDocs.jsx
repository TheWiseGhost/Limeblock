"use client";

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
    "https://app.limeblock.com",
    "https://api.limeblock.com",
    "https://widget.limeblock.com"
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
    'https://app.limeblock.com',
    'https://api.limeblock.com',
    'https://widget.limeblock.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Your routes and other middleware`;

  const contextParamsExample = `{
  "path": "/api/dashboard/stats",
  "method": "GET",
  "description": "Retrieves personalized dashboard statistics for the specified user, including recent activity, pending tasks, and performance metrics for the given time period.",
  "schema": {
    "user_id": "{user_id}",
    "time_period": "string",
    "include_archived": "boolean"
  }
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
            Backend Docs
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              This guide will walk you through the process of configuring your
              backend to work seamlessly with your Limeblock widget. Proper
              backend integration enables your widget to access data, perform
              actions, and provide a more personalized experience to your users.
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
              Your Limeblock widget can interact with your backend through
              defined API endpoints. Follow these guidelines to configure them
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

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
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
              code={`Creates a new order in the system with the provided items and shipping information. Validates inventory availability and calculates final price including taxes and shipping. Returns the created order ID and confirmation details, or specific error messages if validation fails (e.g., insufficient inventory, invalid shipping address).`}
              language="text"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Context Parameters
            </h2>
            <p className="mb-4">
              Context parameters allow your widget to dynamically pass
              information to API calls, making interactions more relevant and
              personalized.
            </p>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              How Context Parameters Work
            </h3>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>
                Define parameters in your endpoint schemas using curly braces:{" "}
                <code>{`{parameter_name}`}</code>
              </li>
              <li>
                When implementing the widget, pass these values dynamically
              </li>
              <li>
                The AI will automatically substitute these placeholders with
                actual values during interactions
              </li>
            </ol>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Common Context Parameters
            </h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Parameter</th>
                  <th className="p-2 border border-gray-300">Description</th>
                  <th className="p-2 border border-gray-300">Usage Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300">
                    <code>{`{user_id}`}</code>
                  </td>
                  <td className="p-2 border border-gray-300">
                    Current authenticated user's ID
                  </td>
                  <td className="p-2 border border-gray-300">
                    Personalizing responses, fetching user-specific data
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    <code>{`{session_id}`}</code>
                  </td>
                  <td className="p-2 border border-gray-300">
                    Current session identifier
                  </td>
                  <td className="p-2 border border-gray-300">
                    Tracking conversation context across interactions
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    <code>{`{product_id}`}</code>
                  </td>
                  <td className="p-2 border border-gray-300">
                    Product being discussed
                  </td>
                  <td className="p-2 border border-gray-300">
                    Fetching specific product details during a conversation
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">
                    <code>{`{order_id}`}</code>
                  </td>
                  <td className="p-2 border border-gray-300">
                    Order being discussed
                  </td>
                  <td className="p-2 border border-gray-300">
                    Retrieving or updating order information
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Example Schema with Context Parameters
            </h3>
            <Code
              code={contextParamsExample}
              language="json"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Consistent Naming Conventions
            </h2>
            <p className="mb-4">
              To avoid potential AI errors and ensure smooth operation, maintain
              consistent naming throughout your API configuration:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Use <code>snake_case</code> for all parameter names
              </li>
              <li>
                Keep endpoint paths consistent (e.g., all plural nouns for
                collections)
              </li>
              <li>
                Use the same parameter names across different endpoints when
                they represent the same data
              </li>
              <li>
                Prefix IDs with their entity type (e.g., <code>user_id</code>,{" "}
                <code>product_id</code>)
              </li>
            </ul>

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-4">
              Examples of Consistent Naming
            </h3>
            <div className="mb-6">
              <p className="mb-2">✅ Good:</p>
              <Code
                code={`user_id, product_id, order_items, created_at`}
                language="text"
                showLineNumbers={false}
                copyButton={true}
                className="mb-4"
              />
              <p className="mb-2">❌ Avoid Inconsistency:</p>
              <Code
                code={`userId, ProductId, orderItems, created-at`}
                language="text"
                showLineNumbers={false}
                copyButton={true}
                className="mb-4"
              />
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Configuring Backend Access
            </h2>
            <p className="mb-4">
              For your Limeblock widget to communicate with your backend, you
              need to set up proper access controls:
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
                Use the "Test Endpoint" feature in the Limeblock dashboard to
                verify connectivity
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
