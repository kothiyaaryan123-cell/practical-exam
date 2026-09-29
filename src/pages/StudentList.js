import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents } from "../actions/studentActions";

function StudentList() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = useMemo(() => {
    return ["All", ...new Set(students.map((student) => student.class).filter(Boolean))];
  }, [students]);

  const filteredStudents = useMemo(() => {
    const result = students.filter((student) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        student.name?.toLowerCase().includes(searchText) ||
        student.rollNumber?.toLowerCase().includes(searchText);

      const matchesClass =
        classFilter === "All" || student.class === classFilter;

      return matchesSearch && matchesClass;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name-asc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (sortBy === "name-desc") {
        return (b.name || "").localeCompare(a.name || "");
      }
      if (sortBy === "roll-asc") {
        return (a.rollNumber || "").localeCompare(b.rollNumber || "", undefined, {
          numeric: true
        });
      }
      if (sortBy === "roll-desc") {
        return (b.rollNumber || "").localeCompare(a.rollNumber || "", undefined, {
          numeric: true
        });
      }
      return 0;
    });
  }, [students, search, classFilter, sortBy]);

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="page-title mb-1">Student List</h2>
          <p className="text-muted mb-0">
            Manage, search, filter and sort student records.
          </p>
        </div>
        <Link className="btn btn-primary" to="/students/add">
          + Add Student
        </Link>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <label className="form-label">Search by Name / Roll Number</label>
          <input
            className="form-control"
            placeholder="Search student..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Filter by Class</label>
          <select
            className="form-select"
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
          >
            {classes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Sort</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="roll-asc">Roll Number: Low to High</option>
            <option value="roll-desc">Roll Number: High to Low</option>
          </select>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading students...</div>}

      {error && (
        <div className="alert alert-danger">
          {error}. Make sure JSON Server is running with <code>npm run server</code>.
        </div>
      )}

      {!loading && !error && filteredStudents.length === 0 && (
        <div className="alert alert-warning">No students found.</div>
      )}

      <div className="row g-4">
        {filteredStudents.map((student) => (
          <div className="col-12 col-md-6 col-xl-4" key={student.id}>
            <div className="card student-card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex gap-3 align-items-center mb-3">
                  <img
                    src={
                      student.image ||
                      "https://via.placeholder.com/100?text=Student"
                    }
                    alt={student.name}
                    className="student-photo border"
                  />
                  <div>
                    <h5 className="mb-1">{student.name}</h5>
                    <span className="badge text-bg-primary">{student.class}</span>
                  </div>
                </div>

                <div className="small text-muted">
                  <div><strong>Roll:</strong> {student.rollNumber}</div>
                  <div><strong>Phone:</strong> {student.phone}</div>
                  <div><strong>Email:</strong> {student.email}</div>
                  <div><strong>Age:</strong> {student.age}</div>
                  <div><strong>Grade:</strong> {student.grade}</div>
                </div>
              </div>

              <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
                <Link
                  className="btn btn-outline-primary btn-sm w-100"
                  to={`/students/${student.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
