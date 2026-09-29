import React from "react";

function Profile() {
  const email = localStorage.getItem("userEmail") || "admin@gmail.com";

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="page-title">User Profile</h2>
              <hr />
              <p className="mb-2">
                <strong>Role:</strong> Administrator
              </p>
              <p className="mb-0">
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
