// @flow
import type { AnySaga } from '../Common/Sagas';
import loginSagas from '../Modules/Login/Module/sagas';
import registrationSagas from '../Modules/Registration/Modules/sagas';


// need add api Type
export default api => function* rootSaga(): AnySaga {
  yield* loginSagas(api).watchers();
  yield* registrationSagas(api).watchers();
};
