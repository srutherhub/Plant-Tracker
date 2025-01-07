import { useState } from 'react'
import { Box } from '../lib/Box'
import { TextInput } from '../lib/TextInput'
import { Button } from '../lib/Button'
import { useAuth } from './useAuth'

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, error, session, auth } = useAuth()

  const handleOnClick = () => {
    auth(email, password)
  }

  console.log(loading, error, session)
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box width="24rem">
        <p>Sign in or Sign up</p>
        <TextInput placeholder="Email" setData={setEmail} />
        <TextInput placeholder="Password" type="password" setData={setPassword} />
        <Button name="Sign in" onclick={handleOnClick} />
      </Box>
    </div>)
}