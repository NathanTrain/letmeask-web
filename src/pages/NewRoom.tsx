import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";

import { Button } from "../components/Button";
import { LogoImg } from "../components/LogoImg";
import { SwitchTheme } from "../components/SwitchTheme";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { database } from "../services/firebase";

import "../styles/auth.scss";

export function NewRoom() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da Sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
