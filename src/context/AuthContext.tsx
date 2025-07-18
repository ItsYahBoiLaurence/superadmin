import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { AuthContextType, LoginPayload } from "../types/admin-users";
import { useLocation, useNavigate } from "react-router-dom";
// ✅ Use @tanstack/react-query instead of react-query
import api from "../api";
import type { LoginType } from "../types/authentication";
import type { ValidateTokenQueryType } from "../types/payload";
import { queryClient } from "../queryClient";
import { useQuery } from "react-query";

export const AuthenticationContext = createContext<AuthContextType>({
    token: null,
    login: async () => { throw new Error('Login not implemented') },
    logout: async () => { throw new Error('Logout not implemented') },
});

const EXCLUDED_PATHS = ['/sign-in'];

export default function Authentication({ children }: PropsWithChildren<{}>) {
    const navigate = useNavigate();
    const location = useLocation();

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState<string | null>(initialToken);

    const { data, isError, isLoading } = useQuery<ValidateTokenQueryType>({
        queryKey: ['token-validity', token],
        queryFn: async () => {
            if (!token) return null;
            const { data } = await api.post('/mayan-admin/validate-token', { access_token: token });
            return data;
        },
        enabled: !!token,
    });

    const login = async (payload: LoginPayload) => {
        try {
            const { data } = await api.post<LoginType>('/mayan-admin/sa-auth', payload);
            localStorage.setItem('token', data.access_token);
            setToken(data.access_token);
            navigate('/')
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

    const logout = () => {
        setToken(null);
        queryClient.clear();
        localStorage.clear();
        navigate('/sign-in');
    };

    useEffect(() => {
        if ((!token || data?.success === false) && !EXCLUDED_PATHS.includes(location.pathname)) {
            console.log('Token invalid or expired. Redirecting to /sign-in');
            queryClient.clear();
            localStorage.clear();
            navigate('/sign-in');
        }
    }, [location.pathname, token, data, navigate]);

    if (isLoading) return <>Loading...</>;
    if (isError) return <>Error validating token...</>;

    return (
        <AuthenticationContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
}
