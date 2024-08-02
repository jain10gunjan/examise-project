"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  auth,
  signInWithPopup,
  googleProvider,
  signOut,
} from "../../Firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";

interface AuthContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    toast.success("Signed In Successfully");
  };

  const signOutUser = async () => {
    await signOut(auth);
    toast.success("Signed Out Successfully");
  };

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut: signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
