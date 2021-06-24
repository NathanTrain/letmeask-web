import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from '../assets/images/delete.svg';

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question/index";

// import { useAuth } from "../hooks/useAuth";

import "../styles/room.scss";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import toast, { Toaster } from "react-hot-toast";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  
  const roomId = params.id;
  const {questions, title} = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    // ! usar REACT-MODAL para fazer uma modal diferente
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast("Pergunta excluída", {
        duration: 2000,
        position: "top-center",
        icon: <span className="material-icons" style={{color: '#f03232'}}>delete_outline</span>,
      })
    }

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
              return ( 
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
          })}
        </div>
        
      </main>
      <Toaster />
    </div>
  );
}
