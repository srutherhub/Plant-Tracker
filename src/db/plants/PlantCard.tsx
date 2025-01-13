import { useState, useEffect } from "react";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { IPlant } from "./usePlants";
import { useDeletePlant } from "./useDeletePlant";

interface IPlantCardProps {
  data: IPlant | null | undefined;
}

export function PlantCard(props: IPlantCardProps) {
  const { data } = props;
  const [plantData, setPlantData] = useState<IPlant | null | undefined>();
  const { data: response, loading, error, deleteplant } = useDeletePlant();

  useEffect(() => {
    setPlantData(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteplant(id);
      setPlantData(null);
    } catch {
      console.log(response, error);
    }
  };

  const itemStyle = {
    padding: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--border)"
  };

  return (
    <div>
      {!plantData ? (
        <div></div>
      ) : (
        <Box>
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
              <Icon iconName="bi bi-pencil" />
              <Icon
                iconName="bi bi-trash3"
                loading={loading}
                loadingIconName="bi bi-hourglass"
                onclick={() => {
                  handleDelete(plantData?.id);
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
