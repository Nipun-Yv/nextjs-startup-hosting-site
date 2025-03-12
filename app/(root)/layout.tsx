import React from 'react'
import Navbar from '../../components/Navbar'
import { Box, Container } from '@chakra-ui/react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <Box p="0" m="0" fontFamily="var(--font-work-sans)">
        <Navbar/>
        {children}
    </Box>
  )
}

export default Layout