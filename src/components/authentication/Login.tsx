import { useState } from 'react'
import { Box } from '../../lib/Box'
import { TextInput } from '../../lib/TextInput'
import { Button } from '../../lib/Button'
import { Navbar } from '../navbar/Navbar'
import { useAuth } from './useAuth'

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error, auth } = useAuth({ endpoint: "authentication/signin" })

  const handleOnClick = () => {
    auth(email, password)
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box width="24rem" alignItems="center">
          <p>Sign in or Sign up</p>
          <TextInput placeholder="Email" setData={setEmail} />
          <TextInput placeholder="Password" type="password" setData={setPassword} />
          <Button name="Sign in" onclick={handleOnClick} />
          <>{error}</>
        </Box>
      </div></div>)
}