import { Plant } from "../../models/plant";

export default function Droplet(props: { plant: Plant }) {
  const { plant } = props;
  if (plant.isWateringReqToday()) {
    return (
      <i
        className="bi bi-circle-fill tooltip-item"
        style={{ color: "var(--quaternary-accent)" }}
      >
        <p className="tooltip-text">Time to water this plant!</p>
      </i>
    );
  }
  return (
    <i
      className="bi bi-circle-fill tooltip-item"
      style={{ color: "var(--border)" }}
    >
      <p className="tooltip-text">{`Water on ${plant.getNextWateringDate()}`}</p>
    </i>
  );
}
