import { createContext, useState } from 'react';
import { IUser } from '../types/user.types';

interface IContext {
  user: IUser | null;
  isGlobalLoading: boolean;

  setUser: (payload: IUser | null) => void;
  setIsGlobalLoading: (payload: boolean) => void;
}

const context = createContext({
  user: null,
} as IContext);

interface Props {
  children: JSX.Element;
}

const ContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  const handleSetUser = (payload: IUser | null) => {
    setUser(payload);
  };

  const handleSetGlobalLoading = (payload: boolean) => {
    setIsGlobalLoading(payload);
  };

  return (
    <context.Provider
      value={{
        user,
        isGlobalLoading,
        setUser: handleSetUser,
        setIsGlobalLoading: handleSetGlobalLoading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context };
export default ContextProvider;
