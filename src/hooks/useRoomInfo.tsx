import { RoomType } from '@/common/types';
import { getServerURI } from '@/utils/getServerURI';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useRoomInfo = () => {
    const router = useRouter();

    const [room, setRoom] = useState<RoomType>();

    useEffect(() => {
        const fetchRoomInfo = async () => {
            try {
                const roomName = router.query.roomName as string;
                const response = await fetch(`${getServerURI()}/room/${roomName}`);
                const data = await response.json();
                setRoom(data);
            } catch (error) {
                throw error;
            }
        };

        if (router.query.roomName) {
            fetchRoomInfo();
        }

    }, [router.query.roomName]);


    return room!;
};

export default useRoomInfo;