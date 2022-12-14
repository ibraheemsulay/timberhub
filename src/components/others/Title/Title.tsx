import { S_title } from "./S_title";
import { S_container } from "../reusable-styles/S_container";
import Btn from "../Btn/Btn";
import { memo } from "react";

interface ITitle {
  title: string;
  btnText: string;
  eventHandler: () => void;
}

const Title: React.FC<ITitle> = ({ title, btnText, eventHandler }) => {
  return (
    <S_title data-test="page-title">
      <S_container>
        <h1>{title}</h1>
        {!!btnText && <Btn text={btnText} click={eventHandler} />}
      </S_container>
    </S_title>
  );
};

export default memo(Title);
