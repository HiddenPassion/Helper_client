// @flow
import upperCaseTransformer from '../../../Common/utils/upperCaseTransformer';

export default (data) => {
  // eslint-disable-next-line
  const transformer = a =>
    // eslint-disable-next-line
    (a.fullName = `${upperCaseTransformer(a.surname)} ${upperCaseTransformer(
      a.name,
    )} ${upperCaseTransformer(a.patronymic)}`);
  if (Array.isArray(data)) {
    return data.forEach(transformer);
  }
  transformer(data);
  return data;
};
