import { FunctionComponent } from "react";
import LikeButton from "../../molecules/like-button";
import styles from "./index.module.css";

const LikeButtonCard: FunctionComponent = () => {
  return (
    <div className={`${styles.card}`}>
      <LikeButton />
      <p hidden className={`${styles.footnotes}`}>
        Likes counter backed by
        <br />
        AWS Lambda and DynamoDB
      </p>
    </div>
  );
};

export default LikeButtonCard;
