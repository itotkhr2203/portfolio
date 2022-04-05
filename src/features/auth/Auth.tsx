import React, { FC, useState } from 'react';
import { Box, Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncCreateProf,
  selectIsLoginView,
} from './authSlice';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const isLoginView = useAppSelector(selectIsLoginView);
  const [credential, setCredential] = useState({ username: 'user1', password: 'user1' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };

  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const result = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential));
        await dispatch(fetchAsyncCreateProf());
      }
    }
  }
  return (
    <>
      <Grid container component='main' sx={{ height: '100vh' }} >

        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          square
          elevation={6}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <TwitterIcon />
            </Avatar>
            <Typography variant='h5'>{isLoginView ? 'LOGIN' : 'REGISTER'}</Typography>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='username'
              name='username'
              label='User Name'
              autoFocus
              value={credential.username}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='password'
              name='password'
              label='password'
              type='password'
              value={credential.password}
              onChange={handleInputChange}
            />
            <Box
              sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Button variant='contained' sx={{ mt: 2 }} onClick={login}>
                {isLoginView ? 'LOGIN' : 'REGISTER'}
              </Button>
              <Button sx={{ mt: 2 }} onClick={() => dispatch(toggleMode())}>
                {isLoginView ? 'CREATE NEW ACCOUNT' : 'BACK TO LOGIN'}
              </Button>
              <Button sx={{ mt: 10 }} variant='outlined' onClick={() => window.location.href = '/'}>
                ポートフォリオページに戻る
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>)
}

export default Auth