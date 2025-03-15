import { Plant } from "../../models/plant";
import { TooltipItem } from "../../lib/TooltipItem";
import { TooltipText } from "../../lib/TooltipText";

export default function Droplet(props: { plant: Plant }) {
  const { plant } = props;
  if (plant.isWateringReqToday()) {
    return (
      <TooltipItem>
        <i
          className="bi bi-circle-fill"
          style={{ color: "var(--quaternary-accent)" }}
        >
        </i>
        <TooltipText>Time to water this plant!</TooltipText>
      </TooltipItem>
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
