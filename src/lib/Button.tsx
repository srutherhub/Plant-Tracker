export function Button({ ...props }) {

  return <div> <button onClick={props.onclick}
    style={{
      border: "1px solid var(--border)",
      width: "12rem",
      height: "2rem",
      borderRadius: "0.5rem"
    }}
  >{props.icon}{` ${props.name}`}</button></div>
}