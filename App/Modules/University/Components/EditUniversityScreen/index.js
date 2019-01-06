// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { editUniversity } from '../../Module/duck';
import EditUniversityScreen from './EditUniversityScreen';

const mapDispatchToProps = {
  dispatchEditUniversity: editUniversity,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(EditUniversityScreen);
