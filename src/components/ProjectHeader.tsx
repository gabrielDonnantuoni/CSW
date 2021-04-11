import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
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
  nav: {
    marginLeft: 'auto',
  },
  tab: {
    minWidth: '30px',
  },
  gridDrawer: {
    height: '75vh',
    padding: '10vh 8px',
    '& > *': {
      marginBottom: '12px',
    },
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
  const vwLess850 = useMediaQuery('(max-width:850px)');
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useAppDispatch();
  const projectState = useAppSelector((state) => state.project);

  const handleTabChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    dispatch(upTabIndex(newIndex));
  };

  const handleNavClick = (event: React.MouseEvent, name: string, path: string) => {
    history.push(`/${name}/${path}`);
  };

  const handleDrawerToggle = () => { setOpenDrawer(!openDrawer); };

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
          { vwLess850 ? (
            <>
              <IconButton
                color="secondary"
                onClick={ handleDrawerToggle }
                className={ classes.nav }
              >
                <MenuIcon style={ { fontSize: 28 } } />
              </IconButton>
              <Drawer
                anchor="right"
                variant="temporary"
                onClose={ handleDrawerToggle }
                open={ openDrawer }
                ModalProps={ { keepMounted: true } }
              >
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  className={ classes.gridDrawer }
                >
                  { ProjectNavTabs.map(({ label, path }) => (
                    <Button
                      key={ label }
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={ (e) => handleNavClick(e, projectName, path) }
                    >
                      { label }
                    </Button>
                  )) }
                </Grid>
              </Drawer>
            </>
          ) : (
            <Tabs
              value={ projectState.tabIndex }
              onChange={ handleTabChange }
              className={ classes.nav }
            >
              { ProjectNavTabs.map((tabProps) => (
                <Tab
                  key={ tabProps.id }
                  { ...tabProps }
                  onClick={ (e) => handleNavClick(e, projectName, tabProps.path) }
                  className={ classes.tab }
                />
              )) }
            </Tabs>
          ) }
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default ProjectHeader;
