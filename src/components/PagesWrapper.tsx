"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const PagesWrapper = ({
  children,
  className,
  subPage,
}: {
  children: ReactNode;
  className?: string;
  subPage?: boolean;
}) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: subPage ? 0.3 : 0 } }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.main>
  );
};

export default PagesWrapper;
