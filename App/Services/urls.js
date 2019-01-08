// @flow

export default Object.freeze({
  BASE_URL: 'http://10.0.2.2:3000/',
  login: 'auth/login',
  registration: 'auth/reg',
  getUniversityList: 'universities',
  editUniversity: id => `universities/${id}`,
  createUniversity: 'universities',
  deleteUniversity: id => `universities/${id}`,
  getSubjectList: id => `universities/subjects/${id}`,
  editSubject: id => `subjects/${id}`,
  createSubject: id => `universities/subject/${id}`,
  getLecturerList: id => `universities/lecturers/${id}`,
  createLecturer: id => `universities/lecturer/${id}`,
  editLecturer: id => `lecturer/${id}`,
  getFeedbackList: id => `lecturer/feedbacks/${id}`,
  createFeedback: id => `lecturer/feedback/${id}`,
});
