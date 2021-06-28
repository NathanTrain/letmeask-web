import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { SwitchTheme } from "../components/SwitchTheme";
import { LogoImg } from "../components/LogoImg";

import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const { theme } = useTheme();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode.trim()}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already close.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <SwitchTheme Up />
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <LogoImg />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
