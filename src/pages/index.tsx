import Image from 'next/image'
import { Inter } from 'next/font/google'
import io, { Manager } from "socket.io-client";
import { ChangeEvent, useEffect, useState } from 'react';
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
    <main
      className={`flex min-h-screen flex-col  p-24 ${inter.className}`}
    >
      <input placeholder='Please enter your name' onChange={onChange} />
      <button onClick={createRoom} >Create Room</button>

    </main>
  )
}
