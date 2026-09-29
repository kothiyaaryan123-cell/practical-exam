import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../actions/studentActions";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  age: "",
  class: "",
  rollNumber: "",
  grade: "",
  image: ""
};

function StudentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await dispatch(
        addStudent({
          ...form,
          age: Number(form.age)
        })
      );
      navigate("/students");
    } catch (err) {
      setError("Unable to add student. Please check JSON Server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="page-title mb-1">Add New Student</h2>
              <p className="text-muted mb-4">
                Enter all required student details.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      min="1"
                      className="form-control"
                      value={form.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Class</label>
                    <input
                      name="class"
                      className="form-control"
                      placeholder="e.g. BCA"
                      value={form.class}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Roll Number</label>
                    <input
                      name="rollNumber"
                      className="form-control"
                      value={form.rollNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Grade</label>
                    <select
                      name="grade"
                      className="form-select"
                      value={form.grade}
                      onChange={handleChange}
                      required
                    >
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
                    <input
                      name="image"
                      className="form-control"
                      placeholder="https://..."
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 d-flex gap-2 pt-2">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Add Student"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => navigate("/students")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
