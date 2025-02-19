import { useEffect, useState } from "react";
import { Box } from "../../lib/Box";
import { Plant } from "../../models/plant";

interface IPlantTableProps {
  data: Plant[] | null | undefined;
}

export function PlantsTable(props: IPlantTableProps) {
  const { data } = props;
  const [plantsData, setPlantsData] = useState<Plant[] | null | undefined>(
    null
  );
  const numTableCols: string = 100 / 3 + "%";
  const rowStyle = { padding: "0.5rem", width: numTableCols };

  useEffect(() => {
    setPlantsData(data);
  }, [data]);

  const plantsMap = plantsData?.map((item: Plant, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          backgroundColor: getBackgroundColor(index),
        }}
      >
        <p style={rowStyle}>{item.name} </p>
        <p style={rowStyle}>{item.species}</p>
        <p style={rowStyle}>{item.type}</p>
        <p style={rowStyle}>{item.getLastWateredDate()}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignContent: "center",
            padding: "0.5rem",
            width: numTableCols,
          }}
        >
        </div>
      </div>
    );
  });
  return (
    <div>
      {plantsData === null ? (
        ""
      ) : (
        <Box>
          <h3>This week</h3>
          {plantsMap}
        </Box>
      )}{" "}
    </div>
  );
}

function getBackgroundColor(index: number): string {
  if (index % 2 !== 0) return "var(--base-bg)";
  else return "";
}
