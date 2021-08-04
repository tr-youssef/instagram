import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExiste } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid =
    password === "" ||
    email === "" ||
    password.length <= 5 ||
    nom === "" ||
    nomUtilisateur === "";
  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExiste(nomUtilisateur);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await createdUserResult.user.updateProfile({
          displayName: nomUtilisateur.toLowerCase(),
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: nomUtilisateur.toLowerCase(),
          fullName: nom,
          emailAdresse: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
          avatar: "noavatar",
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError(
        "Ce nom d’utilisateur n’est pas disponible. Veuillez en choisir un autre."
      );
    }
  };

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md justify-center items-center h-screen mt-8">
      <div className="flex flex-col w-2/4">
        <div className="flex flex-col  border border-gray-300 bg-white-500 px-10">
          <h1 className="flex justify-center w-full mt-5 mx-auto mb-2.5">
            <img src="/images/logo.png" alt="logo " />
          </h1>
          <h2 className="text-center text-gray-500 font-bold">
            Inscrivez-vous pour voir les photos et vidéos de vos amis
          </h2>
          <button
            className={`bg-facebook flex  rounded text-white text-sm justify-center items-center w-full h-8 font-blod mt-3`}
          >
            <img
              src="/images/logo-facebook.png"
              alt="logo facebook"
              className="w-4 h-4 mr-2"
            />
            Se connecter avec Facebook
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
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Numéro de mobile ou e-mail"
              type="text"
              placeholder="Numéro de mobile ou e-mail"
              value={email}
              className="text-xs p-2 text-black-300 w-full mr-3 py-5 h-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <input
              aria-label="Nom complet"
              type="text"
              placeholder="Nom complet"
              value={nom}
              className="text-xs p-2 text-black-300 w-full mr-3 py-5 h-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                setNom(e.target.value);
                setError("");
              }}
            />
            <input
              aria-label="Nom d'utilisateur"
              type="text"
              placeholder="Nom d'utilisateur"
              value={nomUtilisateur}
              className="text-xs p-2 text-black-300 w-full mr-3 py-5 h-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                setNomUtilisateur(e.target.value);
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
              Inscription
            </button>
            <div className="flex justify-center  text-center my-3">
              <p className="text-xs text-gray-500">
                En vous inscrivant, vous acceptez nos Conditions générales,
                notre Politique d’utilisation des données et notre Politique
                d’utilisation des cookies.
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-rows justify-center border border-gray-300 bg-white-500 px-10 mt-2 p-5">
          <p className="text-xs ml-1">
            Vous avez un compte ?{" "}
            <Link to={ROUTES.LOGIN} className="text-xs font-bold text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
