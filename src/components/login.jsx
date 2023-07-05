import { supabase } from "../supabaseClient";

const Login = () => {
  const handleLogin = async () => {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    console.log(data)
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload()
  };

  return (
    <section className="login">
      <button onClick={handleLogin}>Iniciar</button>
      <button onClick={handleLogout}>Cerrrar</button>
    </section>
  );
};

export default Login;
