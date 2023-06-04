import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function FriendsTable({ friends, onDel }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Timetable</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} onDel={onDel} />
        ))}
      </tbody>
    </table>
  );
}

const FriendItem = ({ friend, onDel }) => {
  const { id, name, userId } = friend;

  const [deleteFriend, setDelete] = useState(false);
  const deleteClose = () => setDelete(!deleteFriend);

  return (
    <tr>
      <td>{name}</td>
      <td>{userId}</td>
      <td>
        <button type="button" className="btn btn-inverse-info btn-sm">
          <i className="mdi mdi-calendar"></i>
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-inverse-danger btn-sm"
          onClick={deleteClose}
        >
          <i className="mdi mdi-close-circle-outline" />
        </button>
      </td>
      
      <Modal show={deleteFriend} onHide={deleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">Are you sure?</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              onDel(id);
              deleteClose();
            }}
          >
            YES
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={deleteClose}
          >
            NO
          </button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};
