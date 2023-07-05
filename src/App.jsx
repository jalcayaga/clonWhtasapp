import Messages from "./components/Messages";
import "./App.css";
import Login from "./components/login";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {

  const [session, setSession] = useState(null)

  const getSession = async () => {
    const {data} = await supabase.auth.getSession();
    setSession(data.session);
  };

  useEffect(() => {
    getSession();
  }, []);


  return (
    <div className="App">
      <h1>Whatsapp Clone</h1>
      {session ? <Messages /> : <Login /> }
      
    </div>
  );
}

export default App;
