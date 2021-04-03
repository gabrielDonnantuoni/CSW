import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ElevationScroll from './ElevationScroll';
import { ProjectNavTabs } from '../services/data';
import { useAppSelector, useAppDispatch } from '../hooks';
import { upTabIndex } from '../slices/project';
import { saveProject } from '../services/storage';

interface Props {
  projectName: string;
  history: {
    push: (path: string) => void;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  tabs: {
    marginLeft: 'auto',
  },
  projectName: {
    marginLeft: theme.spacing(2),
  },
  leaveButton: {
    backgroundColor: theme.palette.secondary.dark,
    height: '100%',
    borderRadius: '0',
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    transform: 'rotate(180deg)',
  },
}));

const ProjectHeader = (props: Props) => {
  const classes = useStyles();
  const { projectName, history } = props;

  const dispatch = useAppDispatch();
  const projectState = useAppSelector((state) => state.project);

  const handleTabChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    dispatch(upTabIndex(newIndex));
  };

  const handleTabClick = (event: React.MouseEvent, name: string, path: string) => {
    history.push(`/${name}/${path}`);
  };

  const leaveProject = () => {
    saveProject(projectState);
    history.push('/');
  };

  return (
    <ElevationScroll>
      <AppBar position="sticky" className={ classes.header }>
        <Toolbar disableGutters>
          <Tooltip arrow title="Sair">
            <Button
              type="button"
              variant="contained"
              onClick={ leaveProject }
              className={ classes.leaveButton }
            >
              <ExitToAppIcon />
            </Button>
          </Tooltip>
          <Typography variant="h6" className={ classes.projectName }>
            { `Projeto: ${projectName}` }
          </Typography>
          <Tabs
            value={ projectState.tabIndex }
            onChange={ handleTabChange }
            className={ classes.tabs }
          >
            { ProjectNavTabs.map((tabProps) => (
              <Tab
                key={ tabProps.id }
                { ...tabProps }
                onClick={ (e) => handleTabClick(e, projectName, tabProps.path) }
              />
            )) }
          </Tabs>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default ProjectHeader;
