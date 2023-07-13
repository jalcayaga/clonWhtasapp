import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import Message from "./Message";
import Header from "./Header";
import SendMessage from "./sendMessage";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const callSupabase = async () => {
    const { data } = await supabase.from("messages").select("*");
    setMessages(data);
    /*  console.log(data) */
  };

  useEffect(() => {
    callSupabase();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", tabla: "messages" },
        (payload) => {
          const newMessage = payload.new;
          setMessages((messages) => [...messages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="messages">
      <Header />
      <div className="content">
        {messages &&
          messages.map((item, index) => (
            <Message
              key={index}
              message={item.content}
              date={item.created_at}
              email={item.email}
            />
          ))}
      </div>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </section>
  );
};

export default Messages;
