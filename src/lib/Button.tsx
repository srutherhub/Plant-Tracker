export function Button({ ...props }) {

  return <div style={{ paddingBottom: "1rem" }}> <button onClick={props.onclick}
    style={{
      border: "1px solid gray",
      width: "16.5rem",
      height: "2.25rem",
    }}
  >{props.name}</button></div>
}