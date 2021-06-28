import "./styles.scss";
import cx from "classnames";
import logoImg from "../../assets/images/logo.svg";
import { useHistory } from "react-router-dom";

type LogoProps = {
  inHeader?: boolean
}

export function LogoImg({ inHeader }: LogoProps) {
  const history = useHistory();
  function handleBackHome() {
    if (history.location.pathname !== "/") {
      history.push("/");
    }
  }
  return (
    <button 
      className={cx(
        "box",
        {inHeader: inHeader}
      )} 
      onClick={()=>handleBackHome()}
    >
      <img src={logoImg} alt="Let me ask" />
    </button>
  )
}