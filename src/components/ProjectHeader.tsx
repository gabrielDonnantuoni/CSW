import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import ElevationScroll from './ElevationScroll';
import { ProjectNavTabs } from '../services/data';

const { useState } = React;

interface OwnProps extends RouteComponentProps {
  projectName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.dark,
  },
  tabs: {
    marginLeft: 'auto',
  },
}));

const ProjectHeader = (props: OwnProps) => {
  const classes = useStyles();
  const { projectName, history } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleTabClick = (event: React.MouseEvent, name: string, path: string) => {
    history.push(`/${name}/${path}`);
  };

  return (
    <ElevationScroll>
      <header className={ classes.header }>
        <AppBar position="sticky">
          <Toolbar>
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
