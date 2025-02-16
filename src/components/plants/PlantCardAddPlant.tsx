import { useState } from "react";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { TextInput } from "../../lib/TextInput";
import { Plant } from "../../models/plant";
import { EPlantType } from "../../models/plant";
import { useAddPlant } from "./useAddPlant";

interface IPlantCardAddPlantProps {
  onClose: (updateState: boolean) => void;
}

export function PlantCardAddPlant(props: IPlantCardAddPlantProps) {
  const { onClose } = props;
  const [plantName, setPlantName] = useState<string>("");
  const [plantSpecies, setPlantSpecies] = useState<string>("");
  const [plantLocation, setPlantLocation] = useState<string>("");
  const [plantFreq, setPlantFreq] = useState<number>();
  const [plantWaterDate, setPlantWaterDate] = useState<string>("");
  const [plantType, setPlantType] = useState<EPlantType>(EPlantType.indoor);
  const isEditable = true;
  const { error, addplant } = useAddPlant();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlantType(e.target.value as EPlantType);
  };

  const handleAddPlant = async () => {
    const input: Plant = {
      name: plantName,
      species: plantSpecies,
      location: plantLocation,
      watering_frequency: plantFreq,
      last_watered: plantWaterDate,
      type: plantType,
    };
    try {
      await addplant(input);
      onClose(true);
    } catch {
      console.log(error);
    }
  };

  const itemStyle = {
    padding: "0.5rem",
    paddingBottom: "0.5rem",
    display: isEditable ? "" : "flex",
    justifyContent: isEditable ? "" : "space-between",
  };

  return (
    <Box height="28rem">
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            padding: "0.5rem",
          }}
        >
          <Icon
            iconName="bi bi-x-lg"
            loadingIconName="bi bi-hourglass"
            onclick={() => {
              onClose();
            }}
          />
          <Icon
            iconName="bi bi-save"
            loadingIconName="bi bi-hourglass"
            onclick={() => {
              handleAddPlant();
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.5rem",
          }}
        >
          <div style={{ paddingBottom: "1rem" }}>
            <p>Name </p>
            <TextInput setData={setPlantName} />
          </div>
          <div>
            <p>Species </p>
            <TextInput setData={setPlantSpecies} />
          </div>
          <div style={itemStyle}>
            <p>Last watered</p>
            <TextInput type="date" setData={setPlantWaterDate} />
          </div>
          <div style={itemStyle}>
            <p>Type</p>
            <select value={plantType} onChange={handleSelect}>
              <option value={EPlantType.indoor}>Indoor</option>
              <option value={EPlantType.outdoor}>Outdoor</option>
            </select>
          </div>
          <div style={itemStyle}>
            <p>Location</p>
            <TextInput setData={setPlantLocation} />
          </div>
          <div style={itemStyle}>
            <p>Watering Frequency (Days)</p>
            <TextInput type="number" setData={setPlantFreq} />
          </div>
        </div>
      </div>
    </Box>
  );
}
