import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Trans } from "react-i18next";
import url from "./../apiurl";

export default function FavoriteGroup() {
  const location = useLocation();
  const isPathActive = (path) => {
    return location.pathname === path;
  };

  let [favoriteList, setFavoriteList] = useState([]); // [{"fgid": 8, "uid": "violet", "gid": 11, "gname": "새그룹" }]
  const getFavoriteList = () => {
    axios
      .get(`${url}/favorite`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let newFavoriteList = [];
        newFavoriteList.push(res.data);
        setFavoriteList(newFavoriteList[0]);
      })
      .catch((err) => {
        console.log("getFavoriteList");
        console.log(err);
      });
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <div>
      {favoriteList.map(function (item, index) {
        return (
          <li className="nav-item" key={index}>
            {" "}
            <Link
              className={
                isPathActive(`/groups/groupTestAdmin/${item.gid}`)
                  ? "nav-link active"
                  : "nav-link"
              }
              to={`/groups/groupTestAdmin/${item.gid}`}
            >
              <Trans>{item.gname}</Trans>
            </Link>
          </li>
        );
      })}
    </div>
  );
}
