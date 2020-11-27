import * as React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import State from "../../interfaces/State";
import { AuthContainer, AuthForm, AuthTitle } from "./styles";
import { FormGroup, InputFormGroup, Input, FormLabel, Button } from "../../styles/Global";
import { PulseLoader } from "react-spinners";

interface Props {
  error: string | null;
  loading: boolean;
  login: (data: object) => void;
}

const LoginPage: React.FC<Props> = ({ error, loading, login }) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    login({
      username,
      password,
    });
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={onSubmit}>
        <AuthTitle>Log in to Twitter</AuthTitle>
        <FormGroup>{error ? <p style={{ color: "#E0245E" }}>{error}</p> : null}</FormGroup>
        <InputFormGroup>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </InputFormGroup>
        <InputFormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputFormGroup>
        <FormGroup>
          <Button type="submit">
            {loading ? <PulseLoader color="#fff" size={10} /> : "Log In"}
          </Button>
        </FormGroup>
      </AuthForm>
    </AuthContainer>
  );
};

const mapToProps = (state: State) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

export default connect(mapToProps, { login })(LoginPage);
