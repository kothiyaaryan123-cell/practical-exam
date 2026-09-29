import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStudent, fetchStudents, updateStudent } from "../actions/studentActions";

function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.students);

  const student = students.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  useEffect(() => {
    if (student) {
      setForm({
        ...student,
        age: student.age ?? ""
      });
    }
  }, [student]);

  if (!student && !form) {
    return (
      <div className="container">
        <div className="alert alert-info">
          Loading student details...
        </div>
      </div>
    );
  }

  if (!form) return null;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await dispatch(
        updateStudent(id, {
          ...form,
          age: Number(form.age)
        })
      );
      setEditing(false);
    } catch (error) {
      window.alert("Update failed. Check JSON Server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${form.name}?`
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteStudent(id));
      navigate("/students");
    } catch (error) {
      window.alert("Delete failed. Check JSON Server.");
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <div>
          <h2 className="page-title mb-1">Student Details</h2>
          <p className="text-muted mb-0">View and update the selected student.</p>
        </div>
        <Link className="btn btn-outline-secondary" to="/students">
          ← Back to List
        </Link>
      </div>

      {!editing ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="row align-items-center g-4">
              <div className="col-md-3 text-center">
                <img
                  src={
                    form.image ||
                    "https://via.placeholder.com/160?text=Student"
                  }
                  alt={form.name}
                  className="img-fluid rounded-circle border"
                  style={{ width: 160, height: 160, objectFit: "cover" }}
                />
              </div>

              <div className="col-md-9">
                <h3>{form.name}</h3>
                <span className="badge text-bg-primary mb-3">{form.class}</span>

                <div className="row g-3">
                  <div className="col-sm-6"><strong>Roll Number:</strong> {form.rollNumber}</div>
                  <div className="col-sm-6"><strong>Phone:</strong> {form.phone}</div>
                  <div className="col-sm-6"><strong>Email:</strong> {form.email}</div>
                  <div className="col-sm-6"><strong>Age:</strong> {form.age}</div>
                  <div className="col-sm-6"><strong>Grade:</strong> {form.grade}</div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button className="btn btn-warning" onClick={() => setEditing(true)}>
                    Edit Student
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h4 className="mb-4">Update Student</h4>

            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Age</label>
                  <input type="number" name="age" className="form-control" value={form.age} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Class</label>
                  <input name="class" className="form-control" value={form.class} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Roll Number</label>
                  <input name="rollNumber" className="form-control" value={form.rollNumber} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Grade</label>
                  <select name="grade" className="form-select" value={form.grade} onChange={handleChange} required>
                    <option value="">Select Grade</option>
                    <option>A+</option>
                    <option>A</option>
                    <option>B+</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Image URL</label>
                  <input name="image" className="form-control" value={form.image || ""} onChange={handleChange} />
                </div>

                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-success" type="submit" disabled={saving}>
                    {saving ? "Updating..." : "Update Student"}
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
