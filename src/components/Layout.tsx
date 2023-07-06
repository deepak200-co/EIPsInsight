import { Providers } from '@/app/providers'
import React from 'react'
import LargeWithAppLinksAndSocial from '@/components/Footer'
import WithSubnavigation from '@/components/Nav'
import { Box, ColorModeScript } from '@chakra-ui/react'
import { Montserrat } from 'next/font/google'
import '../app/globals.css'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'

const mont = Montserrat({ subsets: ['latin'] })
const AllLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = usePathname();
  return (
    <motion.div
    key={router}
    initial="initialState"
    animate="animateState"
    exit="exitState"
    transition={{
      duration: 0.75,
    }}
    variants={{
      initialState: {
        opacity: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      },
      animateState: {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      },
      exitState: {
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
      },
    }}
    className={`${mont.className} base-page-size`}
  >
    <ColorModeScript initialColorMode='light' />
    <Providers>
      <WithSubnavigation/>
      
        {children}
      <LargeWithAppLinksAndSocial/>
      </Providers>
    </motion.div>
  )
}

export default AllLayout