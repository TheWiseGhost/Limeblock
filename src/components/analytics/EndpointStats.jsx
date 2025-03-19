import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

const EndpointStats = ({ frontend_folders, backend_folders }) => {
  const [openFrontendFolders, setOpenFrontendFolders] = useState({});
  const [openBackendFolders, setOpenBackendFolders] = useState({});

  // Helper function to toggle folder open/closed state
  const toggleFolder = (folderId, isBackend) => {
    if (isBackend) {
      setOpenBackendFolders((prev) => ({
        ...prev,
        [folderId]: !prev[folderId],
      }));
    } else {
      setOpenFrontendFolders((prev) => ({
        ...prev,
        [folderId]: !prev[folderId],
      }));
    }
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
  const frontendEndpoints = getAllEndpoints(frontend_folders);
  const backendEndpoints = getAllEndpoints(backend_folders);

  // Get top 3 most hit endpoints
  const topFrontendEndpoints = [...frontendEndpoints]
    .sort((a, b) => b.num_hits - a.num_hits)
    .slice(0, 3);

  const topBackendEndpoints = [...backendEndpoints]
    .sort((a, b) => b.num_hits - a.num_hits)
    .slice(0, 3);

  // Calculate total hits for frontend and backend
  const totalFrontendHits = frontendEndpoints.reduce(
    (sum, endpoint) => sum + endpoint.num_hits,
    0
  );
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
      className="border border-gray-300 rounded-lg p-6 font-inter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-aeonik mb-8">Endpoint Analytics</h2>

      <div className="grid grid-cols-2 gap-12">
        {/* Frontend Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-inter">Frontend Endpoints</h3>
            <motion.span
              className="px-4 py-1 text-gray-900 rounded-full text-base font-normal font-aeonik border border-gray-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {totalFrontendHits} Total Hits
            </motion.span>
          </div>

          {/* Top Frontend Endpoints */}
          <div className="mb-6">
            {topFrontendEndpoints.length > 0 ? (
              <motion.div className="space-y-3" variants={containerVariants}>
                {topFrontendEndpoints.map((endpoint) => (
                  <motion.div
                    key={endpoint.id}
                    className="bg-gray-50 p-4 rounded-lg pr-6"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between">
                      <h5 className="font-inter">
                        {endpoint.name || "Unnamed Endpoint"}
                      </h5>
                      <span className="text-black font-inter">
                        {endpoint.num_hits} hits
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">
                      Folder: {endpoint.folderName}
                    </p>
                    {endpoint.url && (
                      <p className="text-xs text-gray-500 mt-1">
                        {endpoint.url}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                No frontend endpoints found
              </p>
            )}
          </div>

          {/* All Frontend Folders */}
          <div>
            <h4 className="text-base text-black mb-3">All Folders Stats</h4>
            {frontend_folders && frontend_folders.length > 0 ? (
              <motion.div className="space-y-3" variants={containerVariants}>
                {frontend_folders.map((folder) => (
                  <motion.div
                    key={folder.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={() => toggleFolder(folder.id, false)}
                      className="w-full p-4 flex justify-start space-x-2 items-center bg-white text-left"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <span className="text-gray-500">
                        {openFrontendFolders[folder.id] ? (
                          <IconChevronDown className="size-4 text-black" />
                        ) : (
                          <IconChevronRight className="size-4 text-black" />
                        )}
                      </span>
                      <span className="font-inter text-sm">
                        {folder.name || "Unnamed Folder"}
                      </span>
                    </motion.button>

                    {openFrontendFolders[folder.id] && (
                      <motion.div
                        className="p-2 space-y-3"
                        variants={accordionVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        {folder.endpoints && folder.endpoints.length > 0 ? (
                          folder.endpoints.map((endpoint) => (
                            <motion.div
                              key={endpoint.id}
                              className="p-3 bg-white rounded-lg border border-gray-300 text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <div className="flex justify-between">
                                <div className="font-inter">
                                  {endpoint.name || "Unnamed Endpoint"}
                                </div>
                                <div className="text-black font-inter">
                                  {endpoint.num_hits || 0} hits
                                </div>
                              </div>
                              {endpoint.url && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {endpoint.url}
                                </div>
                              )}
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm p-3 bg-white rounded-lg">
                            No endpoints in this folder
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                No frontend folders found
              </p>
            )}
          </div>
        </motion.div>

        {/* Backend Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-inter">Backend Endpoints</h3>
            <motion.span
              className="px-4 py-1 text-gray-900 rounded-full text-base font-normal font-aeonik border border-gray-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {totalBackendHits} Total Hits
            </motion.span>
          </div>

          {/* Top Backend Endpoints */}
          <div className="mb-6">
            {topBackendEndpoints.length > 0 ? (
              <motion.div className="space-y-3" variants={containerVariants}>
                {topBackendEndpoints.map((endpoint) => (
                  <motion.div
                    key={endpoint.id}
                    className="bg-gray-50 p-4 rounded-lg pr-6"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between">
                      <h5 className="font-inter">
                        {endpoint.name || "Unnamed Endpoint"}
                      </h5>
                      <span className="text-black font-inter">
                        {endpoint.num_hits} hits
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">
                      Folder: {endpoint.folderName}
                    </p>
                    {endpoint.url && (
                      <p className="text-xs text-gray-500 mt-1">
                        {endpoint.url}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                No backend endpoints found
              </p>
            )}
          </div>

          {/* All Backend Folders */}
          <div>
            <h4 className="text-base text-black mb-3">All Folders Stats</h4>
            {backend_folders && backend_folders.length > 0 ? (
              <motion.div className="space-y-3" variants={containerVariants}>
                {backend_folders.map((folder) => (
                  <motion.div
                    key={folder.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={() => toggleFolder(folder.id, true)}
                      className="w-full p-4 flex justify-start space-x-2 items-center bg-white text-left"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
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
                    </motion.button>

                    {openBackendFolders[folder.id] && (
                      <motion.div
                        className="p-2 space-y-3"
                        variants={accordionVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        {folder.endpoints && folder.endpoints.length > 0 ? (
                          folder.endpoints.map((endpoint) => (
                            <motion.div
                              key={endpoint.id}
                              className="p-3 bg-white rounded-lg border border-gray-300 text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <div className="flex justify-between">
                                <div className="font-inter">
                                  {endpoint.name || "Unnamed Endpoint"}
                                </div>
                                <div className="text-black font-inter">
                                  {endpoint.num_hits || 0} hits
                                </div>
                              </div>
                              {endpoint.url && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {endpoint.url}
                                </div>
                              )}
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm p-3 bg-white rounded-lg">
                            No endpoints in this folder
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                No backend folders found
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EndpointStats;
