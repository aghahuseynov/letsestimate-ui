import { RoomStatusType } from "@/common/types";
import CopyRoom from "./CopyRoomLink.module.css";
import { useState } from "react";

type CopyRoomLinkProps = {
  roomStatus: RoomStatusType;
};

export const CopyRoomLink = ({ roomStatus }: CopyRoomLinkProps) => {
  const [copyAllert, setCopyAllert] = useState<boolean>(false);

  if (roomStatus !== "start") {
    return <></>;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyAllert(!copyAllert);
    setTimeout(() => {
      setCopyAllert(false);
    }, 3000);
  };

  return (
    <>
      <h1 className={CopyRoom.title}>Invite players to the room</h1>
      <p className={CopyRoom.subtitle}>
        Send the link below to your team mates and soon they will start joining
        the room
      </p>
      <button onClick={copyToClipboard} className="btn">
        Copy Room Link
      </button>
      {copyAllert && (
        <div id={copyAllert ? "allertPassword" : "allertPassword active"}>
          {"Copied!"}
        </div>
      )}
    </>
  );
};
