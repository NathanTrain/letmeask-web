import cx from "classnames";

import copyImg from "../assets/images/copy.svg";
import { useTheme } from "../hooks/useTheme";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() { 
    //! adicionar toast para quando estiver copiado
    navigator.clipboard.writeText(props.code);
  }

  const {theme} = useTheme();

  return (
    <button onClick={copyRoomCodeToClipboard} className={`room-code ${theme}`}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
