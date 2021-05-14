/* eslint-disable max-lines */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { InputNumber, InputText, InputDataList, InputSelect } from '../inputs';
import { addBar, editBar } from '../../slices/project';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AdjPoints, SectionTypes } from '../../declarations';
import { belongsToLineEq, calcL } from '../../services/math/elementsOperations';
import Bar from '../../services/structureMethods/Bar';
import { HALF_SECOND } from '../../consts';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#424242',
    maxWidth: '620px',
    borderRadius: '5px',
    '& > *': {
      borderBottom: '1px solid white',
    },
    '& > :last-child': {
      border: 'none',
    },
  },
  formGroup: {
    flexDirection: 'row',
    '& > *': {
      margin: '0 10px 5px',
    },
  },
  fieldsetWrapper: {
    width: 'calc(100% - 28px)',
    margin: '0 14px',
  },
  iconBtn: {
    padding: '0',
  },
});

interface Props {
  defaultValues?: {
    pointsId: [string, string];
    name: string;
    section: SectionTypes;
    sectionProps: {
      A?: string,
      I?: string,
      height?: string,
      base?: string,
      diameter?: string,
    };
    E: string;
  };
  type: 'beam' | 'pillar';
  setShowForm: (value: boolean) => void;
}

const BarForm = (props: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const points = useAppSelector((state) => state.project.inputs.points);
  const optPoints = points.map(({ id, cordX, cordY }) => {
    const pointName = `(${cordX} ; ${cordY})`;
    return {
      value: id,
      label: pointName,
    };
  });
  const optSections = [{ value: 'rect', label: 'Retangular' },
    { value: 'circ', label: 'Circular' }, { value: 'other', label: 'Outra' }];

  const namePrefix = props.type === 'beam' ? 'Viga' : 'Pilar';
  const nameLabel = props.type === 'beam' ? 'Nome da viga' : 'Nome do pilar';

  const [startId, setStartId] = useState('');
  const [endId, setEndId] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('rect');
  const [A, setA] = useState(0);
  const [E, setE] = useState(0);
  const [I, setI] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [base, setBase] = useState(0);
  const [height, setHeight] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);

  const closeForm = () => {
    props.setShowForm(false);
    setShouldReset(true);
    setTimeout(() => setShouldReset(false), HALF_SECOND);
  };

  const handleClick = () => {
    const edgePoints = [startId, endId].map(
      (point) => points.find(({ id }) => id === point),
    ) as AdjPoints;

    const alignedPoints = points
      .filter((point) => (belongsToLineEq(edgePoints, point)))
      .sort((a, b) => calcL([edgePoints[0], a]) - calcL([edgePoints[0], b]));

    alignedPoints.forEach((point, index, arr) => {
      const stretch = arr.length === 2 ? '' : ` - Trecho ${index + 1}`;
      if (arr[index + 1]) {
        const barInput = {
          points: [point, arr[index + 1]] as AdjPoints,
          type: props.type,
          name: `${name}${stretch}`,
          section: section as SectionTypes,
          sectionProps: { A, I, height, base, diameter },
          E,
        };

        const bar = new Bar(barInput);

        if (props.defaultValues) {
          dispatch(editBar(bar));
        } else {
          dispatch(addBar(bar));
        }
      }
    });

    closeForm();
  };

  const inputBySectionType = (sectionType: SectionTypes) => {
    switch (sectionType) {
      case 'circ':
        return (
          <InputNumber
            name="section-diameter"
            unit="cm"
            label="Diâmetro"
            stateUpdater={ setDiameter }
            defaultValue={ props.defaultValues?.sectionProps.diameter }
            shouldReset={ shouldReset }
          />
        );
      case 'rect':
        return (
          <>
            <InputNumber
              name="section-base"
              unit="cm"
              label="Base do retângulo"
              stateUpdater={ setBase }
              defaultValue={ props.defaultValues?.sectionProps.base }
              shouldReset={ shouldReset }
            />
            <InputNumber
              name="section-height"
              unit="cm"
              label="Altura do retângulo"
              stateUpdater={ setHeight }
              defaultValue={ props.defaultValues?.sectionProps.height }
              shouldReset={ shouldReset }
            />
          </>
        );
      default:
        return (
          <>
            <InputNumber
              name="section-area"
              unit="m²"
              label="Área"
              stateUpdater={ setA }
              defaultValue={ props.defaultValues?.sectionProps.A }
              shouldReset={ shouldReset }
            />
            <InputNumber
              name="section-moment-inertia"
              unit={ (
                <span>
                  m
                  <sup>4</sup>
                </span>
              ) }
              label="Momento de inércia"
              stateUpdater={ setI }
              defaultValue={ props.defaultValues?.sectionProps.I }
              shouldReset={ shouldReset }
            />
          </>
        );
    }
  };

  return (
    <Grid
      container
      className={ classes.root }
      component="form"
      direction="column"
      alignItems="center"
      spacing={ 3 }
    >
      <Grid item container justify="space-between" alignItems="center">
        <InputText
          name="bar-name"
          label={ nameLabel }
          stateUpdater={ setName }
          shouldReset={ shouldReset }
          defaultValue={ props.defaultValues?.name }
          prefix={ namePrefix }
        />
        <IconButton onClick={ closeForm }>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item className={ classes.fieldsetWrapper }>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Pontos</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputDataList
              name="first-point"
              label="Ponto inicial"
              stateUpdater={ setStartId }
              defaultValue={ props.defaultValues?.pointsId[0] }
              shouldReset={ shouldReset }
              options={ optPoints }
            />
            <InputDataList
              name="last-point"
              label="Ponto final"
              stateUpdater={ setEndId }
              defaultValue={ props.defaultValues?.pointsId[1] }
              shouldReset={ shouldReset }
              options={ optPoints }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item className={ classes.fieldsetWrapper }>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Geometria e Material</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputSelect
              name="cross-section"
              label="Seção tranversal"
              stateUpdater={ setSection }
              defaultValue={ props.defaultValues?.section }
              shouldReset={ shouldReset }
              options={ optSections }
            />
            { inputBySectionType(section as SectionTypes) }
            <InputNumber
              name="material-elasticity-module"
              unit="GPa"
              label="Módulo de Elasticidade"
              stateUpdater={ setE }
              defaultValue={ props.defaultValues?.E }
              shouldReset={ shouldReset }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={ handleClick }
          fullWidth
        >
          {props.defaultValues ? `Atualizar ${namePrefix}` : `Adicionar ${namePrefix}`}
        </Button>
      </Grid>
    </Grid>
  );
};

export default BarForm;
