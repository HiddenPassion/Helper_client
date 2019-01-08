// @flow
import { isString } from 'lodash';

const formatter = (str: string) => {
  if (isString(str)) {
    const lower = str.toLowerCase();
    return `${lower[0].toUpperCase()}${lower.slice(1)}`;
  }
  return str;
};

export default formatter;
