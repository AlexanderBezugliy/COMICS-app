import React from 'react';
import './style.css';
import { motion } from 'framer-motion';


const SaleBadge = () => {
    return (
        <motion.div
            className='sale'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            SALE
        </motion.div>
    )
}

export default SaleBadge