import toast from "react-hot-toast";
import copyImg from "../assets/images/copy.svg";
import { useTheme } from "../hooks/useTheme";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() { 
    navigator.clipboard.writeText(props.code);
    toast("Copiado para área de transferência", {
      duration: 2000,
      position: 'top-center',
      icon: <span className="material-icons">content_copy</span>,
      id: "copied"
    })

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
