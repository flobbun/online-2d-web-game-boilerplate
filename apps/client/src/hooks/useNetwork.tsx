import { useCallback, useEffect, useState } from "react";
import { Client, Room } from 'colyseus.js';
import { State, Errors, Rooms } from "@common";

const useNetwork = () => {
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        setClient(new Client(import.meta.env.VITE_WS_SERVER_URL));
    }, []);

    const joinGame = useCallback(async (roomId: string) => {
        const room = await client?.joinById(roomId) as Room<State>;

        if (!room) {
            throw new Error(Errors.NO_ROOM_FOUND)
        }
        return room;
    }, [client]);

    const createGame = useCallback(async () => {
        const room = await client?.create(Rooms.GAME) as Room<State>;

        if (!room) {
            throw new Error(Errors.NO_ROOM_FOUND)
        }
        return room;
    }, [client]);

    return {
        client,
        joinGame,
        createGame,
    }
}

export default useNetwork