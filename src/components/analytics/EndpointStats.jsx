import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

const EndpointStats = ({ backend_folders }) => {
  const [openBackendFolders, setOpenBackendFolders] = useState({});

  // Helper function to toggle folder open/closed state
  const toggleFolder = (folderId) => {
    setOpenBackendFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  // Function to extract all endpoints from folders
  const getAllEndpoints = (folders) => {
    if (!folders || !Array.isArray(folders)) return [];

    const allEndpoints = [];

    folders.forEach((folder) => {
      if (folder.endpoints && Array.isArray(folder.endpoints)) {
        folder.endpoints.forEach((endpoint) => {
          allEndpoints.push({
            ...endpoint,
            folderName: folder.name || "Unnamed Folder",
            folderId: folder.id,
            num_hits: endpoint.num_hits || 0,
          });
        });
      }
    });

    return allEndpoints;
  };

  // Get all endpoints and sort by num_hits
  const backendEndpoints = getAllEndpoints(backend_folders);

  // Get top endpoints (show more since we have more space)
  const topBackendEndpoints = [...backendEndpoints]
    .sort((a, b) => b.num_hits - a.num_hits)
    .slice(0, 8);

  // Calculate total hits for backend
  const totalBackendHits = backendEndpoints.reduce(
    (sum, endpoint) => sum + endpoint.num_hits,
    0
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const accordionVariants = {
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 24 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <motion.div
      className="border border-gray-300 rounded-lg p-6 font-inter w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-aeonik">Endpoint Analytics</h2>
          <motion.span
            className="px-4 py-1 text-gray-900 rounded-full text-base font-normal font-aeonik border border-gray-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {totalBackendHits} Total Hits
          </motion.span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Most Used Endpoints - Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {topBackendEndpoints.length > 0 ? (
            <motion.div className="space-y-3" variants={containerVariants}>
              {topBackendEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  className="bg-gray-50 p-4 rounded-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">
                          #{index + 1}
                        </span>
                        <h5 className="font-inter font-medium">
                          {endpoint.name || "Unnamed Endpoint"}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-1">
                        Folder: {endpoint.folderName}
                      </p>
                      {endpoint.url && (
                        <p className="text-xs text-gray-500 font-mono">
                          {endpoint.url}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-lg font-inter font-semibold text-black">
                        {endpoint.num_hits}
                      </span>
                      <p className="text-xs text-gray-500">hits</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-500 bg-gray-50 p-6 rounded-lg text-center">
              No backend endpoints found
            </p>
          )}
        </motion.div>

        {/* Folder Structure - Right Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {backend_folders && backend_folders.length > 0 ? (
            <motion.div className="space-y-3" variants={containerVariants}>
              {backend_folders.map((folder) => {
                const folderHits =
                  folder.endpoints?.reduce(
                    (sum, endpoint) => sum + (endpoint.num_hits || 0),
                    0
                  ) || 0;

                return (
                  <motion.div
                    key={folder.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={() => toggleFolder(folder.id)}
                      className="w-full p-4 flex justify-between items-center bg-white text-left"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500">
                          {openBackendFolders[folder.id] ? (
                            <IconChevronDown className="size-4 text-black" />
                          ) : (
                            <IconChevronRight className="size-4 text-black" />
                          )}
                        </span>
                        <span className="font-inter text-sm">
                          {folder.name || "Unnamed Folder"}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs text-gray-500">
                          {folder.endpoints?.length || 0} endpoints
                        </span>
                        <span className="text-sm font-inter font-semibold text-black">
                          {folderHits} hits
                        </span>
                      </div>
                    </motion.button>

                    {openBackendFolders[folder.id] && (
                      <motion.div
                        className="p-2 space-y-2 bg-gray-50"
                        variants={accordionVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        {folder.endpoints && folder.endpoints.length > 0 ? (
                          folder.endpoints.map((endpoint) => (
                            <motion.div
                              key={endpoint.id}
                              className="p-3 bg-white rounded-lg border border-gray-200 text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-inter font-medium mb-1">
                                    {endpoint.name || "Unnamed Endpoint"}
                                  </div>
                                  {endpoint.url && (
                                    <div className="text-xs text-gray-500 font-mono">
                                      {endpoint.url}
                                    </div>
                                  )}
                                </div>
                                <div className="text-black font-inter font-semibold ml-3">
                                  {endpoint.num_hits || 0}
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm p-3 bg-white rounded-lg text-center">
                            No endpoints in this folder
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <p className="text-gray-500 bg-gray-50 p-6 rounded-lg text-center">
              No backend folders found
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EndpointStats;
