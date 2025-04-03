import {
  IconFolderPlus,
  IconFolderX,
  IconPlus,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconPlayerPlay,
  IconEdit,
  IconCheck,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

const ApiEndpointTree = ({ folders, url, user_id, api_key }) => {
  const [newFolders, setNewFolders] = useState(folders || []);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showAddEndpoint, setShowAddEndpoint] = useState({});
  const [editingEndpoint, setEditingEndpoint] = useState(null);
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    description: "",
    url: url,
    method: "POST",
    schema: "",
    instructions: "",
    examplePrompts: [],
  });
  const [schemaErrors, setSchemaErrors] = useState({});
  const [deleteFolderMode, setDeleteFolderMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testingEndpoint, setTestingEndpoint] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    if (folders) setNewFolders(folders);
  }, [folders]);

  const validateSchema = (schema, endpointId = "new") => {
    if (!schema.trim()) {
      setSchemaErrors((prev) => ({ ...prev, [endpointId]: "" }));
      return true;
    }

    try {
      JSON.parse(schema);
      setSchemaErrors((prev) => ({ ...prev, [endpointId]: "" }));
      return true;
    } catch (error) {
      const errorMsg = `Invalid JSON: ${error.message}`;
      setSchemaErrors((prev) => ({ ...prev, [endpointId]: errorMsg }));
      return false;
    }
  };

  const handleSave = async (show) => {
    try {
      if (show) {
        setLoading(true);
      }

      if (!user_id) {
        toast({
          title: "Error",
          description: "User ID is missing",
        });
        window.location.href = "/sign-in/";
        return false;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/update_backend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            folders: newFolders,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (show) {
          toast({
            title: "Endpoint Tree Saved!",
            description: "Your changes have been saved successfully",
          });
        }
        return true;
      } else {
        toast({
          title: "Error",
          description: data.message || data.warning || "Failed to save changes",
        });
        return false;
      }
    } catch (error) {
      console.error("Error saving API endpoint tree:", error);
      toast({
        title: "Error",
        description: "Network error, please try again",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const testEndpoint = async (endpoint) => {
    try {
      setTestingEndpoint(endpoint.id);
      const saveSuccess = await handleSave();

      if (!saveSuccess) {
        setTestingEndpoint(null);
        return;
      }

      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/process_prompt/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `please test out the endpoint at ${endpoint.url} thats called ${endpoint.name}`,
            api_key: api_key,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Endpoint Test Successful",
          description: "The endpoint is working correctly",
        });
      } else {
        toast({
          title: "Endpoint Test Failed",
          description: data.message || "Failed to test endpoint",
        });
      }
    } catch (error) {
      console.error("Error testing endpoint:", error);
      toast({
        title: "Test Error",
        description: "Network error while testing the endpoint",
      });
    } finally {
      setTestingEndpoint(null);
    }
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const addFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: `folder_${Date.now()}`,
      name: newFolderName,
      endpoints: [],
    };

    setNewFolders([...newFolders, newFolder]);
    setNewFolderName("");
    setShowAddFolder(false);
  };

  const deleteFolder = (folderId) => {
    setNewFolders(newFolders.filter((folder) => folder.id !== folderId));

    const { [folderId]: _, ...restExpanded } = expandedFolders;
    setExpandedFolders(restExpanded);

    const { [folderId]: __, ...restAddEndpoint } = showAddEndpoint;
    setShowAddEndpoint(restAddEndpoint);
  };

  const toggleAddEndpoint = (folderId) => {
    setEditingEndpoint(null);
    setShowAddEndpoint((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
    setNewEndpoint({
      name: "",
      url: url,
      method: "POST",
      schema: "",
    });
  };

  const toggleEditEndpoint = (folderId, endpoint) => {
    if (
      editingEndpoint &&
      editingEndpoint.folderId === folderId &&
      editingEndpoint.endpointId === endpoint.id
    ) {
      setEditingEndpoint(null);
      return;
    }

    setEditingEndpoint({
      folderId,
      endpointId: endpoint.id,
      data: {
        ...endpoint,
        // Add default array if examplePrompts doesn't exist
        examplePrompts: endpoint.examplePrompts || [],
      },
    });

    if (endpoint.schema) {
      validateSchema(endpoint.schema, endpoint.id);
    }
  };

  const updateEditingEndpoint = (field, value, endpointId) => {
    setEditingEndpoint((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
    }));

    if (field === "schema") {
      validateSchema(value, endpointId);
    }
  };

  const saveEditedEndpoint = (folderId, endpointId) => {
    const editedData = editingEndpoint.data;

    if (
      !editedData.name.trim() ||
      !editedData.url.trim() ||
      !editedData.method
    ) {
      toast({
        title: "Validation Error",
        description: "Name, Method, and URL are required fields",
      });
      return;
    }

    if (
      editedData.schema.trim() &&
      !validateSchema(editedData.schema, endpointId)
    ) {
      toast({
        title: "Schema Error",
        description: schemaErrors[endpointId] || "Invalid JSON schema format",
      });
      return;
    }

    const updatedFolders = newFolders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          endpoints: folder.endpoints.map((ep) =>
            ep.id === endpointId ? { ...editedData, id: ep.id } : ep
          ),
        };
      }
      return folder;
    });

    setNewFolders(updatedFolders);
    setEditingEndpoint(null);
  };

  const addEndpoint = (folderId) => {
    if (
      !newEndpoint.name.trim() ||
      !newEndpoint.url.trim() ||
      !newEndpoint.method
    ) {
      toast({
        title: "Validation Error",
        description: "Name, Method, and URL are required fields",
      });
      return;
    }

    if (
      newEndpoint.schema.trim() &&
      !validateSchema(newEndpoint.schema, "new")
    ) {
      toast({
        title: "Schema Error",
        description: schemaErrors["new"] || "Invalid JSON schema format",
      });
      return;
    }

    const endpoint = {
      id: `endpoint_${Date.now()}`,
      ...newEndpoint,
    };

    const updatedFolders = newFolders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          endpoints: [...folder.endpoints, endpoint],
        };
      }
      return folder;
    });

    setNewFolders(updatedFolders);
    toggleAddEndpoint(folderId);
  };

  const deleteEndpoint = (folderId, endpointId) => {
    if (
      editingEndpoint &&
      editingEndpoint.folderId === folderId &&
      editingEndpoint.endpointId === endpointId
    ) {
      setEditingEndpoint(null);
    }

    const updatedFolders = newFolders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          endpoints: folder.endpoints.filter((ep) => ep.id !== endpointId),
        };
      }
      return folder;
    });

    setNewFolders(updatedFolders);
  };

  const toggleDeleteFolderMode = () => {
    setDeleteFolderMode(!deleteFolderMode);
  };

  const formatSchema = (schema, endpointId) => {
    try {
      if (!schema.trim()) return schema;

      const parsedSchema = JSON.parse(schema);
      const formattedSchema = JSON.stringify(parsedSchema, null, 2);

      setSchemaErrors((prev) => ({ ...prev, [endpointId]: "" }));
      return formattedSchema;
    } catch (error) {
      setSchemaErrors((prev) => ({
        ...prev,
        [endpointId]: `Cannot format: ${error.message}`,
      }));
      return schema;
    }
  };

  const handleNewEndpointSchemaFormat = () => {
    const formattedSchema = formatSchema(newEndpoint.schema, "new");
    setNewEndpoint({
      ...newEndpoint,
      schema: formattedSchema,
    });
  };

  const handleEditEndpointSchemaFormat = (endpointId) => {
    if (!editingEndpoint) return;

    const formattedSchema = formatSchema(
      editingEndpoint.data.schema,
      endpointId
    );
    updateEditingEndpoint("schema", formattedSchema, endpointId);
  };

  const handlePromptChange = (index, value) => {
    const newPrompts = [...(newEndpoint.examplePrompts || [])];
    newPrompts[index] = value;
    setNewEndpoint({ ...newEndpoint, examplePrompts: newPrompts });
  };

  const handleDeletePrompt = (index) => {
    const newPrompts = [...(newEndpoint.examplePrompts || [])].filter(
      (_, i) => i !== index
    );
    setNewEndpoint({ ...newEndpoint, examplePrompts: newPrompts });
  };

  // For the edit endpoint version:
  const handleEditPromptChange = (index, value) => {
    if (!editingEndpoint) return;

    const newPrompts = [...(editingEndpoint.data.examplePrompts || [])];
    newPrompts[index] = value;
    updateEditingEndpoint(
      "examplePrompts",
      newPrompts,
      editingEndpoint.data.id
    );
  };

  const handleEditDeletePrompt = (index) => {
    if (!editingEndpoint) return;

    const newPrompts = [...(editingEndpoint.data.examplePrompts || [])].filter(
      (_, i) => i !== index
    );
    updateEditingEndpoint(
      "examplePrompts",
      newPrompts,
      editingEndpoint.data.id
    );
  };

  return (
    <div className="border border-gray-300 rounded-md p-6 h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-row space-x-6">
          <h2 className="font-aeonik text-2xl">API Endpoint Tree</h2>
          <div className="space-x-4 flex flex-row font-inter items-center">
            <div
              className="size-8 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer"
              onClick={() => setShowAddFolder(!showAddFolder)}
            >
              <IconFolderPlus />
            </div>
            {newFolders.length > 0 && (
              <div
                className={`size-8 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer ${
                  deleteFolderMode ? "bg-red-50 border-red-400" : ""
                }`}
                onClick={toggleDeleteFolderMode}
              >
                <IconFolderX />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => handleSave(true)}
          className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          {loading ? (
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

      {showAddFolder && (
        <div className="mb-4 p-4 border border-gray-200 rounded-md bg-white font-inter">
          <h3 className="text-sm font-medium font-inter mb-2">
            Add New Folder
          </h3>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Folder Name"
              className="border border-gray-300 rounded-md p-2 text-sm"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                onClick={() => setShowAddFolder(false)}
              >
                Cancel
              </button>
              <button
                className="text-gray-900 bg-white border border-gray-400 hover:bg-gray-50 rounded-md px-3 py-1 text-sm"
                onClick={addFolder}
              >
                Add Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteFolderMode && (
        <div className="mb-4 p-2 border border-red-200 bg-red-50 rounded-md text-sm text-red-600 font-inter">
          Folder deletion mode active. Click the X button next to a folder to
          delete it.
        </div>
      )}

      <div className="min-h-[400px] font-inter">
        {newFolders.length === 0 ? (
          <div className="text-center font-inter text-sm text-gray-500 py-8">
            No folders yet. Click the folder icon to add one.
          </div>
        ) : (
          <div className="space-y-2">
            {newFolders.map((folder) => (
              <div
                key={folder.id}
                className="border border-gray-200 rounded-md"
              >
                <div className="flex items-center justify-between p-3 font-inter rounded-t-md">
                  <div className="flex items-center space-x-2">
                    <div
                      onClick={() => toggleFolder(folder.id)}
                      className="cursor-pointer"
                    >
                      {expandedFolders[folder.id] ? (
                        <IconChevronDown size={18} />
                      ) : (
                        <IconChevronRight size={18} />
                      )}
                    </div>
                    <span className="">{folder.name}</span>
                    <span className="text-gray-500 text-sm">
                      ({folder.endpoints.length} endpoints)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="size-6 flex items-center justify-center hover:bg-gray-200 rounded"
                      onClick={() => toggleAddEndpoint(folder.id)}
                    >
                      <IconPlus size={16} />
                    </button>
                    {deleteFolderMode && (
                      <button
                        className="size-6 flex items-center justify-center hover:bg-red-200 text-red-600 rounded"
                        onClick={() => deleteFolder(folder.id)}
                      >
                        <IconX size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {showAddEndpoint[folder.id] && (
                  <div className="p-3 border-t border-gray-200 text-sm font-inter">
                    <h4 className="text-sm font-medium mb-3">
                      Add New Endpoint
                    </h4>
                    <div className="space-y-4">
                      {/* Method Dropdown */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">Method:</label>
                        <select
                          className="border border-gray-300 rounded-md px-1 py-2 w-full text-sm bg-white"
                          value={newEndpoint.method}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              method: e.target.value,
                            })
                          }
                        >
                          {["GET", "POST", "PUT", "DELETE", "OPTIONS"].map(
                            (method) => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      {/* Name Input */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">Name:</label>
                        <input
                          type="text"
                          placeholder="Enter endpoint name"
                          className="border border-gray-300 rounded-md p-2 w-full text-sm"
                          value={newEndpoint.name}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Description Input */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">
                          Description - Include key info for AI like "can leave
                          X field blank":
                        </label>
                        <textarea
                          placeholder="Enter endpoint description"
                          className="border border-gray-300 rounded-md p-2 w-full text-sm"
                          value={newEndpoint.description}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      </div>

                      {/* Add new instructions field */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">
                          Instructions - Detailed steps for using this endpoint:
                        </label>
                        <textarea
                          placeholder="Enter usage instructions"
                          className="border border-gray-300 rounded-md p-2 w-full text-sm"
                          value={newEndpoint.instructions}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              instructions: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      </div>

                      {/* Add example prompts section */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">Example Prompts:</label>
                        {(newEndpoint.examplePrompts || []).map(
                          (prompt, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                value={prompt}
                                onChange={(e) =>
                                  handlePromptChange(index, e.target.value)
                                }
                              />
                              <button
                                type="button" // Crucial fix here
                                onClick={() => handleDeletePrompt(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <IconX size={14} />
                              </button>
                            </div>
                          )
                        )}
                        <button
                          onClick={() => {
                            setNewEndpoint({
                              ...newEndpoint,
                              examplePrompts: [
                                ...(newEndpoint.examplePrompts || []),
                                "",
                              ],
                            });
                          }}
                          className="text-xs flex flex-row items-center text-gray-800 hover:text-black my-2 w-fit pr-3 py-0.5 rounded-md"
                        >
                          <IconPlus className="size-4 mr-0.5" /> Add Prompt
                        </button>
                      </div>

                      {/* URL Input */}
                      <div className="flex flex-col space-y-1 pt-2">
                        <label className="text-xs">URL:</label>
                        <input
                          type="text"
                          placeholder="Enter endpoint URL"
                          className="border border-gray-300 rounded-md p-2 w-full text-sm"
                          value={newEndpoint.url}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              url: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Schema Input */}
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-xs">
                            Schema (JSON format) - Put context params like "id":{" "}
                            "{"{"}user_id{"}"}":
                          </label>
                          <button
                            onClick={handleNewEndpointSchemaFormat}
                            className="text-xs text-gray-600 hover:text-gray-800"
                            title="Format JSON"
                          >
                            Format JSON
                          </button>
                        </div>
                        <textarea
                          placeholder="Enter schema in JSON format"
                          className={`border ${
                            schemaErrors["new"]
                              ? "border-red-400"
                              : "border-gray-300"
                          } rounded-md p-2 w-full text-sm font-mono`}
                          value={newEndpoint.schema}
                          onChange={(e) => {
                            setNewEndpoint({
                              ...newEndpoint,
                              schema: e.target.value,
                            });
                            validateSchema(e.target.value, "new");
                          }}
                          rows={4}
                        />
                        {schemaErrors["new"] && (
                          <div className="text-red-500 text-xs mt-1">
                            {schemaErrors["new"]}
                          </div>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end space-x-2">
                        <button
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                          onClick={() => toggleAddEndpoint(folder.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-gray-900 bg-white border border-gray-400 hover:bg-gray-50 rounded-md px-3 py-1 text-sm"
                          onClick={() => addEndpoint(folder.id)}
                        >
                          Add Endpoint
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {expandedFolders[folder.id] && (
                  <div className="p-3 border-t border-gray-200">
                    {folder.endpoints.length === 0 ? (
                      <div className="text-center text-gray-500 py-2 text-sm">
                        No endpoints in this folder yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {folder.endpoints.map((endpoint) => (
                          <React.Fragment key={endpoint.id}>
                            <div className="flex justify-between p-2 bg-white border border-gray-200 rounded-md">
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {endpoint.name}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {endpoint.description}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  [{endpoint.method}] {endpoint.url}
                                </div>
                                {endpoint.schema &&
                                  !editingEndpoint?.endpointId ===
                                    endpoint.id && (
                                    <div className="text-gray-600 text-[0.6rem] mt-1">
                                      <pre className="bg-gray-50 p-2 rounded-md">
                                        {(() => {
                                          try {
                                            const parsedSchema = JSON.parse(
                                              endpoint.schema
                                            );
                                            return JSON.stringify(
                                              parsedSchema,
                                              null,
                                              2
                                            );
                                          } catch (error) {
                                            return (
                                              <span className="text-red-500">
                                                Wrong JSON format schema. Must
                                                fix.
                                              </span>
                                            );
                                          }
                                        })()}
                                      </pre>
                                    </div>
                                  )}
                              </div>
                              <div className="flex">
                                <button
                                  className="size-6 flex items-center justify-center hover:bg-gray-100 text-gray-600 rounded mr-1"
                                  onClick={() =>
                                    toggleEditEndpoint(folder.id, endpoint)
                                  }
                                  title="Edit Endpoint"
                                >
                                  <IconEdit size={14} />
                                </button>
                                <button
                                  className="size-6 flex items-center justify-center hover:bg-green-100 text-green-600 rounded mr-1"
                                  onClick={() => testEndpoint(endpoint)}
                                  disabled={testingEndpoint === endpoint.id}
                                  title="Test Endpoint"
                                >
                                  {testingEndpoint === endpoint.id ? (
                                    <svg
                                      className="animate-spin size-4 text-green-600"
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
                                  ) : (
                                    <IconPlayerPlay size={14} />
                                  )}
                                </button>
                                <button
                                  className="size-6 flex items-center justify-center hover:bg-red-200 text-red-600 rounded"
                                  onClick={() =>
                                    deleteEndpoint(folder.id, endpoint.id)
                                  }
                                  title="Delete Endpoint"
                                >
                                  <IconX size={14} />
                                </button>
                              </div>
                            </div>

                            {editingEndpoint &&
                              editingEndpoint.folderId === folder.id &&
                              editingEndpoint.endpointId === endpoint.id && (
                                <div className="p-3 border border-gray-200 bg-white rounded-md mt-1 mb-2 text-sm">
                                  <div className="text-sm font-medium mb-3 text-black">
                                    Edit Endpoint
                                  </div>
                                  <div className="space-y-4">
                                    {/* Method Dropdown */}
                                    <div className="flex flex-col space-y-1">
                                      <label className="text-xs">Method:</label>
                                      <select
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm bg-white"
                                        value={editingEndpoint.data.method}
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "method",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                      >
                                        {[
                                          "GET",
                                          "POST",
                                          "PUT",
                                          "DELETE",
                                          "OPTIONS",
                                        ].map((method) => (
                                          <option key={method} value={method}>
                                            {method}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* Name Input */}
                                    <div className="flex flex-col space-y-1">
                                      <label className="text-xs">Name:</label>
                                      <input
                                        type="text"
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                        value={editingEndpoint.data.name}
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "name",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Description Input */}
                                    <div className="flex flex-col space-y-1">
                                      <label className="text-xs">
                                        Description:
                                      </label>
                                      <textarea
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                        value={editingEndpoint.data.description}
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "description",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                        rows={3}
                                      />
                                    </div>

                                    {/* Add instructions edit field */}
                                    <div className="flex flex-col space-y-1">
                                      <label className="text-xs">
                                        Instructions:
                                      </label>
                                      <textarea
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                        value={
                                          editingEndpoint.data.instructions
                                        }
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "instructions",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                        rows={3}
                                      />
                                    </div>

                                    {/* Add example prompts edit section */}
                                    <div className="flex flex-col space-y-1">
                                      <label className="text-xs">
                                        Example Prompts:
                                      </label>
                                      {(
                                        editingEndpoint.data.examplePrompts ||
                                        []
                                      ).map((prompt, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center space-x-2"
                                        >
                                          <input
                                            type="text"
                                            className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                            value={prompt}
                                            onChange={(e) =>
                                              handleEditPromptChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleEditDeletePrompt(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                          >
                                            <IconX size={14} />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        onClick={() => {
                                          const newPrompts = [
                                            ...(editingEndpoint.data
                                              .examplePrompts || []),
                                            "",
                                          ];
                                          updateEditingEndpoint(
                                            "examplePrompts",
                                            newPrompts,
                                            editingEndpoint.data.id
                                          );
                                        }}
                                        className="text-xs flex flex-row items-center text-gray-800 hover:text-black my-2 w-fit pr-3 py-0.5 rounded-md"
                                      >
                                        <IconPlus className="size-4 mr-0.5" />
                                        Add Prompt
                                      </button>
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex flex-col space-y-1 pt-2">
                                      <label className="text-xs">URL:</label>
                                      <input
                                        type="text"
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                        value={editingEndpoint.data.url}
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "url",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Schema Input */}
                                    <div className="flex flex-col space-y-1">
                                      <div className="flex justify-between items-center">
                                        <label className="text-xs">
                                          Schema (JSON format) - Put context
                                          params like "id": "{"{"}user_id{"}"}":
                                        </label>
                                        <button
                                          onClick={() =>
                                            handleEditEndpointSchemaFormat(
                                              endpoint.id
                                            )
                                          }
                                          className="text-xs text-gray-600 hover:text-gray-800"
                                          title="Format JSON"
                                        >
                                          Format JSON
                                        </button>
                                      </div>
                                      <textarea
                                        className={`border ${
                                          schemaErrors[endpoint.id]
                                            ? "border-red-400"
                                            : "border-gray-300"
                                        } rounded-md p-2 w-full text-sm font-mono`}
                                        value={editingEndpoint.data.schema}
                                        onChange={(e) =>
                                          updateEditingEndpoint(
                                            "schema",
                                            e.target.value,
                                            endpoint.id
                                          )
                                        }
                                        rows={4}
                                      />
                                      {schemaErrors[endpoint.id] && (
                                        <div className="text-red-500 text-xs mt-1">
                                          {schemaErrors[endpoint.id]}
                                        </div>
                                      )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-2">
                                      <button
                                        className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                                        onClick={() => setEditingEndpoint(null)}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="bg-gray-50 text-gray-900 border border-gray-300 hover:bg-gray-200 rounded-md px-3 py-1 text-sm flex items-center"
                                        onClick={() =>
                                          saveEditedEndpoint(
                                            folder.id,
                                            endpoint.id
                                          )
                                        }
                                      >
                                        <IconCheck size={14} className="mr-1" />
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiEndpointTree;
