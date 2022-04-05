import React, { FC, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchAsyncCreateTask,
  fetchAsyncUpdateTask,
  fetchAsyncCreateCategory,
  selectUsers,
  selectEditedTask,
  selectCategory,
  editTask,
  selectTask,
} from './taskSlice';
import { initialState } from './taskSlice';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const TaskForm: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const category = useAppSelector(selectCategory);
  const editedTask = useAppSelector(selectEditedTask);

  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isDisabled =
    editedTask.task.length === 0 ||
    editedTask.description.length === 0 ||
    editedTask.criteria.length === 0;

  const isCatDisabled = inputText.length === 0;

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    const name = e.target.name;
    if (name === 'estimate') {
      value = Number(value);
    }
    dispatch(editTask({ ...editedTask, [name]: value }));
  };
  const handleSelectRespChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as number;
    dispatch(editTask({ ...editedTask, responsible: value }));
  };

  const handleSelectStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value as string;
    dispatch(editTask({ ...editedTask, status: value }));
  };

  const handleSelectCatChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as number;
    dispatch(editTask({ ...editedTask, category: value }));
  };

  let userOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.username}
    </MenuItem>
  ));

  let catOptions = category.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.item}
    </MenuItem>
  ));


  return (<>
    <Container maxWidth='md'>

      <Typography sx={{ mb: 3 }} component='h2' variant='h5' align='center'>{editedTask.id ? 'Update Task' : 'New Task'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label='Estimate [days]'
            type='number'
            name='estimate'
            InputProps={{ inputProps: { min: 0, max: 1000 } }}
            InputLabelProps={{
              shrink: true,
            }}
            value={editedTask.estimate}
            onChange={handleInputChange}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label='Task'
            type='text'
            name='task'
            InputLabelProps={{
              shrink: true,
            }}
            value={editedTask.task}
            onChange={handleInputChange}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label='Description'
            type='text'
            name='description'
            InputLabelProps={{
              shrink: true,
            }}
            value={editedTask.description}
            onChange={handleInputChange}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label='Criteria'
            type='text'
            name='criteria'
            InputLabelProps={{
              shrink: true,
            }}
            value={editedTask.criteria}
            onChange={handleInputChange}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Responsible</InputLabel>
            <Select
              variant='standard'
              name='responsible'
              onChange={handleSelectRespChange}
              value={editedTask.responsible}>
              {userOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          {editedTask.id ?
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                variant='standard'
                name='status'
                onChange={handleSelectStatusChange}
                value={editedTask.status}>
                <MenuItem value={1}>Not started</MenuItem>
                <MenuItem value={2}>On going</MenuItem>
                <MenuItem value={3}>Done</MenuItem>
              </Select>
            </FormControl>
            : <TextField
              fullWidth
              label='Status'
              type='text'
              name='status'
              InputLabelProps={{
                shrink: true,
              }}
              value='Not started'
              variant='standard'
            />
          }
        </Grid>
        <Grid item xs={12} sm={8} xl={6} sx={{ display: 'flex', mx: 'auto', alignItems: 'center', mb: 1 }} >
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel>Category</InputLabel>
            <Select
              variant='standard'
              name='category'
              onChange={handleSelectCatChange}
              value={editedTask.category}>
              {catOptions}
            </Select>
          </FormControl>
          <Fab sx={{ ml: 2, flexShrink: 0 }} onClick={handleOpen} size='small' color='primary'><AddIcon /></Fab>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Register Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              label="Category"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={inputText}
              onChange={handleInputTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isCatDisabled}
              startIcon={<SaveIcon />}
              variant='contained'
              onClick={() => {
                dispatch(fetchAsyncCreateCategory(inputText));
                handleClose();
              }
              }>
              Register
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button startIcon={<SaveIcon />} variant='contained'
            disabled={isDisabled}
            onClick={
              editedTask.id !== 0
                ? () => dispatch(fetchAsyncUpdateTask(editedTask))
                : () => dispatch(fetchAsyncCreateTask(editedTask))
            }
          >{editedTask.id !== 0 ? 'UPDATE' : 'SAVE'}</Button>
          <Button sx={{ ml: 2 }} variant='contained' color='secondary'
            onClick={() => {
              dispatch(editTask(initialState.editedTask));
              dispatch(selectTask(initialState.selectedTask));
            }}
          >CANCEL</Button>
        </Grid>
      </Grid>
    </Container>
  </>)
}

export default TaskForm