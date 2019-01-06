// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  fetchUniversityList,
  selectSelectedUniversity,
  selectHasSelectedUniversity,
  selectUniversityItems,
} from './Module/duck';
import University from './University';

const mapStateToProps = state => ({
  universities: selectUniversityItems(state),
  hasSelectedUniversity: selectHasSelectedUniversity(state),
  selectedUniversity: selectSelectedUniversity(state),
});

const mapDispatchToProps = {
  dispatchFetchUniversityList: fetchUniversityList,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhancer(University);
