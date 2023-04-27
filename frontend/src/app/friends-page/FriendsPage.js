import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

function FriendsPage() {
  const [addShow, setShow] = useState(false);
  const addClose = () => setShow(!addShow);

  const [addFriend, setFriend] = useState(false);
  const friendClose = () => setFriend(!addFriend);

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-star"></i>
            </span> Friends </h3>
            <button type="button" className="btn btn-inverse-primary" onClick={addClose}>
              <span className="mr-2"><i className="mdi mdi-account-plus"></i></span>Add
            </button>
            <Modal show={addShow} onHide={addClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add or Invite your friends.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <button type="button" className="btn btn-primary btn-fw btn-block" onClick={friendClose}>
                  Add by ID
                </button>
                <button type="button" className="btn btn-primary btn-fw btn-block" onClick={addClose}>
                  Invite by KakaoTalk
                </button>
              </Modal.Body>
            </Modal>

            <Modal show={addFriend} onHide={friendClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Enter your friend's ID</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="ID" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button type="button" className="btn btn-primary btn-sm" onClick={friendClose}>
                  OK
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={friendClose}>
                  Cancel
                </button>
              </Modal.Footer>
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
