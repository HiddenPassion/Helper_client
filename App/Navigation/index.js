// @flow
import { Navigation } from 'react-native-navigation';

import Login from '../Modules/Login';
import Registration from '../Modules/Registration';
import Feedbacks from '../Modules/Feedbacks';
import University from '../Modules/University';
import CreateUniversity from '../Modules/University/Components/CreateUniversityScreen';
import EditUniversity from '../Modules/University/Components/EditUniversityScreen';
import Subjects from '../Modules/Subjects';
import CreateSubject from '../Modules/Subjects/Components/CreateSubjectScreen';
import EditSubject from '../Modules/Subjects/Components/EditSubjectScreen';
import Lecturer from '../Modules/Lecturer';
import CreateLecturer from '../Modules/Lecturer/Components/CreateLecturerScreen';
import EditLecturer from '../Modules/Lecturer/Components/EditLecturerScreen';

export default function registerScreen(store: Object, Provider: Object) {
  Navigation.registerComponent('helper.Login', () => Login, store, Provider);
  Navigation.registerComponent('helper.Registration', () => Registration, store, Provider);
  Navigation.registerComponent('helper.Feedbacks', () => Feedbacks, store, Provider);
  Navigation.registerComponent('helper.University', () => University, store, Provider);
  Navigation.registerComponent('helper.EditUniversity', () => EditUniversity, store, Provider);
  Navigation.registerComponent('helper.CreateUniversity', () => CreateUniversity, store, Provider);
  Navigation.registerComponent('helper.Subjects', () => Subjects, store, Provider);
  Navigation.registerComponent('helper.EditSubject', () => EditSubject, store, Provider);
  Navigation.registerComponent('helper.CreateSubject', () => CreateSubject, store, Provider);
  Navigation.registerComponent('helper.Lecturer', () => Lecturer, store, Provider);
  Navigation.registerComponent('helper.EditLecturer', () => EditLecturer, store, Provider);
  Navigation.registerComponent('helper.CreateLecturer', () => CreateLecturer, store, Provider);
}
