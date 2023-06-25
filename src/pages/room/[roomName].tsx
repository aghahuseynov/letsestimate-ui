import { Attender, RoomEstimation, RoomType } from "@/common/types";
import { EstimateResult } from "@/components/estimateResult/EstimateResult";
import { Options } from "@/components/options/Options";
import { AttenderList } from "@/components/attenderList/AttenderList";
import { useAppContext } from "@/context/appContext";
import { useSocket } from "@/context/socketContext";
import { getServerURI } from "@/utils/getServerURI";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CopyRoomLink } from "@/components/copyRoomLink/CopyRoomLink";
import { StartEstimation } from "@/components/startEstimation/StartEstimation";
import useRoomInfo from "@/hooks/useRoomInfo";

const Room = () => {
    const room = useRoomInfo()
    const router = useRouter();
    const socket = useSocket();

    const [roomData, setRoomData] = useState(room);
    const [attendersEstimation, setAttendersEstimation] = useState<RoomEstimation>();

    const roomName = router.query.roomName as string

    const { playerName, setPlayerName } = useAppContext();

    useEffect(() => {
        setRoomData(room);
    }, [room])


    useEffect(() => {
        if (room && roomData) {
            const roomInfoRaw = localStorage.getItem(roomName)

            if (!playerName && roomInfoRaw) {
                const roomInfo = JSON.parse(roomInfoRaw) as unknown as Attender;
                setPlayerName(roomInfo.playerName);
                socket.emit('joinRoom', { roomName: router.query.roomName, playerName: playerName, isAdmin: roomInfo.isAdmin });
                setRoomData({ ...roomData, attenders: [...roomData.attenders, { playerName: roomInfo.playerName, isAdmin: roomInfo.isAdmin }] })

            }
            else if (!playerName && !roomInfoRaw) {
                const newPlayerName = prompt('Please enter your name');
                setPlayerName(newPlayerName!);

                setRoomData({ ...roomData, attenders: [...roomData.attenders, { playerName: newPlayerName!, isAdmin: false }] })

                localStorage.setItem(roomName, JSON.stringify({ roomName: roomName, playerName: newPlayerName, isAdmin: false }));

                socket.emit('joinRoom', { roomName: router.query.roomName, playerName: newPlayerName });

            } else {
                const roomInfo = JSON.parse(roomInfoRaw!) as unknown as Attender;

                socket.emit('joinRoom', { roomName: router.query.roomName, playerName: playerName, isAdmin: roomInfo.isAdmin });
            }

            socket.on('newAttenders', (roomInfo: RoomType) => {
                setRoomData(roomInfo);
            })


            socket.on('showSize', (data) => {
                setAttendersEstimation(data);
            })


            socket.on('changeRoomStatus', (roomInfo: RoomType) => {
                setRoomData(roomInfo);
            })

            socket.on('sendSelectedSize', (data) => {
                setAttendersEstimation(data);
            })
        }


    }, [playerName, router.query.roomName, roomData, room])

    useEffect(() => {
        if (roomData && roomData.roomStatus === 'start' && attendersEstimation) {
            setAttendersEstimation(undefined);
        }
    }, [roomData])



    const toggleEstimate = () => {
        socket.emit('showSize', { roomName: roomName }, async (size: any) => {
            await changeRoomStatus();
            setAttendersEstimation(size);
        });
    }

    const isAdmin = () => {
        const attender = roomData?.attenders.find(q => q.playerName === playerName);
        return attender?.isAdmin
    }

    const changeRoomStatus = () => {
        return new Promise((resolve) => {
            socket.emit('changeRoomStatus', { roomName: roomData?.roomName }, (roomInfo: { room: RoomType, roomEstimations: any }) => {
                setRoomData(roomInfo.room);
                setAttendersEstimation(roomInfo.roomEstimations);
                resolve(true);
            });
        })
    }

    const emitSelectedEstimationSize = (size: string) => {
        socket.emit('sendSelectedSize', { roomName: roomName, selectedEstimationSize: size, playerName: playerName })
    }

    if (!roomData) {
        return <div>Loading...</div>
    }

    return <div className="flex items-center">
        <div className="mx-auto w-full max-w-7xl py-10">
            <div className="grid md:grid-cols-2 grid-cols-1">
                <AttenderList currentPlayerName={playerName} roomEstimation={attendersEstimation} rooms={roomData} />
                <div className='grid items-center'>
                    <CopyRoomLink roomStatus={roomData.roomStatus} />
                    <StartEstimation roomStatus={roomData.roomStatus} isAdmin={isAdmin()} onClick={changeRoomStatus} />
                    <Options roomStatus={roomData.roomStatus} roomEstimation={attendersEstimation} cardDeck="Scrum Scale" selectedItem={emitSelectedEstimationSize} />
                    <EstimateResult roomStatus={roomData.roomStatus} roomEstimations={attendersEstimation} />

                    {(isAdmin() && roomData.roomStatus !== 'start') && <button onClick={toggleEstimate} className="btn  text-white mt-5 font-bold py-2 px-4 rounded">
                        {roomData.roomStatus === 'inprogress' ? `Show Result` : 'Restart Estimation'}
                    </button>}
                </div>
            </div>
        </div>
    </div>
}


export default Room