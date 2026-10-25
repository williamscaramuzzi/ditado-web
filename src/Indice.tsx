import { Link } from "react-router-dom";
import { activities } from "./activities";
import ActivityIcon from "./ActivityIcon";

export default function Indice() {
  return (
    <section className="home" aria-labelledby="home-title">
      <div className="home-welcome">
        <span className="welcome-decoration decoration-left" aria-hidden="true">✦</span>
        <div className="eyebrow">UM MUNDO DE DESCOBERTAS</div>
        <h1 id="home-title">O que vamos <span>aprender hoje?</span></h1>
        <p className="intro">Escolha uma atividade e vamos nos divertir aprendendo!</p>
        <span className="welcome-decoration decoration-right" aria-hidden="true">✧</span>
      </div>
      <div className="activity-grid">
        {activities.map(activity => (
          <Link to={activity.path} className="activity-card" data-activity={activity.kind} key={activity.path}>
            <div className="card-art"><ActivityIcon kind={activity.kind} /></div>
            <h2>{activity.name}</h2>
            <p>{activity.detail}</p>
            <span className="card-action">{activity.label}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

