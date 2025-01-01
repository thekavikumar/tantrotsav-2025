import React from 'react'
import { useState,useEffect } from 'react';
import { motion,AnimatePresence } from "framer-motion";
import logo1 from "../assets/uniLogo1.svg"
import logo2 from "../assets/Tantrotsav.svg"

export default function Logos() {
    // Logo management
      const logos = [
        logo1,logo2
      
      ]; // Add your logo paths here
      const [currentLogoidx, setCurrentLogoidx] = useState(0);
    
      useEffect(() => {
        // Change logo periodically
        const logoInterval = setInterval(() => {
          setCurrentLogoidx((prevLogoidx) => {
           return ((prevLogoidx + 1) % logos.length);
            
          });
        }, 3000);
    
        return () => clearInterval(logoInterval); // Cleanup interval on unmount
      }, []);
  return (
    <div>
      <AnimatePresence mode='wait'>
      <motion.div
              
              key={currentLogoidx} 
              initial={{ opacity: 0, scale: 1  }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logos[currentLogoidx]} alt="Logo" className="lg:h-8 h-6 hide-img:hidden" />
            </motion.div>

      </AnimatePresence>
      
    </div>
  )
}
