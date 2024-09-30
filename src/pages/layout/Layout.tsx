import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";

import classes from "./layout.module.scss";
import { useAuth } from "../../auth/useAuth";
import classNames from "classnames";

export const Layout: FC = () => {
  const { isLogedIn, logOut, username } = useAuth();

  return (
    <div className={classes.page}>
      <header className={classes.page__header}>
        <div className={classNames("container", classes.page__headerContainer)}>
          <span className={classes.page__headerInfo}>
            Chat {isLogedIn && `| ${username}`}
          </span>
          {isLogedIn ? (
            <button onClick={logOut} className="button">
              log out
            </button>
          ) : (
            <Link className="button" to={"/log-in"}>
              Log in
            </Link>
          )}
        </div>
      </header>
      <main className={classes.page__main}>
        <Outlet />
      </main>
      <footer className={classes.page__footer}>Footer</footer>
    </div>
  );
};
