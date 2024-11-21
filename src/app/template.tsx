"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const RootTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <motion.main
      transition={{ duration: 0.4 }}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.7 }}
      className="grid flex-grow bg-slate-200/70"
    >
      {children}
    </motion.main>
  );
};

export default RootTemplate;
