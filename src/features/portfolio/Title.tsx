import { Typography } from '@mui/material';
import React from 'react'
import { FC } from 'react'

type Props = {
  children?: React.ReactNode;
}

const Title: FC<Props> = ({ children }) => {
  return (
    <Typography sx={{ borderLeft: '10px solid #D84315', pl: 1, mb: 2 }} variant='h5' component='h2' gutterBottom>
      {children}
    </Typography>
  )
}

export default Title