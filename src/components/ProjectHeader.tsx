import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import { RouteComponentProps } from 'react-router-dom';

import ElevationScroll from './ElevationScroll';
import { ProjectNavTabs } from '../services/data';
import { useAppSelector, useAppDispatch } from '../hooks';
import { upTabIndex } from '../slices/project';

interface Props {
  projectName: string;
  history: {
    push: (path: string) => void;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.dark,
  },
  tabs: {
    marginLeft: 'auto',
  },
}));

const ProjectHeader = (props: Props) => {
  const classes = useStyles();
  const { projectName, history } = props;

  const dispatch = useAppDispatch();
  const tabIndex = useAppSelector((state) => state.project.tabIndex);

  const handleTabChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    dispatch(upTabIndex(newIndex));
  };

  const handleTabClick = (event: React.MouseEvent, name: string, path: string) => {
    history.push(`/${name}/${path}`);
  };

  return (
    <ElevationScroll>
      <header className={ classes.header }>
        <AppBar position="sticky">
          <Toolbar disableGutters>
            <Typography variant="h6">
              { `Projeto: ${projectName}` }
            </Typography>
            <Tabs value={ tabIndex } onChange={ handleTabChange }>
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
      </header>
    </ElevationScroll>
  );
};

export default ProjectHeader;
