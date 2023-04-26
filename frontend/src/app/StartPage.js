import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class StartPage extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="text-center">
                    <h1>Hello!</h1>
                    <h2>Welcome to TimeCodi.</h2>
                  </div>
                  <div className="brand-logo">
                  </div>
                  <div className="text-center">
                    <Link className="btn btn-rounded btn-outline-primary font-weight-medium btn-fw mt-3 btn-margin" to="/user-pages/login">Login</Link>
                    <Link className="btn btn-rounded btn-outline-primary font-weight-medium btn-fw mt-3 btn-margin" to="/user-pages/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StartPage
