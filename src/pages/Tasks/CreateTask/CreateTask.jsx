import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Autocomplete,
} from '@mui/material';

import TasksService from '../../../store/services/tasks.service';
import ProjectsService from '../../../store/services/projects.service';
import { SET_NOTIFICATION } from '../../../store/actions';
import { status } from '../utils';
import { formatName } from '../../../helpers/utils';

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
  const { user: currentUser } = useSelector((state) => state.auth);

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

  const [values, setValues] = React.useState({
    status: getDefaultStatus() || 'NOT_STARTED',
    reporter: {
      id: currentUser.id,
      label: currentUser.firstName ? currentUser.firstName : currentUser.email,
    },
    assigned: {
      id: currentUser.id,
      label: currentUser.firstName ? currentUser.firstName : currentUser.email,
    },
  });
  const [users, setUsers] = React.useState([]);

  const data = async () => {
    setUsers(await ProjectsService.getUserOfProject(projectId));
  };

  React.useEffect(() => {
    data();
  }, []);

  const handleChange = (name) => (event, value) => {
    setValues({
      ...values,
      [name]: event.target.value || value,
    });
  };

  const isValid = () => {
    if (!values.title || values.title === '') {
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!isValid()) return false;

    let assignments = {};
    if (values.assigned || values.reporter) {
      assignments = {
        ...(values.assigned && { assigned: values.assigned.id }),
        ...(values.reporter && { reporter: values.reporter.id }),
      };
      delete values.assigned;
      delete values.reporter;
    }

    const payload = {
      project: projectId,
      ...assignments,
      ...values,
    };

    TasksService.createTask(payload).then(() => {
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
      <Typography variant="h4" component="h4" sx={{ mb: 4 }}>
        Create new task
      </Typography>
      <Box component="form" onSubmit={() => handleSubmitForm} noValidate>
        <Grid container spacing={2} display="flex" flexDirection="column">
          <Grid item sm={3}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={values.status}
                onChange={handleChange('status')}
                variant="filled"
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
            <FormControl required fullWidth>
              <TextField
                type="text"
                placeholder="Name of the task"
                label="Name*"
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
            <Typography variant="h6" component="h6" sx={{ mb: 1, mt: 1 }}>
              Other parameters
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    autoHighlight
                    options={users.map((user) => ({ id: user._id, label: formatName(user) }))}
                    fullWidth
                    onChange={handleChange('assigned')}
                    renderInput={(params) => <TextField label="Assigned" {...params} />}
                    value={values.assigned || null}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    autoHighlight
                    options={users.map((user) => ({ id: user._id, label: formatName(user) }))}
                    fullWidth
                    onChange={handleChange('reporter')}
                    renderInput={(params) => <TextField label="Reporter" {...params} />}
                    value={values.reporter || null}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                  />
                </FormControl>
              </Grid>
            </Grid>
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
