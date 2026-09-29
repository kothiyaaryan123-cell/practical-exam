import api from "../api";

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENTS_REQUEST" });

  try {
    const response = await api.get("/students");
    dispatch({
      type: "FETCH_STUDENTS_SUCCESS",
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: "FETCH_STUDENTS_FAILURE",
      payload: error.message || "Unable to fetch students"
    });
  }
};

export const addStudent = (student) => async (dispatch) => {
  const response = await api.post("/students", student);

  dispatch({
    type: "ADD_STUDENT_SUCCESS",
    payload: response.data
  });

  return response.data;
};

export const updateStudent = (id, student) => async (dispatch) => {
  const response = await api.put(`/students/${id}`, student);

  dispatch({
    type: "UPDATE_STUDENT_SUCCESS",
    payload: response.data
  });

  return response.data;
};

export const deleteStudent = (id) => async (dispatch) => {
  await api.delete(`/students/${id}`);

  dispatch({
    type: "DELETE_STUDENT_SUCCESS",
    payload: id
  });
};
