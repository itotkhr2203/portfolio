import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editTask, selectSelectedTask } from './taskSlice';
import { Button, Container, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { selectLoginUser } from '../auth/authSlice';


const TaskDisplay: FC = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectSelectedTask);
  const loginUser = useAppSelector(selectLoginUser);

  const rows = [
    { item: 'Task', data: selectedTask.task },
    { item: 'Description', data: selectedTask.description },
    { item: 'Criteria', data: selectedTask.criteria },
    { item: 'Owner', data: selectedTask.owner_username },
    { item: 'Responsible', data: selectedTask.responsible_username },
    { item: 'Estimate [days]', data: selectedTask.estimate },
    { item: 'Category', data: selectedTask.category_item },
    { item: 'Status', data: selectedTask.status_name },
    { item: 'Created', data: selectedTask.created_at },
    { item: 'Updated', data: selectedTask.updated_at },
  ]

  if (!selectedTask.task) {
    return null;
  }
  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant='h5' align='center'>Task detail</Typography>
        <Table>
          <TableBody>
            {
              rows.map((row) => {
                return (
                  <TableRow key={row.item}>
                    <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>{row.item}</TableCell>
                    <TableCell>{row.data}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button startIcon={<EditIcon />} variant='contained'
            onClick={() => { dispatch(editTask(selectedTask)) }}
            disabled={selectedTask.owner !== loginUser.id}
          >
            Edit
          </Button>
        </Grid>
      </Container>
    </>
  )
}

export default TaskDisplay