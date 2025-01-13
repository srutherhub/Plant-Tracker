import { PlantCard } from "./PlantCard"


export function PlantsCardGrid(props) {
  const { data } = props

  const plantsMap = data?.map((item, index) => { return (<PlantCard key={index} data={item} />) })

  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))", gap: "1rem" }}>{plantsMap}</div>

}