// @flow
import type { AnySaga } from '../Common/Sagas';
import loginSagas from '../Modules/Login/Module/sagas';
import registrationSagas from '../Modules/Registration/Modules/sagas';
import universitySaga from '../Modules/University/Module/sagas';
import subjectSaga from '../Modules/Subjects/Module/sagas';
import lecturerSaga from '../Modules/Lecturer/Module/sagas';
import feedbackSaga from '../Modules/Feedbacks/Module/sagas';

// need add api Type
export default api => function* rootSaga(): AnySaga {
  yield* loginSagas(api).watchers();
  yield* registrationSagas(api).watchers();
  yield* universitySaga(api).watchers();
  yield* subjectSaga(api).watchers();
  yield* lecturerSaga(api).watchers();
  yield* feedbackSaga(api).watchers();
};
