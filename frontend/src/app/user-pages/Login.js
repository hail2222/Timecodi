import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); 

  // console.log(email + " " + password);

  const handleLogin = () => {
    // console.log("login try");
    const data = {
      "username": email,
      "password": password
    };
    axios.post('https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/signin', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => {
      // console.log(res.data);
      const token = res.data.token_type + " " + res.data.access_token;
      localStorage.setItem("token", token);

      const username = res.data.username;
      localStorage.setItem("username", username);
      // alert("login success");
      history.push('/mypage/mygroups');
      // 로그인 성공 메시지 출력
    })
    .catch((err) => {
      alert("login failed");
      // alert(err);
      // 로그인 실패 메시지 출력
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
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" placeholder="ID" size="lg" className="h-auto" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" placeholder="Password" size="lg" className="h-auto" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mt-3">
                  <button type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Login
