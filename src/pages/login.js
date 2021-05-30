import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "" || password.length <= 5;
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError("Votre mot de passe est incorrect. Veuillez le vérifier.");
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen mt-8">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with profil" />
      </div>
      <div className="flex flex-col w-2/4">
        <div className="flex flex-col  border border-gray-300 bg-white-500 px-10">
          <h1 className="flex justify-center w-full mt-5 mx-auto mb-2.5">
            <img src="/images/logo.png" alt="logo " />
          </h1>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Num, téléphone, nom d'utilisateur ou e-mail"
              type="text"
              placeholder="Num, téléphone, nom d'utilisateur ou e-mail"
              value={email}
              className="text-xs p-2 text-black-300 w-full mr-3 py-5 h-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <input
              aria-label="Mot de passe"
              type="password"
              value={password}
              placeholder="Mot de passe"
              className="text-xs p-2 text-black-300 w-full mr-3 py-5 h-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500  rounded text-white text-xs w-full h-8 font-blod ${
                isInvalid && `opacity-50`
              }`}
            >
              Connexion
            </button>
            <div className=" my-5 ">
              <div className="flex flex-row w-full items-center justify-items-center">
                <hr className="border border-solid border-gray-300 w-2/5" />
                <p className=" w-1/5 text-gray-400 text-xs font-bold text-center">
                  OU
                </p>
                <hr className="border border-solid border-gray-300 w-2/5" />
              </div>
            </div>
            <div className="flex justify-center  text-center my-3">
              <img
                src="/images/logo-facebook.png"
                alt="logo facebook"
                className="w-4 h-4"
              />
              <Link
                to={ROUTES.LOGIN}
                className="text-sm ml-2 font-bold text-blue-800 "
              >
                Se connecter avec Facebook
              </Link>
            </div>
            <div className=" text-center m-3">
              <Link to={ROUTES.LOGIN} className="text-xs">
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </div>

        <div className="flex flex-rows justify-center border border-gray-300 bg-white-500 px-10 mt-2 p-5">
          <p className="text-xs ml-1">
            Vous n’avez pas de compte ?{" "}
            <Link
              to={ROUTES.SIGN_UP}
              className="text-xs font-bold text-blue-500"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
