import { useState, useEffect } from "react";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { TextInput } from "../../lib/TextInput";
import { Plant } from "../../models/plant";
import { EPlantType } from "../../models/plant";
import { useDeletePlant } from "./useDeletePlant";
import { useUpdatePlant } from "./useUpdatePlant";
import Droplet from "./Droplet";

interface IPlantCardProps {
  data: Plant | null | undefined;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: Plant) => void;
}

export function PlantCard(props: IPlantCardProps) {
  const { data, onDelete, onUpdate } = props;
  const [plantCardData, setPlantCardData] = useState<Plant | null>();
  const [plantName, setPlantName] = useState<string | null>("");
  const [plantSpecies, setPlantSpecies] = useState<string | null>("");
  const [plantLocation, setPlantLocation] = useState<string | null>("");
  const [plantFreq, setPlantFreq] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<EPlantType>(EPlantType.indoor);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: response, loading, error, deleteplant } = useDeletePlant();
  const {
    data: updateResponse,
    loading: updateLoading,
    updateplant,
  } = useUpdatePlant();

  useEffect(() => {
    setPlantCardData(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteplant(id);
      setPlantCardData(null);
      setIsEditable(!isEditable);
      onDelete(id);
    } catch {
      console.log(response, error);
    }
  };

  const handleUpdate = async (id: string, input: Plant) => {
    const plantCopy = {
      ...input,
      ...(plantName && { name: plantName }),
      ...(plantSpecies && { species: plantSpecies }),
      ...(plantLocation && { location: plantLocation }),
      ...(plantFreq && { watering_frequency: parseInt(plantFreq) }),
      ...(plantType && { type: plantType }),
    };

    const plantInstance = new Plant(
      plantCopy.id,
      plantCopy.name,
      plantCopy.type,
      plantCopy.species,
      plantCopy.last_watered,
      plantCopy.next_watering,
      plantCopy.location,
      plantCopy.watering_frequency
    );

    if (JSON.stringify(plantCardData) != JSON.stringify(plantInstance)) {
      setPlantCardData(plantInstance);
      try {
        await updateplant(id, plantInstance);
        setIsEditable(!isEditable);
        onUpdate(id, plantInstance);
      } catch {
        console.log(response, error);
      }
    } else {
      setIsEditable(!isEditable);
    }
  };

  useEffect(() => {
    if (updateResponse) setPlantCardData(updateResponse);
  }, [updateLoading, updateResponse]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlantType(e.target.value as EPlantType);
  };

  const itemStyle = {
    padding: "0.5rem",
    paddingBottom: "0.5rem",
    display: isEditable ? "" : "flex",
    justifyContent: isEditable ? "" : "space-between",
    borderBottom: "1px solid var(--border)",
  };

  if (!plantCardData) return <div></div>;

  if (isEditable) {
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
              iconName="bi bi-trash3"
              loading={loading}
              loadingIconName="bi bi-hourglass"
              onclick={() => {
                handleDelete(plantCardData.id);
              }}
            />
            <Icon
              iconName="bi bi-save"
              onclick={() => {
                handleUpdate(plantCardData.id, plantCardData);
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
              <TextInput
                setData={setPlantName}
                placeholder={plantCardData.name}
              />
            </div>
            <div>
              <p>Species </p>
              <TextInput
                setData={setPlantSpecies}
                placeholder={plantCardData.species}
              />
            </div>
            <div style={itemStyle}>
              <p>Type</p>
              <select value={plantType} onChange={handleSelect}>
                <option value={EPlantType.indoor}>Indoor</option>
                <option value={EPlantType.outdoor}>Outdoor</option>
              </select>
            </div>
            <div style={itemStyle}>
              <p>Location</p>{" "}
              <TextInput
                setData={setPlantLocation}
                placeholder={plantCardData.location}
              />
            </div>
            <div style={itemStyle}>
              <p>Watering Frequency (Days)</p>
              <TextInput
                type="number"
                setData={setPlantFreq}
                placeholder={plantCardData.watering_frequency.toString()}
              />
            </div>
          </div>
        </div>
        <div></div>
      </Box>
    );
  } else {
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
            <Droplet plant={plantCardData} />
            <Icon
              iconName="bi bi-pencil"
              onclick={() => setIsEditable(!isEditable)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "3rem",
            }}
          >
            <div style={{ paddingBottom: "1rem" }}>
              <h3>{plantCardData.name}</h3>
            </div>
            <div>
              <p>Species: {plantCardData.species}</p>
            </div>
          </div>
        </div>
        <div style={itemStyle}>
          <p>Next Watering Date</p>
          <p>{plantCardData.getNextWateringDate()}</p>
        </div>
        <div style={itemStyle}>
          <p>Last Watered Date</p>
          <p>{plantCardData.getLastWateredDate()}</p>
        </div>
        <div>
          <div style={itemStyle}>
            <p>Type</p>
            <p>{plantCardData.type}</p>
          </div>
          <div style={itemStyle}>
            <p>Location</p> <p>{plantCardData.location}</p>
          </div>
          <div style={itemStyle}>
            <p>Watering Frequency (Days)</p>
            <p>{plantCardData.watering_frequency}</p>
          </div>
        </div>
      </Box>
    );
  }
}
