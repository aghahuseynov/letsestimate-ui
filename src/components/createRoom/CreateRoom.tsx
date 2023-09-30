import React from "react";
import Image from 'next/image'
import { ChangeEvent, useState } from 'react';
import { generateRandomRoom } from '@/utils/generateRandomRoom';
import { useRouter } from 'next/router';
import { useSocket } from '@/context/socketContext';
import { useAppContext } from '@/context/appContext';
import CreateRoomStyles from "./createRoom.module.css";


export const CreateRoom = () => {
  const router = useRouter();
  const socket = useSocket();
  const { playerName, setPlayerName } = useAppContext();
  const [showInputError, setShowInputError] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const createRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const randomRoomName = generateRandomRoom();

    if (!playerName) {
      setShowInputError(true);
      return;
    }

    socket.emit("createRoom", {
      roomName: randomRoomName,
      playerName: playerName,
    });
    localStorage.setItem(
      randomRoomName,
      JSON.stringify({
        roomName: randomRoomName,
        playerName: playerName,
        isAdmin: true,
      })
    );

    router.push(`room/${randomRoomName}`);
  };

  return (
    <div className={CreateRoomStyles.createRoom}>
      <div className={CreateRoomStyles.createRoomDiv} >
        <h1 className={CreateRoomStyles.createRoomTitle}>
          Create a room without any limitations!
        </h1>
        <p className={CreateRoomStyles.createRoomSubtitle} >
          And you can start estimating with your team right away
        </p>

        <form  className={CreateRoomStyles.createRoomForm} onSubmit={createRoom}>
          <input
            type="text"
            placeholder="Please enter your name"
            className={`  ${
              showInputError && "input-error"
            } `}
            onChange={onChange}
          />

          <button className="btn" type="submit" >
            Create a Room
          </button>
        </form>
      </div>
    </div>
  );
};
