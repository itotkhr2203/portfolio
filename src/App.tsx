import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  selectLoginUser,
  selectProfiles,
} from './features/auth/authSlice';
import {
  fetchAsyncGetTasks,
  fetchAsyncGetUsers,
  fetchAsyncGetCategory,
  selectSelectedTask,
  selectEditedTask,
} from './features/task/taskSlice';

import TaskList from './features/task/TaskList';
import TaskForm from './features/task/TaskForm';
import TaskDisplay from './features/task/TaskDisplay';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { CssBaseline, Grid, Paper, } from '@mui/material';
import TaskAppBar from './features/task/TaskAppBar';
import { brown, deepOrange } from '@mui/material/colors';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(45deg, #391312 45px, transparent 45px)64px 64px, linear-gradient(45deg, #391312 45px, transparent 45px,transparent 91px, #000 91px, #000 135px, transparent 135px), linear-gradient(-45deg, #391312 23px, transparent 23px, transparent 68px,#391312 68px,#391312 113px,transparent 113px,transparent 158px,#391312 158px)',
          backgroundColor: '#000',
          backgroundSize: '128px 128px',
          color: 'white',

        }
      }
    }
  },
  palette: {
    primary: {
      main: deepOrange[800],
    },
    secondary: {
      main: brown[800],
    },
  },

});

const MainPaper = styled(Paper)(({ theme }) => ({
  padding: 15,
}));

const App: FC = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectSelectedTask);
  const editedTask = useAppSelector(selectEditedTask);
  const loginUser = useAppSelector(selectLoginUser);
  const profiles = useAppSelector(selectProfiles);
  const loginProfile = profiles.filter((prof) => prof.user_profile === loginUser.id)[0];

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetTasks());
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetProfs());
    };
    fetchBootLoader();
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskAppBar loginProfile={loginProfile} />
      <Grid container>
        <Grid item xs={12} md={7} sx={{ p: 2, }}>
          <MainPaper >
            <TaskList />
          </MainPaper>
        </Grid>

        <Grid item xs={12} md={5} sx={{ p: 2, }}>
          {(selectedTask.id !== 0 || editedTask.status === '1') &&
            <MainPaper >
              {editedTask.status ? <TaskForm /> : <TaskDisplay />}
            </MainPaper>
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
