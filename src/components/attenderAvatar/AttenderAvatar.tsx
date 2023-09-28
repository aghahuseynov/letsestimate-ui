import { generateRandomColor } from "@/utils/generateRandomColor";
import attenderAvatarStyle from "./attenderAvatar.module.css";

import React, { memo } from "react";

type AttenderAvatarType = {
  playerName: string;
};

export const AttenderAvatar = memo(function ({
  playerName,
}: AttenderAvatarType) {
  return (
    <div
      style={{ backgroundColor: generateRandomColor() }}
      className={attenderAvatarStyle.avatar}
    >
      <span className={attenderAvatarStyle.avatarItem}>
        {playerName[0].toUpperCase()}
      </span>
    </div>
  );
});
