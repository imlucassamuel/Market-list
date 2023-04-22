import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/axios';

type User = {
  nome: string;
  sobrenome: string;
  email: string;
  token: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  submitError: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') != null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const authContextValue = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      submitError,
      login: async (email: string, password: string) => {
        try {
          const { data } = await api.get(`user?search=${email}`);

          if (data != null && data[0].senha === password) {
            setToken(data[0].token);
            setUser(data[0]);
            setSubmitError('');
            setIsAuthenticated(true);
            localStorage.setItem('token', data[0].token);

            navigate('/dashboard', { state: data[0] });
          } else {
            setSubmitError('Usuário ou senha inválidos');
          }
        } catch (error) {
          console.error(error);
          setUser(null);
          setSubmitError('Usuário ou senha inválidos');
        }
      },
      logout: () => {
        setToken('');
        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem('token');
      },
    }),
    [token, user, submitError, isAuthenticated, navigate]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
