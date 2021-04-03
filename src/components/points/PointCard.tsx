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
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { removePoint } from '../../slices/project';
import { InPointInput } from '../../declarations';
import { useAppDispatch } from '../../hooks';
import PointForm from '../PointForm';
import { formatInputNumber } from '../../services/math/numberAndText';

const DECIMAL = 10;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#313131',
    marginBottom: '10px',
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

  type Length3Indexes = 0 | 1 | 2;

  const valuesRow = (value: string | boolean, index: Length3Indexes,
    type: 'regular' | 'header') => {
    let typography;
    const variant = type === 'regular' ? 'body1' : 'h6';
    if (type === 'header') {
      typography = (<Typography variant={ variant }>{`${value}`}</Typography>);
    } else if (typeof value === 'string') {
      const unit = index === 2 ? 'kNm' : 'kN';
      typography = (<Typography variant={ variant }>{`${value} ${unit}`}</Typography>);
    } else {
      const restriction = value ? 'Fixo' : 'Livre';
      typography = (<Typography variant={ variant }>{`${restriction}`}</Typography>);
    }

    return (
      <Grid key={ index } item xs>
        { typography }
      </Grid>
    );
  };

  type StrOrBool = string | boolean;

  const mapRow = (data: Array<StrOrBool>,
    type: 'regular' | 'header') => data.map((value, index) => (
    valuesRow(value, index as Length3Indexes, type)));

  const dataGridRow = (data: string[] | boolean[],
    label: string, type: 'regular' | 'header') => (
      <Grid container spacing={ 1 }>
        <Grid item xs={ 3 }>
          <Typography variant="h6">{ label }</Typography>
        </Grid>
        <Grid item container xs={ 9 } spacing={ 2 } alignItems="center">
          { mapRow(data, type) }
        </Grid>
      </Grid>
  );

  const contentHead = ['Horizontal ↦', 'Vertical ↥', 'Momento ↶'];

  return (
    <Card variant="elevation" className={ classes.root }>
      <CardHeader title={ `Ponto (${formattedPoint.cordX} ; ${formattedPoint.cordY})` } />
      <CardContent>
        { dataGridRow(contentHead, 'Vetor', 'header') }
        { dataGridRow(formattedPoint.f, 'Esforços', 'regular') }
        { dataGridRow(formattedPoint.r, 'Restrições', 'regular') }
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
