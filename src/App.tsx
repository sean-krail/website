import styles from "./App.module.css";
import portrait from "./assets/portrait.jpg";
import LikeButtonCard from "./components/organism/like-button-card";

function App() {
  return (
    <>
      <div>
        <img src={portrait} className={`${styles.portrait}`} alt="Portrait" />
      </div>
      <h1>Sean Krail</h1>
      <p>
        Engineer at{" "}
        <a
          href="https://sig.com/"
          target="_blank"
          title="Susquehanna International Group (SIG)"
        >
          Susquehanna
        </a>
        <br />
        <code>Writing Fullstack Software</code>
        <br />
        (ex-
        <a
          href="https://aws.amazon.com/"
          target="_blank"
          title="Amazon Web Services (AWS)"
        >
          AWS
        </a>
        )
      </p>
      <p>Philadelphia, PA</p>
      <div className={`${styles.card}`}>
        <a
          href="mailto:sean@krail.dev?subject=Let%27s%20connect!"
          target="_blank"
          title="sean@krail.dev"
        >
          Email
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://github.com/sean-krail"
          target="_blank"
          title="@sean-krail"
        >
          GitHub
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://linkedin.com/in/seankrail"
          target="_blank"
          title="@seankrail"
        >
          LinkedIn
        </a>
      </div>
      <LikeButtonCard />
    </>
  );
}

export default App;
