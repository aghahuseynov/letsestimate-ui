import { getServerURI } from "@/utils/getServerURI";
import { ReactNode, createContext, useContext } from "react";
import io, { Socket, Manager } from "socket.io-client";


const manager = new Manager(`${getServerURI()}/`, {
    secure: true,
})

const socket: Socket = manager.socket('/', {})

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = (): Socket => {
    const socket = useContext(SocketContext);
    if (socket === null) {
        throw new Error("Socket bağlantısı sağlanamadı.");
    }

    return socket;
};