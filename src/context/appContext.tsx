import { RoomType } from "@/common/types";
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type AppContextType = {
    playerName: string;
    setPlayerName: Dispatch<SetStateAction<string>>;
    rooms: RoomType,
    setRooms: Dispatch<SetStateAction<RoomType>>;
};

const AppContext = createContext<AppContextType>({
    playerName: "",
    setPlayerName: () => { },
    rooms: { attenders: [], roomName: '', roomStatus: 'start' },
    setRooms: () => { }
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [playerName, setPlayerName] = useState<string>("");
    const [rooms, setRooms] = useState<RoomType>({ attenders: [], roomName: '', roomStatus: 'start' });

    return (
        <AppContext.Provider value={{ playerName, setPlayerName, rooms, setRooms }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const appContext = useContext(AppContext);

    return appContext;
};