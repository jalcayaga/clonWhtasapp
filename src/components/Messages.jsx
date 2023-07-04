import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const callSupabase = async () => {
    const {data} = await supabase.from("messages").select("*");
    setMessages(data);
   /*  console.log(data) */
  };
 
  useEffect(() => {
    callSupabase();
  }, []);

  return (
    <section className="messages">
      Messages 
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
    </section>
  );
};

export default Messages;
