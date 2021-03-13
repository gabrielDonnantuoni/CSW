import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { initiateProject, delProject } from '../services/storage';
import { useAppDispatch } from '../hooks';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '80%',
    '& h6': {
      marginLeft: theme.spacing(2),
    },
  },
  buttonWrapper: {
    '& > *': {
      width: '25%',
      marginLeft: theme.spacing(2),
    },
  },
  openButton: {
    backgroundColor: theme.palette.info.dark,
    color: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

interface Props {
  name: string;
  callback: (value: boolean) => void;
}

const ProjectCard = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const startProject = () => {
    initiateProject(dispatch, props.name)
      .then(() => history.push(`/${encodeURI(props.name)}`));
  };

  const deleteProject = () => {
    delProject(props.name);
    props.callback(true);
  };

  return (
    <Card variant="outlined" className={ classes.root }>
      <Grid container alignItems="center" justify="space-between">
        <Typography variant="h6">
          { props.name }
        </Typography>
        <Grid
          item
          container
          xs={ 4 }
          alignItems="center"
          justify="flex-end"
          className={ classes.buttonWrapper }
        >
          <Tooltip arrow title="Abrir">
            <Button
              type="button"
              variant="contained"
              onClick={ startProject }
              className={ classes.openButton }
            >
              <LaunchIcon />
            </Button>
          </Tooltip>
          <Tooltip arrow title="Apagar">
            <Button
              type="button"
              variant="contained"
              onClick={ deleteProject }
              className={ classes.deleteButton }
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectCard;
