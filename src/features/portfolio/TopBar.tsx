import React from 'react'
import { AppBar, Box, Typography, Link, Toolbar } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ pl: 3, }}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='h1'>ITO TAKAHIRO</Typography>
          <Link sx={{ ml: 'auto', color: 'white' }} href='https://github.com/itotkhr2203' target='_blank'><GitHubIcon /></Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar