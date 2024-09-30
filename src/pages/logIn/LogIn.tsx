import React, { FC } from "react";

import classes from "./logIn.module.scss";
import classNames from "classnames";
import { useAuth } from "../../auth/useAuth";

export const LogIn: FC = () => {
  const logIn = useAuth((state) => state.logIn);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;

    if (!username.trim()) {
      return;
    }

    logIn(username);
  };

  return (
    <div className={classNames(classes.logIn, "container")}>
      <h1 className={classes.logIn__title}>Log in</h1>
      <form onSubmit={handleSubmit} className={classes.logIn__form}>
        <label className={classes.logIn__inputLabel}>
          <span>Username</span>

          <input placeholder="Your username" className="input" type="text" />
        </label>
        <button className="button">Log in</button>
      </form>
    </div>
  );
};
