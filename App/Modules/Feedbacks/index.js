// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  fetchFeedbackList,
  selectFeedbackItems,
  createFeedback,
  deleteFeedback,
  filterFeedbackList,
} from './Module/duck';
import { selectLoginState } from '../Login/Module/duck';
import Feedback from './Feedback';

const mapStateToProps = state => ({
  feedbacks: selectFeedbackItems(state),
  user: selectLoginState(state),
});

const mapDispatchToProps = {
  dispatchFetchFeedbackList: fetchFeedbackList,
  dispatchFilterFeedbackList: filterFeedbackList,
  dispatchCreateFeedback: createFeedback,
  dispatchDeleteFeedback: deleteFeedback,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhancer(Feedback);
