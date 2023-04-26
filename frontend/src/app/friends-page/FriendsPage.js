import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

function FriendsPage() {
  const [show, setShow] = useState(false);
  const addClose = () => setShow(false);
  const addShow = () => setShow(true);

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-star"></i>
            </span> Friends </h3>
            <button type="button" className="btn btn-inverse-primary" onClick={addShow}>
              <span className="mr-2"><i className="mdi mdi-account-plus"></i></span>Add
            </button>
            <Modal show={show} onHide={addClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add or Invite your friends.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <button type="button" className="btn btn-primary btn-fw btn-block" onClick={addClose}>
                  Add by ID
                </button>
                <button type="button" className="btn btn-primary btn-fw btn-block" onClick={addClose}>
                  Invite by KakaoTalk
                </button>
              </Modal.Body>
            </Modal>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jacob</td>
                      </tr>
                      <tr>
                        <td>Messsy</td>
                      </tr>
                      <tr>
                        <td>John</td>
                      </tr>
                      <tr>
                        <td>Peter</td>
                      </tr>
                      <tr>
                        <td>Dave</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

export default FriendsPage;
