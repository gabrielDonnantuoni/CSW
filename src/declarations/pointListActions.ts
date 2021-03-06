import { ADD_POINT, REMOVE_POINT, EDIT_POINT, CLEAR_INPUTS_POINT,
  UNCLEAR_INPUTS_POINT } from '../consts';

interface InPointInput {
  id: string;
  cordX: number;
  cordY: number;
  f: [number, number, number];
  restrictions: [boolean, boolean, boolean];
}

interface AddPoint {
  type: typeof ADD_POINT;
  payload: InPointInput;
}

interface RemovePoint {
  type: typeof REMOVE_POINT;
  payload: InPointInput;
}

interface EditPoint {
  type: typeof EDIT_POINT;
  payload: InPointInput;
}

interface ClearInputsPoint {
  type: typeof CLEAR_INPUTS_POINT;
}

interface UnclearInputsPoint {
  type: typeof UNCLEAR_INPUTS_POINT;
}

type PointListActions = AddPoint | RemovePoint | EditPoint
| ClearInputsPoint | UnclearInputsPoint;

export default PointListActions;
