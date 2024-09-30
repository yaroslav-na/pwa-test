import React, { FC, PropsWithChildren, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

type Props = PropsWithChildren<{
  mustBeLogedIn: boolean;
  redirect: To;
}>;

export const AuthProvider: FC<Props> = ({
  mustBeLogedIn,
  redirect,
  children,
}) => {
  const navigate = useNavigate();
  const isLogedIn = useAuth((state) => state.isLogedIn);

  useEffect(() => {
    if (isLogedIn !== mustBeLogedIn) {
      navigate(redirect);
    }
  }, [redirect, navigate, isLogedIn, mustBeLogedIn]);

  return children;
};
