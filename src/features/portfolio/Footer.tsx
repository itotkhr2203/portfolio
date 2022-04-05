import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'black', mt: 10 }}>
      <Typography sx={{ py: 2 }} align='center' variant='body2' color='white' >- {(new Date()).getFullYear()} -</Typography>
    </Box>
  )
}

export default Footer