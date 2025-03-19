"use client";

import {
  IconClipboard,
  IconEye,
  IconEyeCancel,
  IconEyeClosed,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Email states
  const [emails, setEmails] = useState([]);
  const [originalEmails, setOriginalEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [savingChanges, setSavingChanges] = useState(false);
  const [hasEmailChanges, setHasEmailChanges] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          window.location.href = "/sign_in/";
          return;
        }

        // Fetch user details
        const userResponse = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const userData = await userResponse.json();

        if (userData.success) {
          setUser(userData.user);
          setEmails(userData.user.emails || []);
          setOriginalEmails(userData.user.emails || []);
        } else {
          setError("Failed to load user information");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compare emails arrays to check for changes
  useEffect(() => {
    if (originalEmails.length !== emails.length) {
      setHasEmailChanges(true);
      return;
    }

    const hasChanges =
      emails.some((email) => !originalEmails.includes(email)) ||
      originalEmails.some((email) => !emails.includes(email));

    setHasEmailChanges(hasChanges);
  }, [emails, originalEmails]);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(user?.api_key);
  };

  const handleAddEmail = () => {
    if (!newEmail || !newEmail.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (emails.includes(newEmail)) {
      setError("This email is already added");
      return;
    }

    // Only update local state, don't send API request yet
    setEmails([...emails, newEmail]);
    setNewEmail("");
    setError(null);
  };

  const handleDeleteEmail = (emailToDelete) => {
    // Only update local state, don't send API request yet
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleSave = async () => {
    try {
      setSavingChanges(true);

      // Small delay for better user experience
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Send update request with all emails
      const response = await fetch("http://127.0.0.1:8000/api/update_emails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          emails: emails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the original emails to match current state
        setOriginalEmails([...emails]);
        setHasEmailChanges(false);
        setError(null);
        toast({
          title: `Emails Saved!`,
          description: "Your emails have been saved successfully",
        });
      } else {
        setError(data.message || "Failed to update emails");
      }
    } catch (error) {
      console.error("Error saving emails:", error);
      setError("Network error, please try again");
    } finally {
      setSavingChanges(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/sign_in/";
  };

  if (loading) {
    return (
      <div className="bg-white w-full flex items-center justify-center h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 mx-auto text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-3 font-inter">Loading your stuff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-y-auto pb-12 pt-8 pr-12 pl-10 border-l border-gray-300 rounded-tl-[12px] font-inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-aeonik font-medium">
          {user?.business_name} - Settings
        </h1>
        <button
          onClick={() => {
            window.location.href = "/checkout/";
          }}
          className="bg-white hover:bg-gray-50 border border-gray-600 font-aeonik px-6 py-2 rounded-lg text-base transition-colors"
        >
          Upgrade
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Grid Layout */}
      <div className="flex flex-col space-y-8">
        {/* Current Plan Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-aeonik font-medium mb-4">Current Plan</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">
                  {user?.plan
                    ? user.plan.charAt(0).toUpperCase() +
                      user.plan.slice(1) +
                      " Plan"
                    : "Free Plan"}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {user?.plan_description || "Basic features included"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${user?.plan_price || "0"}/month
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Billed{" "}
                  {new Date(user?.last_paid).toLocaleDateString() || "Recently"}
                </p>
              </div>
            </div>
          </div>
          <div className="border border-green-300 p-4 rounded-lg">
            <h4 className="font-medium text-black mb-2">
              Upgrade for more features
            </h4>
            <p className="text-gray-700 text-sm mb-3">
              Get access to advanced features, higher limits, and priority
              support.
            </p>
            <button
              onClick={() => {
                window.location.href = "/checkout/";
              }}
              className="bg-lime hover:bg-green-400 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
            >
              View Plans
            </button>
          </div>
        </div>

        {/* Email Management Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex flex-row mb-6 justify-between w-full">
            <h2 className="text-xl font-aeonik font-medium">
              Email Management
            </h2>
            <button
              onClick={handleSave}
              disabled={!hasEmailChanges || savingChanges}
              className={`border border-gray-400 rounded-lg px-4 py-2 font-inter text-sm transition-colors ${
                hasEmailChanges && !savingChanges
                  ? "hover:bg-gray-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {savingChanges ? (
                <>
                  <svg
                    className="animate-spin size-4 mx-2 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>

          <div className="mb-6">
            <div className="flex flex-col space-y-2 mb-4 text-sm">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => handleDeleteEmail(email)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <IconTrash className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm">
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Add new email"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                  onClick={handleAddEmail}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Email
                </button>
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                Add emails for notifications and account access
              </p>
            </div>
          </div>
        </div>

        {/* API Key Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-aeonik font-medium mb-4">API Keys</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-900 block mb-2">
              Chat API Key
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm">
                {showApiKey ? user?.api_key : "•".repeat(20)}
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                title={showApiKey ? "Hide API Key" : "Show API Key"}
              >
                {showApiKey ? (
                  <IconEyeClosed className="size-5" />
                ) : (
                  <IconEye className="size-5" />
                )}
              </button>
              <button
                onClick={handleCopyApiKey}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <IconClipboard className="size-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-600 mt-2">
              Use this key to authenticate with our API. Keep it secret.
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-start mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
