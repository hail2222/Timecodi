import React, { useState } from 'react'
import FriendsPage from './FriendsPage'

export default function ActionButtons({id}) {
    // const onRemove = id => {
    //     FriendsPage.setItems(FriendsPage.items.filter(item => item.id !== id));
    // }

    return (
        <div>
            <button type="button" className="btn btn-inverse-info btn-sm">Timetable</button>
            <button type="button" className="btn btn-inverse-danger btn-sm">Delete</button>
        </div>
    )
}