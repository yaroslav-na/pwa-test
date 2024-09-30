import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import { useAuth } from "../../auth/useAuth";
import classes from "./home.module.scss";
import { io } from "socket.io-client";

type Message = {
  id: string;
  title: string;
  author: string;
};

const socket = io("https://server-test-xi7c.onrender.com", {
  autoConnect: false,
});

export const Home: FC = () => {
  const username = useAuth((state) => state.username);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function updateMessages(event: Message) {
      console.log(event);

      setMessages((prevMessages) => [...prevMessages, event]);
    }
    function loadMessages(event: Message[]) {
      console.log(event, "LOADING");

      setMessages(event);
    }

    socket.connect();

    socket.on("load-messages", loadMessages);
    socket.on("send-message", updateMessages);

    return () => {
      socket.off("send-message", updateMessages);
      socket.off("load-messages", loadMessages);
      socket.disconnect();
    };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const message = (event.currentTarget[0] as HTMLInputElement).value;
    socket.emit("send-message", { title: message, author: username });

    (event.currentTarget[0] as HTMLInputElement).value = "";
  };

  return (
    <div className={classNames(classes.home, "container")}>
      <form onSubmit={handleSubmit} className={classes.home__form}>
        <input type="text" className="input" placeholder="Message" />
        <button className="button">Send</button>
      </form>

      <ul className={classes.home__list}>
        {messages.map((message) => (
          <li
            key={message.id}
            className={classNames(classes.home__item, {
              [classes.home__item_mine]: username === message.author,
            })}
          >
            <span className={classes.home__itemAuthor}>
              {message.author} {username === message.author && "(Me)"}
            </span>
            <span className={classes.home__itemMessage}>{message.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
