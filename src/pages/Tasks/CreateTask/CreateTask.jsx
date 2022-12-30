import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import {
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import TaskService from '../../../store/services/tasks.service';
import { SET_NOTIFICATION } from '../../../store/actions/types';
import { status } from '../utils';

const statusOptions = [
  {
    label: 'Not started',
    value: status.NOT_STARTED,
  },
  {
    label: 'In progress',
    value: status.IN_PROGRESS,
  },
  {
    label: 'Done',
    value: status.DONE,
  },
];

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [search] = useSearchParams();

  const getDefaultStatus = () => {
    const statusParam = search.get('status');

    switch (statusParam) {
      case 'not-started':
        return status.NOT_STARTED;
      case 'in-progress':
        return status.IN_PROGRESS;
      case 'done':
        return status.DONE;

      default:
        break;
    }
    return null;
  };

  const [values, setValues] = React.useState({ status: getDefaultStatus() || 'NOT_STARTED' });

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const isValid = () => {
    if (values.title === '') {
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!isValid()) return false;

    const payload = {
      project: projectId,
      ...values,
    };

    TaskService.createTask(payload).then(() => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: `Task "${values.title}" successfully created!`,
          type: 'success',
        },
      });
      navigate(-1);
    });

    return true;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create new task
      </Typography>
      <Box component="form" onSubmit={() => handleSubmitForm} noValidate>
        <Grid container spacing={2} display="flex" flexDirection="column">
          <Grid item>
            <FormControl required fullWidth>
              <TextField
                type="text"
                placeholder="Name of the task"
                label="Name"
                variant="outlined"
                onChange={handleChange('title')}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                type="text"
                placeholder="My little task description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange('description')}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                label="Status"
                labelId="status-label"
                value={values.status}
                onChange={handleChange('status')}
              >
                {statusOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid()}
              disableRipple
              onClick={handleSubmitForm}
              sx={{
                marginRight: 1,
              }}
            >
              Create new task!
            </Button>
            <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateTask;
