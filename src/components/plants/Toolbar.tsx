import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAppContext } from "../../useAppContext";
import { Button, EButtonTypes } from "../../lib/Button";
import { Modal } from "../../lib/Modal";
import { PlantCardAddPlant } from "./PlantCardAddPlant";
import { usePlants } from "./usePlants";

enum ESortBy {
  default,
  nextWatering,
  lastWatered,
}

export function Toolbar() {
  const context = useAppContext();
  const setPlantsData = context?.setPlantsData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, plants } = usePlants();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleModal = (updateState?: boolean) => {
    toggleModal();
    if (updateState) {
      plants();
    }
  };

  const params = new URLSearchParams(searchParams);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== params.get("sort")) {
      params.set("sort", e.target.value);
      setSearchParams(params);
    }
  };

  useEffect(() => {
    plants();
  }, [plants, searchParams]);

  useEffect(() => {
    if (data && setPlantsData) setPlantsData(data);
  }, [data, setPlantsData]);

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
          <select onChange={handleSelect} value={searchParams.get("sort") || 0}>
            <option value={ESortBy.default}>{"Sort"}</option>
            <option value={ESortBy.nextWatering}>{"Next watering date"}</option>
            <option value={ESortBy.lastWatered}>{"Last watered"}</option>
          </select>
        </div>
        <div style={{ width: "8rem" }}>
          <Button
            type={EButtonTypes.secondary}
            iconName="bi bi-plus-lg"
            name="Add plant"
            onclick={toggleModal}
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
