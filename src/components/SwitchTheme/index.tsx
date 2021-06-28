import { useTheme } from "../../hooks/useTheme";
import cx from "classnames";

import lightOnImg from '../../assets/images/light-on.svg';
import lightOffImg from '../../assets/images/light-off.svg';

import "./styles.scss";

type SwitchThemeProps = {
  Up?: boolean;
  Down?: boolean;
};

export function SwitchTheme({ Up, Down }: SwitchThemeProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={cx(
      'switch',
      {Up: Up},
      {Down: Down},
    )} onClick={toggleTheme} >
      <span>
        {theme === 'light'
          ? <img src={lightOnImg} alt="Tema Claro" />
          : <img src={lightOffImg} alt="Tema Escuro" />
        }
      </span>
    </button>
  );
}
