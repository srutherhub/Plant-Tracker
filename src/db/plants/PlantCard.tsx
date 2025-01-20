import { useState, useEffect } from "react";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { TextInput } from "../../lib/TextInput";
import { IPlant } from "./usePlants";
import { EPlantType } from "./usePlants";
import { useDeletePlant } from "./useDeletePlant";
import { useUpdatePlant } from "./useUpdatePlant";

interface IPlantCardProps {
  data: IPlant | null | undefined;
}

export function PlantCard(props: IPlantCardProps) {
  const { data } = props;
  const [plantData, setPlantData] = useState<IPlant | null | undefined>();
  const [plantName, setPlantName] = useState<string | null>("");
  const [plantSpecies, setPlantSpecies] = useState<string | null>("");
  const [plantLocation, setPlantLocation] = useState<string | null>("");
  const [plantFreq, setPlantFreq] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<EPlantType>(EPlantType.indoor);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: response, loading, error, deleteplant } = useDeletePlant();
  const { updateplant } = useUpdatePlant();

  useEffect(() => {
    setPlantData(data);
    setPlantType(plantData?.type)
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteplant(id);
      setPlantData(null);
    } catch {
      console.log(response, error);
    }
  };

  const handleUpdate = async (
    id: string | null | undefined,
    input: IPlant | null | undefined
  ) => {
    const plantCopy: IPlant = {
      ...input,
      ...(plantName && { name: plantName }),
      ...(plantSpecies && { species: plantSpecies }),
      ...(plantLocation && { location: plantLocation }),
      ...(plantFreq && { watering_frequency: plantFreq }),
      ...(plantType && { type: plantType }),
    };

    if (JSON.stringify(plantData) != JSON.stringify(plantCopy)) {
      setPlantData(plantCopy);
      try {
        await updateplant(id, plantCopy);
        setIsEditable(!isEditable);
      } catch {
        console.log(response, error);
      }
    } else {
      setIsEditable(!isEditable);
    }
  };

  const handleSelect = (e) => {
    setPlantType(e.target.value)
  }

  const itemStyle = {
    padding: "0.5rem",
    paddingBottom: "0.5rem",
    display: isEditable ? "" : "flex",
    justifyContent: isEditable ? "" : "space-between",
    borderBottom: "1px solid var(--border)",
  };

  if (isEditable) {
    return (
      <div>
        {!plantData ? (
          <div></div>
        ) : (
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
                    handleDelete(plantData?.id);
                  }}
                />
                <Icon
                  iconName="bi bi-save"
                  onclick={() => {
                    handleUpdate(plantData?.id, plantData);
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
                    placeholder={plantData?.name}
                  />
                </div>
                <div>
                  <p>Species </p>
                  <TextInput
                    setData={setPlantSpecies}
                    placeholder={plantData?.species}
                  />
                </div>
                <div style={itemStyle}>
                  <p>Type</p>
                  <select value={plantType} onChange={handleSelect}>
                    <option value={EPlantType.indoor}>
                      Indoor
                    </option>
                    <option value={EPlantType.outdoor}>
                      Outdoor
                    </option>
                  </select>
                </div>
                <div style={itemStyle}>
                  <p>Location</p>{" "}
                  <TextInput
                    setData={setPlantLocation}
                    placeholder={plantData?.location}
                  />
                </div>
                <div style={itemStyle}>
                  <p>Watering Frequency (Days)</p>
                  <TextInput type="number" setData={setPlantFreq} placeholder={plantData?.watering_frequency} />
                </div>
              </div>
            </div>
            <div>

            </div>
          </Box>
        )}
      </div >
    );
  } else {
    return (
      <div>
        {!plantData ? (
          <div></div>
        ) : (
          <Box height="28rem">
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignContent: "center",
                  padding: "0.5rem",
                }}
              >
                <Icon
                  iconName="bi bi-pencil"
                  onclick={() => setIsEditable(!isEditable)}
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
                  <h3>{plantData?.name}</h3>
                </div>
                <div>
                  <p>Species: {plantData?.species}</p>
                </div>
              </div>
            </div>
            <div style={itemStyle}>
              <p>Next Watering Date</p>
              <p>{plantData?.next_watering}</p>
            </div>
            <div style={itemStyle}>
              <p>Last Watered Date</p>
              <p>{plantData?.last_watered}</p>
            </div>
            <div>
              <div style={itemStyle}>
                <p>Type</p>
                <p>{plantData?.type}</p>
              </div>
              <div style={itemStyle}>
                <p>Location</p> <p>{plantData?.location}</p>
              </div>
              <div style={itemStyle}>
                <p>Watering Frequency (Days)</p>
                <p>{plantData?.watering_frequency}</p>
              </div>
            </div>
          </Box>
        )}
      </div>
    );
  }
}
