import {
  IconFolderPlus,
  IconFolderX,
  IconPlus,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconDots,
  IconEdit,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

const PageEndpointTree = ({ folders, url, user_id }) => {
  const [newFolders, setNewFolders] = useState(folders || []);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showAddEndpoint, setShowAddEndpoint] = useState({});
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: url,
    description: "",
  });
  // New state to track if folder deletion mode is active
  const [deleteFolderMode, setDeleteFolderMode] = useState(false);
  const [loading, setLoading] = useState(false);
  // New state to track which endpoints are being edited
  const [editingEndpoints, setEditingEndpoints] = useState({});
  // New state to hold current endpoint being edited
  const [editEndpoint, setEditEndpoint] = useState({
    id: null,
    name: "",
    url: "",
    description: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    if (folders) setNewFolders(folders);
  }, [folders]);

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!user_id) {
        toast({
          title: `Error`,
          description: "User ID is missing",
          variant: "destructive",
        });
        return;
      }

      // Small delay for better user experience
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/update_frontend/",
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
        toast({
          title: `Endpoint Tree Saved!`,
          description: "Your changes have been saved successfully",
        });
      } else {
        toast({
          title: `Error`,
          description: data.message || data.warning || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Error saving page endpoint tree:", error);
      toast({
        title: `Error`,
        description: "Network error, please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle folder expansion
  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  // Add a new folder
  const addFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: `folder_${Date.now()}`,
      name: newFolderName,
      description: "",
      endpoints: [],
    };

    setNewFolders([...newFolders, newFolder]);
    setNewFolderName("");
    setShowAddFolder(false);
  };

  // Delete a folder
  const deleteFolder = (folderId) => {
    setNewFolders(newFolders.filter((folder) => folder.id !== folderId));

    // Clean up expanded state
    const { [folderId]: _, ...restExpanded } = expandedFolders;
    setExpandedFolders(restExpanded);

    // Clean up add endpoint state
    const { [folderId]: __, ...restAddEndpoint } = showAddEndpoint;
    setShowAddEndpoint(restAddEndpoint);
  };

  // Toggle show add endpoint form
  const toggleAddEndpoint = (folderId) => {
    setShowAddEndpoint((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));

    // Reset the new endpoint form
    setNewEndpoint({
      name: "",
      url: url,
      description: "",
    });
  };

  // Add a new endpoint to a folder
  const addEndpoint = (folderId) => {
    if (!newEndpoint.name.trim() || !newEndpoint.url.trim()) return;

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

  // Delete an endpoint
  const deleteEndpoint = (folderId, endpointId) => {
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

  // Toggle delete folder mode
  const toggleDeleteFolderMode = () => {
    setDeleteFolderMode(!deleteFolderMode);
  };

  // Toggle endpoint edit mode
  const toggleEditEndpoint = (folderId, endpoint) => {
    const endpointKey = `${folderId}-${endpoint.id}`;

    // If we're already editing this endpoint, cancel editing
    if (editingEndpoints[endpointKey]) {
      setEditingEndpoints((prev) => ({
        ...prev,
        [endpointKey]: false,
      }));
      return;
    }

    // Set the current endpoint data to edit form
    setEditEndpoint({
      id: endpoint.id,
      name: endpoint.name,
      url: endpoint.url,
      description: endpoint.description || "",
    });

    // Mark this endpoint as being edited
    setEditingEndpoints((prev) => ({
      ...prev,
      [endpointKey]: true,
    }));
  };

  // Save endpoint edits
  const saveEndpointEdit = (folderId, endpointId) => {
    if (!editEndpoint.name.trim() || !editEndpoint.url.trim()) return;

    const endpointKey = `${folderId}-${endpointId}`;

    const updatedFolders = newFolders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          endpoints: folder.endpoints.map((ep) =>
            ep.id === endpointId
              ? {
                  ...ep,
                  name: editEndpoint.name,
                  url: editEndpoint.url,
                  description: editEndpoint.description,
                }
              : ep
          ),
        };
      }
      return folder;
    });

    setNewFolders(updatedFolders);

    // Reset editing state
    setEditingEndpoints((prev) => ({
      ...prev,
      [endpointKey]: false,
    }));
  };

  // Cancel endpoint edit
  const cancelEndpointEdit = (folderId, endpointId) => {
    const endpointKey = `${folderId}-${endpointId}`;
    setEditingEndpoints((prev) => ({
      ...prev,
      [endpointKey]: false,
    }));
  };

  return (
    <div className="border border-gray-300 rounded-md p-6 h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-row space-x-6">
          <h2 className="font-aeonik text-2xl">Page Endpoint Tree</h2>
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
          onClick={handleSave}
          className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
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

      {/* Add Folder Form */}
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

      {/* Delete Mode Message */}
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
                {/* Folder Header */}
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

                {/* Add Endpoint Form */}
                {showAddEndpoint[folder.id] && (
                  <div className="p-3 border-t border-gray-200 text-sm font-inter">
                    <h4 className="text-sm font-medium mb-3">
                      Add New Endpoint
                    </h4>
                    <div className="space-y-4">
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

                      {/* URL Input */}
                      <div className="flex flex-col space-y-1">
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

                      {/* Description Input */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs">Description:</label>
                        <textarea
                          placeholder="Enter description"
                          className="border border-gray-300 rounded-md p-2 w-full text-sm"
                          value={newEndpoint.description}
                          onChange={(e) =>
                            setNewEndpoint({
                              ...newEndpoint,
                              description: e.target.value,
                            })
                          }
                          rows={2}
                        />
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

                {/* Folder Content (Endpoints) */}
                {expandedFolders[folder.id] && (
                  <div className="p-3 border-t border-gray-200">
                    {folder.endpoints.length === 0 ? (
                      <div className="text-center text-gray-500 py-2 text-sm">
                        No endpoints in this folder yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {folder.endpoints.map((endpoint) => (
                          <div
                            key={endpoint.id}
                            className="border border-gray-200 rounded-md"
                          >
                            <div className="flex justify-between p-2 bg-white rounded-md">
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {endpoint.name}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {endpoint.url}
                                </div>
                                {endpoint.description && (
                                  <div className="text-gray-600 text-xs mt-1">
                                    {endpoint.description}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                <button
                                  className="size-6 flex items-center justify-center hover:bg-blue-100 rounded"
                                  onClick={() =>
                                    toggleEditEndpoint(folder.id, endpoint)
                                  }
                                >
                                  <IconEdit size={14} />
                                </button>
                                <button
                                  className="size-6 flex items-center justify-center hover:bg-red-200 rounded"
                                  onClick={() =>
                                    deleteEndpoint(folder.id, endpoint.id)
                                  }
                                >
                                  <IconX size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Edit Endpoint Form - Shown directly below the endpoint */}
                            {editingEndpoints[
                              `${folder.id}-${endpoint.id}`
                            ] && (
                              <div className="p-3 border-t border-gray-200 text-sm bg-gray-50">
                                <h4 className="text-sm font-medium mb-3">
                                  Edit Endpoint
                                </h4>
                                <div className="space-y-4">
                                  {/* Name Input */}
                                  <div className="flex flex-col space-y-1">
                                    <label className="text-xs">Name:</label>
                                    <input
                                      type="text"
                                      placeholder="Enter endpoint name"
                                      className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                      value={editEndpoint.name}
                                      onChange={(e) =>
                                        setEditEndpoint({
                                          ...editEndpoint,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  {/* URL Input */}
                                  <div className="flex flex-col space-y-1">
                                    <label className="text-xs">URL:</label>
                                    <input
                                      type="text"
                                      placeholder="Enter endpoint URL"
                                      className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                      value={editEndpoint.url}
                                      onChange={(e) =>
                                        setEditEndpoint({
                                          ...editEndpoint,
                                          url: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  {/* Description Input */}
                                  <div className="flex flex-col space-y-1">
                                    <label className="text-xs">
                                      Description:
                                    </label>
                                    <textarea
                                      placeholder="Enter description"
                                      className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                      value={editEndpoint.description}
                                      onChange={(e) =>
                                        setEditEndpoint({
                                          ...editEndpoint,
                                          description: e.target.value,
                                        })
                                      }
                                      rows={2}
                                    />
                                  </div>

                                  {/* Buttons */}
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                                      onClick={() =>
                                        cancelEndpointEdit(
                                          folder.id,
                                          endpoint.id
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="text-gray-900 bg-white border border-gray-400 hover:bg-gray-50 rounded-md px-3 py-1 text-sm"
                                      onClick={() =>
                                        saveEndpointEdit(folder.id, endpoint.id)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
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

export default PageEndpointTree;
