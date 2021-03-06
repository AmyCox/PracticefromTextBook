import React, { Fragment, useState, useEffect } from "react";
import { Promise } from "bluebird";

Promise.config({ cancellation: true });

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Amy" });
    }, 2000);
  });
}

export default function User() {
  const [id, setId] = useState("...loading");
  const [name, setName] = useState("...loading");

  useEffect(() => {
    const promise = fetchUser().then((user) => {
      setId(user.id);
      setName(user.name);
    });

    return () => {
      promise.cancel();
    };
  });
  return (
    <Fragment>
      <p>Id : {id}</p>
      <p>Name : {name}</p>
    </Fragment>
  );
}
