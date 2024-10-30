import Image from "next/image";
import { IMG } from "../../types";
import "./card.css";

type Props = {
  img: IMG;
  show: boolean;
};

const Card = ({ img, show }: Props) => {
  console.log('show', show)
  return (
    <div className={`flip-card${show ? " flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front" />
        <div className="flip-card-back">
          <Image
            src={img.url}
            alt={img.title}
            width="180"
            height="200"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
