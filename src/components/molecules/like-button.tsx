import { Button } from "@/atoms/button";
import { Spinner } from "@/atoms/spinner";
import { ThumbsUpIcon } from "@phosphor-icons/react";
import { FunctionComponent, useState } from "react";
import { useLikeCount } from "~/hooks/use-like-count";

interface LikeButtonProps {
  onLike?: () => void;
  onHoverLike?: () => void;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({
  onLike,
  onHoverLike,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { count, isLoading, submitLike } = useLikeCount();

  return (
    <Button
      disabled={disabled || isLoading}
      onMouseEnter={onHoverLike}
      onClick={async () => {
        setDisabled(true);
        onLike?.();
        await submitLike();
      }}
    >
      <ThumbsUpIcon alt="Like" weight={disabled ? "fill" : "regular"} />
      &nbsp;&nbsp;&nbsp;
      {isLoading ? <Spinner /> : <span>{count}</span>}
    </Button>
  );
};

export { LikeButton };
