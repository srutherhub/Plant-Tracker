import { useEffect } from "react";
import { TPlantAudit, usePlantsAudit } from "./usePlantsAudit";
import { Box } from "../../lib/Box";
import { Plant } from "../../models/plant";
import EmptyBox from "../../lib/EmptyBox";

interface IPlantsAuditProps {
  data: Plant[] | undefined;
  plantsAuditData: TPlantAudit | undefined;
  setPlantsAuditData: React.Dispatch<
    React.SetStateAction<TPlantAudit | undefined>
  >;
}

export function PlantsAuditCalendar(props: IPlantsAuditProps) {
  const { data: plantData, setPlantsAuditData, plantsAuditData } = props;
  const { data, plantsaudit } = usePlantsAudit();

  useEffect(() => {
    const plantIds = plantData?.map((item) => item.id);
    if (plantIds) {
      plantsaudit(plantIds);
    }
  }, [plantData, plantsaudit]);

  useEffect(() => {
    if (setPlantsAuditData && data != undefined) setPlantsAuditData(data);
  }, [data, setPlantsAuditData]);

  if (!plantsAuditData)
    return (
      <EmptyBox
        title="History"
        text="No plants have been watered yet!"
      ></EmptyBox>
    );

  const map = Object.keys(plantsAuditData).map((item: string, key: number) => {
    return (
      <details key={key}>
        <summary style={{ fontSize: "0.875rem" }}>{item}</summary>
        {plantsAuditData[item].map((index, num) => {
          return (
            <p key={num}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {index}
            </p>
          );
        })}
      </details>
    );
  });

  return (
    <Box padding="1rem" display="flex" flexDirection="column" gap="0.5rem">
      <h3>History</h3>
      {map}
    </Box>
  );
}
