import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { auth, db } from '../firebase/firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-hot-toast'; 
import { Toaster } from 'react-hot-toast'; 
import { setDoc, collection, getDoc,doc } from "firebase/firestore";

const AuthPopup = ({ authPopup, setAuthPopup }) => {
  const [isSignup, setIsSignup] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate(); 

  // Observer l'état de l'authentification de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user)
    });

    return () => unsubscribe();
  }, []);

  // gestion de l'inscription
  const handleSignup = async () => {
    if (!email || !password || !name) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Création du compte Firebase
      const users = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Inscription réussie !");
      

      // Déterminer si l'utilisateur est un admin ou un utilisateur classique
      const role = email === "benbrahimsalma18@gmail.com" ? "admin" : "user"; 

      const user = {
        name: name,
        role: role, 
        email: users.user.email,
      }

      const userRef = doc(db, 'users', users.user.uid);
      await setDoc(userRef, user);
    ;
      setIsSignup(false); 
    } catch (error) {
      toast.error("Erreur lors de l'inscription : " + error.message); 
    }
  };

  // gestion de la connexion
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Connexion réussie !");

      // Récupérer le rôle de l'utilisateur depuis la base de données Firebase
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name); 
        if (userData.role === "admin") {
          console.log("L'utilisateur est un administrateur.");
          setRole("admin"); 
        } else {
          console.log("L'utilisateur est un utilisateur classique.");
          setRole("user"); 
        }
      }

      localStorage.setItem('user', JSON.stringify(result));
      setAuthPopup(false); 
      navigate('/'); 
    } catch (error) {
      toast.error("Erreur lors de la connexion : " + error.message);
    }
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Déconnexion réussie!");
      setCurrentUser(null); 
      setRole("user"); 
    } catch (error) {
      toast.error("Erreur lors de la déconnexion : " + error.message);
    }
  };

  return (
    <>
      {authPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">
                  {isSignup ? "Créer un compte" : "Se connecter"}
                </h1>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => setAuthPopup(false)}
                />
              </div>

              {/* Form Section */}
              <div className="mt-4">
                {isSignup ? (
                  <>
                    {/* Formulaire d'inscription */}
                    <input
                      type="text"
                      placeholder="Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    <div className="flex justify-center">
                      <button
                        onClick={handleSignup}
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-orange-500 py-1 px-4 rounded-full"
                      >
                        S'inscrire
                      </button>
                    </div>
                    <div className="text-center mt-4 text-sm">
                      <p>
                        Vous avez déjà un compte ?{" "}
                        <span
                          className="text-orange-500 hover:underline font-medium cursor-pointer"
                          onClick={() => setIsSignup(false)} 
                        >
                          Se connecter
                        </span>
                      </p>
                    </div>
                  </>
                ) : currentUser ? (
                  <>
                    {/* Afficher le nom de l'utilisateur connecté et le bouton de déconnexion */}
                    <p>Bienvenue {role === "admin" && <p>ADMIN</p>}{name || currentUser.email}!</p>
                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-orange-500 py-1 px-4 rounded-full mt-4"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    {/* Formulaire de connexion */}
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    <div className="flex justify-center">
                      <button
                        onClick={handleLogin}
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-orange-500 py-1 px-4 rounded-full"
                      >
                        Se connecter
                      </button>
                    </div>
                    <div className="text-center mt-4 text-sm">
                      <p>
                        Vous n'avez pas de compte ?{" "}
                        <span
                          className="text-orange-500 hover:underline font-medium cursor-pointer"
                          onClick={() => setIsSignup(true)} 
                        >
                          S'inscrire
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Utilisation de Toaster pour afficher les toasts */}
       <Toaster />
    </>
  );
};

export default AuthPopup;
