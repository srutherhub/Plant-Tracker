import { useState } from "react";
import { Box } from "../../lib/Box";
import { Button } from "../../lib/Button";
import { Icon } from "../../lib/Icon";
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
    <Box className="toolbar" flexDirection="row" padding="1rem" justifyContent="space-between" flexWrap="wrap">
      <h1>My plants</h1>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ paddingRight: "0.5rem" }}>
          <select>
            <option value={ESortBy.default}>{ESortBy.default}</option>
            <option value={ESortBy.nextWatering}>{ESortBy.nextWatering}</option>
            <option value={ESortBy.lastWatered}>{ESortBy.lastWatered}</option>
          </select>
        </div>
        <Button
          icon={
            <Icon iconName="bi bi-plus-lg" iconColor="var(--primary-font)" />
          }
          name="Add plant"
          onclick={handleModal}
        />
        {isModalOpen && (
          <Modal>
            <PlantCardAddPlant onClose={handleModal} />
          </Modal>
        )}
      </div>
    </Box>
  );
}
