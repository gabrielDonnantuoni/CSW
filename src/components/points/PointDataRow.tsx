import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Props {
  data: string[] | boolean[];
  label: string;
  type: 'regular' | 'header';
}
type Length3Indexes = 0 | 1 | 2;
type StrOrBool = string | boolean;

const PointDataRow = (props: Props) => {
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

  const mapRow = (data: Array<StrOrBool>,
    type: 'regular' | 'header') => data.map((value, index) => (
    valuesRow(value, index as Length3Indexes, type)));

  return (
    <Grid container spacing={ 1 }>
      <Grid item xs={ 2 } sm={ 3 }>
        <Typography variant="h6">{ props.label }</Typography>
      </Grid>
      <Grid item container xs={ 10 } sm={ 9 } spacing={ 2 } alignItems="center">
        { mapRow(props.data, props.type) }
      </Grid>
    </Grid>
  );
};

export default PointDataRow;
