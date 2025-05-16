import { login} from './actions'
export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      {/* note that the sign up action is set as login. IMPORTANT to remember to change */}
      <button formAction={login}>Sign up</button>
    </form>
  )
}