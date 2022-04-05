import React, { FC } from 'react'
import { Box, AppBar, Avatar, IconButton, Toolbar, Typography, styled } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { PROFILE } from '../types';
import { useAppDispatch } from '../../app/hooks';
import { fetchAsyncUpdateProf } from '../auth/authSlice';


type Props = {
  loginProfile: PROFILE;
}

const TaskAppBar: FC<Props> = ({ loginProfile }) => {
  const dispatch = useAppDispatch();

  const Logout = () => {
    localStorage.removeItem('localJWT');
    window.location.href = '/auth';
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  }

  const Input = styled('input')({
    display: 'none',
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            Scrum Task Board
          </Typography>
          <IconButton onClick={Logout}><LogoutIcon /></IconButton>

          <label htmlFor="avatar-button-file">
            <Input accept="image/*" id="avatar-button-file" type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(fetchAsyncUpdateProf({
                id: loginProfile.id,
                img: e.target.files !== null ? e.target.files[0] : null,
              }))
            }} />
            <Avatar onClick={handleEditPicture} src={loginProfile?.img !== null ? loginProfile?.img : undefined} sx={{ ml: 1 }} />
          </label>

        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default TaskAppBar