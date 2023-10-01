import { RoomEstimation, RoomStatusType } from "@/common/types";
import { useState } from "react";
import optionStyle from "./options.module.css";

export const cardDeckItems = [
  "0",
  "1/2",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  "?",
];

type CardDeck = "Scrum Scale" | "Fibonacci" | "Power of two" | "T-Shirt sizes";

export type OptionsProps = {
  cardDeck: CardDeck;
  selectedItem: (item: string) => void;
  roomStatus: RoomStatusType;
  roomEstimation?: RoomEstimation;
};

export const Options = ({
  cardDeck,
  selectedItem,
  roomStatus,
  roomEstimation,
}: OptionsProps) => {
  const [cardItem, setCardItem] = useState<string>();

  if (roomStatus === "start" && cardItem) {
    setCardItem(undefined);
  }

  if (roomStatus !== "inprogress") {
    return <></>;
  }

  const selectItem = (item: string) => {
    setCardItem(item);
    selectedItem(item);
  };

  return (
    <div className={optionStyle.options}>
      {cardDeckItems.map((item) => (
        <button
          tabIndex={0}
          id="optionButton"
          className={`${optionStyle.option}  ${
            item === cardItem && optionStyle.optionFocus
          }`}
          onClick={() => {
            selectItem(item);
          }}
          key={item}
        >
          {item}{" "}
        </button>
      ))}
    </div>
  );
};
