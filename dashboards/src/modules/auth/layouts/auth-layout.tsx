import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { ReactNode } from "react";

import bg1 from "@/assets/images/auth/auth-bg-1.jpeg";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-white/20 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-xl"
      >
        <motion.div
          whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}
          whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}
          // whileTap={{ scale: 0.99 }}
          className="bg-background/70 backdrop-blur-3xl rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="bg-background/90 px-4 py-2 border-b flex justify-between items-center">
            <div className="flex space-x-2">
              {["red", "yellow", "green"].map((color) => (
                <motion.div
                  key={color}
                  className={`w-3 h-3 rounded-full bg-${color}-500`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium"
            >
              Authentication
            </motion.span>
            <ModeToggle />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-10"
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
