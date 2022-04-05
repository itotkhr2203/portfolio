import React from 'react'
import { CssBaseline } from '@mui/material'
import Configuration from './Configuration'
import Footer from './Footer'
import Introduction from './Introduction'
import Learning from './Learning'
import ScrollTop from './ScrollTop'
import Skills from './Skills'
import TopBar from './TopBar'
import { createTheme, ThemeProvider } from '@mui/material'
import { brown, deepOrange } from '@mui/material/colors'

const Portfolio = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepOrange[800],
      },
      secondary: {
        main: brown[800],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <div id="back-to-top-anchor" ></div>
      <Introduction />
      <Skills />
      <Learning />
      <Configuration />
      <ScrollTop />
      <Footer />
    </ThemeProvider>
  )
}

export default Portfolio