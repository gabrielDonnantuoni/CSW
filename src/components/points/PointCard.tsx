import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { removePoint } from '../../slices/project';
import { InPointInput } from '../../declarations';
import { useAppDispatch } from '../../hooks';
import PointForm from '../PointForm';
import { formatInputNumber } from '../../services/math/numberAndText';
import PointDataRow from './PointDataRow';

const DECIMAL = 10;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#313131',
    margin: '0 8px 16px 8px',
  },
  editButton: {
    backgroundColor: theme.palette.warning.main,
    color: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
  backdrop: {
    zIndex: 1000,
  },
}));

interface Props {
  point: InPointInput;
}

const PointCard = (props: Props) => {
  const classes = useStyles();
  const { id, cordX, cordY, f, restrictions } = props.point;
  const [showForm, setShowForm] = useState(false);

  const replaceDotAndFormat = (value: number) => {
    let strValue = value.toString(DECIMAL);
    strValue = strValue.replace('.', ',');
    return formatInputNumber(strValue, 'pt-br');
  };

  const formattedPoint = {
    id,
    cordX: replaceDotAndFormat(cordX),
    cordY: replaceDotAndFormat(cordY),
    f: f.map((value) => (
      replaceDotAndFormat(value))) as [string, string, string],
    r: restrictions,
  };

  const dispatch = useAppDispatch();

  const deletePoint = () => { dispatch(removePoint(id)); };

  const editPoint = () => { setShowForm(true); };

  const vwLess600 = useMediaQuery('(max-width:600px)');

  const contentHead = () => {
    const result = ['Horizontal ↦', 'Vertical ↥', 'Momento ↶'];
    if (vwLess600) result[1] = 'Vertical - ↥';
    return result;
  };

  const vectorText = () => {
    const vectorF = vwLess600 ? 'F' : 'Esforços';
    const vectorR = vwLess600 ? 'R' : 'Restrições';
    return { f: vectorF, r: vectorR };
  };

  return (
    <Card variant="elevation" className={ classes.root }>
      <CardHeader title={ `Ponto (${formattedPoint.cordX} ; ${formattedPoint.cordY})` } />
      <CardContent>
        <PointDataRow data={ contentHead() } label="Vetor" type="header" />
        <PointDataRow data={ formattedPoint.f } label={ vectorText().f } type="regular" />
        <PointDataRow data={ formattedPoint.r } label={ vectorText().r } type="regular" />
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <Button
            type="button"
            variant="contained"
            onClick={ editPoint }
            className={ classes.editButton }
          >
            <EditIcon />
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={ deletePoint }
            className={ classes.deleteButton }
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </CardActions>
      <Backdrop open={ showForm } className={ classes.backdrop }>
        <PointForm defaultValues={ formattedPoint } setShowForm={ setShowForm } />
      </Backdrop>
    </Card>
  );
};

export default PointCard;
