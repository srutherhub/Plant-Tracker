import { useEffect } from "react";
import { usePlants } from "./usePlants";
import { Box } from "../../lib/Box";

export function Plants() {
  const { data, plants } = usePlants();

  useEffect(() => {
    plants();
  }, []);

  const plantsMap = data?.map((item, index) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          borderBottom: "1px solid gray",
          backgroundColor: getBackgroundColor(index),
          fontSize: "0.875rem",
        }}
      >
        <p style={rowStyle}>{item.name} </p>
        <p style={rowStyle}>{item.species}</p>
        <p style={rowStyle}>{item.type}</p>
        <p style={rowStyle}>{item.last_watered}</p>
        <p style={rowStyle}>{item.next_watering}</p>
      </div>
    );
  });
  return (
    <div>
      {data === null ? (
        ""
      ) : (
        <Box>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid gray",
              backgroundColor: "rgb(175, 202, 175)",
            }}
          >
            <p style={rowStyle}>Name</p>
            <p style={rowStyle}>Species</p>
            <p style={rowStyle}>Type</p>
            <p style={rowStyle}>Last Watered</p>
            <p style={rowStyle}>Next Watering</p>
          </div>
          {plantsMap}
        </Box>
      )}{" "}
    </div>
  );
}

const rowStyle = { padding: "1rem", width: "20%" };

function getBackgroundColor(index: number) {
  if (index % 2 !== 0) return "rgb(199, 193, 178)";
  else return "";
}
