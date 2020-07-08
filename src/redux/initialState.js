import { defaultStyles, defaultTitle } from '@/constatnts';
import { clone } from '@core/utils';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({ ...state, currentText: '', currentStyles: defaultStyles });

export const normalizeInitialState = (state) => (state ? normalize(state) : clone(defaultState));
