import portrait from "~/assets/portrait.jpg";
import { FunctionComponent } from "react";
import { LikeButton } from "@/molecules/like-button";

interface DigitalBusinessCardProps {
  onLike?: () => void;
  onHoverLike?: () => void;
}

const DigitalBusinessCard: FunctionComponent<DigitalBusinessCardProps> = ({
  onLike,
  onHoverLike,
}) => {
  return (
    <main className="bg-transparent flex flex-col items-center justify-center gap-8">
      <img
        className="size-48 rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-xl"
        src={portrait}
        alt="Portrait"
      />
      <h1 className="text-center bg-linear-60 from-chart-1 to-chart-5 bg-clip-text inline-block text-transparent text-6xl font-extrabold">
        Sean Krail
      </h1>
      <p className="text-center gap-2">
        Front-Office Engineer at{" "}
        <a
          className="underline text-chart-2 font-semibold hover:no-underline hover:text-chart-3"
          href="https://sig.com/what-we-do/"
          target="_blank"
          title="Susquehanna International Group"
        >
          SIG
        </a>{" "}
        <br />
        <code className="accent-foreground">Building Fullstack Software</code>
        <br />
        ex-
        <a
          className="underline text-chart-2 font-semibold hover:no-underline hover:text-chart-3"
          href="https://aws.amazon.com/"
          target="_blank"
          title="Amazon Web Services"
        >
          AWS
        </a>
      </p>
      <p>Philadelphia, PA</p>
      <div className="">
        <a
          className="underline text-chart-2 font-semibold hover:no-underline hover:text-chart-3"
          href="mailto:sean@krail.cloud?subject=Let%27s%20connect!"
          target="_blank"
          title="sean@krail.cloud"
        >
          Email
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          className="underline text-chart-2 font-semibold hover:no-underline hover:text-chart-3"
          href="https://github.com/sean-krail"
          target="_blank"
          title="@sean-krail"
        >
          GitHub
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          className="underline text-chart-2 font-semibold hover:no-underline hover:text-chart-3"
          href="https://linkedin.com/in/seankrail"
          target="_blank"
          title="@seankrail"
        >
          LinkedIn
        </a>
      </div>
      <LikeButton onLike={onLike} onHoverLike={onHoverLike} />
    </main>
  );
};

export { DigitalBusinessCard };
