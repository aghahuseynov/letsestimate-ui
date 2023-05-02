import { Attender, RoomEstimation, RoomType } from "@/common/types";
import { EstimateResult } from "@/components/estimateResult/EstimateResult";
import { Options } from "@/components/options/Options";
import { PlayerList } from "@/components/playerList/PlayerList";
import { useAppContext } from "@/context/appContext";
import { useSocket } from "@/context/socketContext";
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"


export async function getServerSideProps({ params }: any) {
    const res1 = await fetch(`http://localhost:3001/room/${params.roomName}`)
    const room = await res1.json();

    return { props: { room: room } }
}

type RoomProps = {
    room: RoomType;
};

const Room = ({ room }: RoomProps) => {
    const router = useRouter();
    const socket = useSocket();

    const [roomData, setRoomData] = useState<RoomType>(room);
    const [isEstimateActive, setIsEstimateActive] = useState<boolean>(false)
    const [attendersEstimation, setAttendersEstimation] = useState<RoomEstimation>();

    const roomName = router.query.roomName as string

    const { playerName, setPlayerName } = useAppContext();

    useEffect(() => {

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

        socket.on('newAttenders', async (roomInfo) => {
            setRoomData(roomInfo);
        })


        socket.on('showSize', (data) => {
            console.log('size:', data);
            setAttendersEstimation(data);
        })


    }, [playerName, router.query.roomName])


    const toggleEstimate = (e: SyntheticEvent) => {
        socket.emit('showSize', { roomName: roomName, resetEstimation: !isEstimateActive }, (size: any) => {
            console.log('hello i am here:', size);
            setAttendersEstimation(size);
            setIsEstimateActive(!isEstimateActive)
        });
    }

    const isAdmin = () => {
        const attender = roomData.attenders.find(q => q.playerName === playerName);
        return attender?.isAdmin
    }


    return <div className="lex min-h-screen flex-col  p-24">
        <div> Welcome to room page:{router.query.roomName}</div >
        <PlayerList rooms={roomData} />
        <Options cardDeck="Scrum Scale" selectedItem={(item: string) => {
            socket.emit('sendSelectedSize', { roomName: roomName, selectedEstimationSize: item, playerName: playerName })
        }} />


        {isAdmin() && <button onClick={toggleEstimate} className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded">
            {!isEstimateActive ? `Show Result` : 'Restart'}
        </button>
        }
        <div style={{ width: 550, height: 550 }}>
            {attendersEstimation && <EstimateResult roomEstimations={attendersEstimation} />}
        </div>

    </div>
}


export default Room