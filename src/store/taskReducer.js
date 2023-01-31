import * as actionTypes from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.taskUpdated: {
      const newAr = [...state];
      const arElem = newAr.findIndex(el => el.id === action.payload.id);
      newAr[arElem] = {
        ...newAr[arElem],
        ...action.payload
      };
      return newAr;
    }
    case actionTypes.taskDeleted: {
      const newAr = [...state];
      return newAr.filter(el => el.id !== action.payload.id);
    }
    default:
      return state;
  }
};