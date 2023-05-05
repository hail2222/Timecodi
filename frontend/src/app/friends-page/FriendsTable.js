import React, { useState } from 'react'

export default function FriendsTable({ headers, items = [] }) {
    const headerKey = headers.map((header) => header.value);
  
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            {
              headers.map((header) =>
              <th key={header.text}>
                {header.text}
              </th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) =>
              <tr key={index}>
                {
                  headerKey.map((key) =>
                    <td key={key + index}>
                      {item[key]}
                    </td>)
                }
              </tr>)
          }
        </tbody>
      </table>
    )
  }