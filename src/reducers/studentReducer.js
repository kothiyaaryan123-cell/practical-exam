const initialState = {
  students: [],
  loading: false,
  error: null
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_STUDENTS_SUCCESS":
      return { ...state, loading: false, students: action.payload };

    case "FETCH_STUDENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ADD_STUDENT_SUCCESS":
      return { ...state, students: [...state.students, action.payload] };

    case "UPDATE_STUDENT_SUCCESS":
      return {
        ...state,
        students: state.students.map((student) =>
          String(student.id) === String(action.payload.id)
            ? action.payload
            : student
        )
      };

    case "DELETE_STUDENT_SUCCESS":
      return {
        ...state,
        students: state.students.filter(
          (student) => String(student.id) !== String(action.payload)
        )
      };

    default:
      return state;
  }
};

export default studentReducer;
