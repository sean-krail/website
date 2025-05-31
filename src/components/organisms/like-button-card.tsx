import { FunctionComponent } from "react";
import { LikeButton } from "@/molecules/like-button";

const LikeButtonCard: FunctionComponent = () => {
  return (
    <div className="">
      <LikeButton />
      <p hidden className="">
        Likes counter backed by
        <br />
        AWS Lambda and DynamoDB
      </p>
    </div>
  );
};

export { LikeButtonCard };
