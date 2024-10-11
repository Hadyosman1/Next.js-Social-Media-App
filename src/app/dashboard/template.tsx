"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const DashboardTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <motion.main
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, y: 20 }}
      className="grow overflow-y-auto px-3 md:px-6"
    >
      {children}
    </motion.main>
  );
};

export default DashboardTemplate;
