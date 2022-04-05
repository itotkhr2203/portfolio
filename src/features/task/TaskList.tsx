import React, { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchAsyncDeleteTask,
  selectTasks,
  editTask,
  selectTask,
} from './taskSlice';
import { selectLoginUser, selectProfiles } from '../auth/authSlice';
import { initialState } from './taskSlice';
import { SORT_STATE, READ_TASK } from '../types';
import { styled } from '@mui/material/styles';
import { Avatar, Badge, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TableSortLabel } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteIconIcon from '@mui/icons-material/Delete';

const TaskList: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const loginUser = useAppSelector(selectLoginUser);
  const profiles = useAppSelector(selectProfiles);
  const columns = tasks[0] && Object.keys(tasks[0]);

  const [state, setState] = useState<SORT_STATE>({
    rows: tasks,
    order: 'desc',
    activeKey: '',
  })

  const handleClickSortColumn = (column: keyof READ_TASK) => {
    const isDesc = column === state.activeKey && state.order === 'desc';
    const newOrder = isDesc ? 'asc' : 'desc';
    Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === 'asc' ? 1 : -1;
      } else if (a[column] < b[column]) {
        return newOrder === 'asc' ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: tasks,
    }));
  }, [tasks]);

  const renderSwitch = (statusName: string) => {
    switch (statusName) {
      case 'Not started':
        return (
          <Badge variant='dot' color='error'>
            {statusName}
          </Badge>
        );
      case 'On going':
        return (
          <Badge variant='dot' color='primary'>
            {statusName}
          </Badge>
        );
      case 'Done':
        return (
          <Badge variant='dot' color='secondary'>
            {statusName}
          </Badge>
        );
      default:
        return null;
    }
  };

  const conditionalSrc = (user: number) => {
    const loginProfile = profiles.filter(
      (prof) => prof.user_profile === user
    )[0];
    return loginProfile?.img !== null ? loginProfile?.img : undefined;
  }

  const CustomTableRow = styled(TableRow)`
  &.MuiTableRow-hover:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
`;

  return (
    <Box sx={{ maxWidth: 1500, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', }}>
        <Button variant='contained' startIcon={<AddCircleOutlinedIcon />} sx={{ my: 2, }}
          onClick={() => {
            dispatch(
              editTask({
                id: 0,
                task: '',
                description: '',
                criteria: '',
                responsible: loginUser.id,
                status: '1',
                category: 1,
                estimate: 0,
              })
            );
            dispatch(selectTask(initialState.selectedTask));
          }}
        >ADD NEW</Button>
      </Box>
      {tasks[0]?.task && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, colIndex) => (
                  column === 'task' ||
                  column === 'status' ||
                  column === 'category' ||
                  column === 'estimate' ||
                  column === 'responsible' ||
                  column === 'owner') && (
                    <TableCell key={colIndex} padding={'normal'} align='center' sx={{ fontWeight: 'bold' }}>
                      <TableSortLabel active={state.activeKey === column}
                        direction={state.order}
                        onClick={() => handleClickSortColumn(column)}>
                        {column}
                      </TableSortLabel>
                    </TableCell>
                  ))
                }
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.rows.map((row, rowIndex) => (
                <CustomTableRow hover key={rowIndex}>
                  {Object.keys(row).map(
                    (key, colIndex) =>
                      (key === 'task' ||
                        key === 'status_name' ||
                        key === 'category_item' ||
                        key === 'estimate') && (
                        <TableCell
                          align='center' key={`${rowIndex}+${colIndex}`} onClick={() => {
                            dispatch(selectTask(row));
                            dispatch(editTask(initialState.editedTask));
                          }}
                        >
                          {key === 'status_name' ? (renderSwitch(row[key])) : (<span style={{ display: 'inline-block' }}>{row[key]}</span>)}
                        </TableCell>
                      )
                  )}
                  <TableCell align='center' onClick={() => {
                    dispatch(selectTask(row));
                    dispatch(editTask(initialState.editedTask));
                  }}>
                    <Avatar sx={{ display: 'inline-flex' }} src={conditionalSrc(row['responsible'])} />
                  </TableCell>
                  <TableCell align='center' onClick={() => {
                    dispatch(selectTask(row));
                    dispatch(editTask(initialState.editedTask));
                  }}>
                    <Avatar sx={{ display: 'inline-flex' }} src={conditionalSrc(row['owner'])} />
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton onClick={() => {
                      dispatch(fetchAsyncDeleteTask(row.id));
                    }}
                      disabled={row['owner'] !== loginUser.id}
                    ><DeleteIconIcon /></IconButton>
                  </TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box >
  )
}

export default TaskList