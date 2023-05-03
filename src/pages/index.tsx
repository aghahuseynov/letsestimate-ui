import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ChangeEvent } from 'react';
import { generateRandomRoom } from '@/utils/generateRandomRoom';
import { useRouter } from 'next/router';
import { useSocket } from '@/context/socketContext';
import { useAppContext } from '@/context/appContext';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router = useRouter()
  const socket = useSocket();
  const { playerName, setPlayerName } = useAppContext()


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  }

  const createRoom = () => {
    const randomRoomName = generateRandomRoom();

    socket.emit('createRoom', { roomName: randomRoomName, playerName: playerName });
    localStorage.setItem(randomRoomName, JSON.stringify({ roomName: randomRoomName, playerName: playerName, isAdmin: true }));

    router.push(`room/${randomRoomName}`)
  }


  return (
    <div className="md:container md:mx-auto hero">
      <div className="hero-content text-center mt-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">Create a room without any limitations!</h1>
          <p className="py-6">And you can start estimating with your team right away</p>
          <input type="text" placeholder="Please enter your name" className="input w-full max-w-xs" onChange={onChange} />

          <button onClick={createRoom} className="btn mt-5 ">Create a Room</button>

        </div>
      </div>
    </div>
  )
}
