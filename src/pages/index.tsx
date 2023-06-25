import Image from 'next/image'
import { ChangeEvent, useState } from 'react';
import { generateRandomRoom } from '@/utils/generateRandomRoom';
import { useRouter } from 'next/router';
import { useSocket } from '@/context/socketContext';
import { useAppContext } from '@/context/appContext';
import { DonationInfoModal } from '@/components/donationInfoModal/DontationInfoModal';


export default function Home() {
  const router = useRouter()
  const socket = useSocket();
  const { playerName, setPlayerName } = useAppContext()
  const [showInputError, setShowInputError] = useState<boolean>(false)


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  }

  const createRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const randomRoomName = generateRandomRoom();

    if (!playerName) {
      setShowInputError(true);
      return;
    }

    socket.emit('createRoom', { roomName: randomRoomName, playerName: playerName });
    localStorage.setItem(randomRoomName, JSON.stringify({ roomName: randomRoomName, playerName: playerName, isAdmin: true }));

    router.push(`room/${randomRoomName}`)
  }


  return (
    <>
      <DonationInfoModal />
      <div className="md:container md:mx-auto hero">
        <div className="hero-content text-center mt-10">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">Create a room without any limitations!</h1>
            <p className="py-6">And you can start estimating with your team right away</p>

            <form onSubmit={createRoom}>
              <input type="text" placeholder="Please enter your name" className={`input w-full max-w-xs  ${showInputError && 'input-error'} `} onChange={onChange} />

              <button type='submit' className="btn mt-5 ">Create a Room</button>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}
