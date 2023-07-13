import Arrow from "./icons/Arrow";
import Dots from "./icons/Dots";

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState("Juan");
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
    console.log(error);
  };
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session.user.email);
  };
  useEffect(() => {
    getSession();
  }, []);

  const handleDots = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="header">
      <div className="left">
        <p
          className="logout"
          onClick={handleLogout}
        >
          <Arrow />
        </p>
        <img
          src="/avatar/avatar-0.jpg"
          alt="avatar"
        />
        <p className="name">
          @{user.split("@")[0]}
          <span>online</span>
        </p>
      </div>
      <p
        className="dots"
        onClick={handleDots}
      >
        <Dots />
      </p>
      <div
        className={`float-out ${open ? "open" : ""}`}
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Header;
