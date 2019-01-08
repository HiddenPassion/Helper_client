// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { editSubject } from '../../Module/duck';
import EditSubjectScreen from './EditSubjectScreen';

const mapDispatchToProps = {
  dispatchEditSubject: editSubject,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(EditSubjectScreen);
