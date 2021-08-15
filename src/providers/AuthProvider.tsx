import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  PropsWithChildren,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/client";
import { useToast } from "@chakra-ui/react";
import { noop } from "lodash";
import { FitnessKitService, UserInfo } from "../services/fitnesskit.service";

interface AuthContextProps {
  user: UserInfo | null;
  session: Session | null;
  sessionLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  sessionLoading: true,
  signIn: noop as any,
  signUp: noop as any,
  signOut: noop as any,
});

export const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const [session, sessionLoading] = useSession();
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();
  const toast = useToast();
  const fitnessKitService = useMemo(() => new FitnessKitService(), []);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await fitnessKitService.getUserInfo();
      setUser(data);
    } catch (e) {
      signOut();
    }
  }, []);

  useEffect(() => {
    fitnessKitService.setToken(session?.accessToken as string);
    fetchUserInfo();
  }, [session?.user]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const res = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        !toast.isActive('signInError') && toast({
          id: 'signInError',
          title: "Failed signing in",
          description: res.error,
          position: 'top-right',
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      router.replace("/");
    },
    [router]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      await fitnessKitService.signUp(email, password);
      await signIn(email, password);
    },
    [fitnessKitService]
  );

  const signOut = useCallback(async () => {
    await nextAuthSignOut({ redirect: false });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, sessionLoading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
