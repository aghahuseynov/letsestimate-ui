"use client";
import { RoomEstimation, RoomType } from "@/common/types";
import attenderListStyle from "./attenderList.module.css";
import { generateRandomColor } from "@/utils/generateRandomColor";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { AttenderAvatar } from "../attenderAvatar/AttenderAvatar";

type AttenderListType = {
  rooms: RoomType;
  roomEstimation?: RoomEstimation;
  currentPlayerName: string;
};

export const AttenderList = ({
  rooms,
  roomEstimation,
  currentPlayerName,
}: AttenderListType) => {
  const checkAttenderSizeStatus = (playerName: string) => {
    const attender = roomEstimation?.attenders.find(
      (q) => q.playerName === playerName
    );

    return attender ? true : false;
  };

  const attenderEstimationSizeValue = (playerName: string) => {
    const attender = roomEstimation?.attenders.find(
      (q) => q.playerName === playerName
    );

    return attender?.selectedEstimationSize;
  };

  return (
    <div className={attenderListStyle.attenderList}>
      <h2 className={attenderListStyle.title}>Attenders</h2>
      <ul>
        {rooms.attenders.map((item, index: any) => {
          return (
            <li
              key={index}
              className={` ${
                item.isAdmin
                  ? attenderListStyle.attenderListAdmin
                  : attenderListStyle.attenderListItem
              }`}
            >
              <AttenderAvatar playerName={item.playerName} />

              <h5>
                {" "}
                {item.playerName}{" "}
                {item.isAdmin && (
                  <span className={attenderListStyle.adminTitle}>
                    <i>admin</i>{" "}
                  </span>
                )}{" "}
              </h5>
              <div className={attenderListStyle.status}>
                {rooms.roomStatus === "end" && (
                  <div className={attenderListStyle.statusType}>
                    {" "}
                    <span>
                      {attenderEstimationSizeValue(item.playerName)}
                    </span>{" "}
                  </div>
                )}
                {rooms.roomStatus !== "end" &&
                  item.playerName !== currentPlayerName &&
                  (checkAttenderSizeStatus(item.playerName) ? (
                    <div className={attenderListStyle.checkIcon}>
                      {" "}
                      <AiOutlineCheckCircle />{" "}
                    </div>
                  ) : (
                    <div className={attenderListStyle.closeIcon}>
                      <AiOutlineCloseCircle />
                    </div>
                  ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
