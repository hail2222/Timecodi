import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import url from "./../apiurl";

export function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    const data = {
      id: email,
      pw: password,
      name: name,
    };
    axios
      .post(url + "/signup", data)
      .then((res) => {
        history.push("/user-pages/login");
        alert("signup success");
        // 회원가입 성공 메시지 출력
      })
      .catch((err) => {
        alert("signup failed");
        // 회원가입 실패 메시지 출력
      });
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <h3 className="text-primary my-0">
                  <i className="mdi mdi-timetable mr-1" />
                  TimeCodi
                </h3>
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputUsername1"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    placeholder="ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleSignUp}
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/user-pages/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
