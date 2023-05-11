import React from 'react'

export default function FriendsTable({ friends, onDel }) {
  
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Timetable</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            friends.map( friend => <FriendItem key={friend.id} friend={friend} onDel={onDel}/>)
          }
        </tbody>
      </table>
    )
  }

const FriendItem = ({friend, onDel}) => {
  const {id, name} = friend
  
  return(
    <tr>
      <td>{ name }</td>
      <td>
        <button type="button" className="btn btn-inverse-info btn-sm"><i className="mdi mdi-calendar"></i></button>
      </td>
      <td>
        <button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => onDel(id)}><i className='mdi mdi-close-circle-outline' /></button>
      </td>
    </tr>
  )
}