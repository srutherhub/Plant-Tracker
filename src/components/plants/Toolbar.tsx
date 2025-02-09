import { useState } from "react";
import { Button } from "../../lib/Button";
import { Modal } from "../../lib/Modal";
import { PlantCardAddPlant } from "./PlantCardAddPlant";

enum ESortBy {
  default = "Sort",
  nextWatering = "Next watering date",
  lastWatered = "Last watered",
}

export function Toolbar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="toolbar"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "1rem 0",
      }}
    >
      <h1>Manage plants</h1>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ paddingRight: "0.5rem" }}>
          <select>
            <option value={ESortBy.default}>{ESortBy.default}</option>
            <option value={ESortBy.nextWatering}>{ESortBy.nextWatering}</option>
            <option value={ESortBy.lastWatered}>{ESortBy.lastWatered}</option>
          </select>
        </div>
        <div style={{ width: "8rem" }}>
          <Button
            iconName="bi bi-plus-lg"
            name="Add plant"
            onclick={handleModal}
          />
        </div>
        {isModalOpen && (
          <Modal>
            <PlantCardAddPlant onClose={handleModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
