import React, { useState } from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Loading,
} from "@nextui-org/react";
import { Mail } from "../src/icons/Mail";
import { Password } from "../src/icons/Password";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      // code to login
      setLoading(false);
    } catch (error) {
      // code to handle error
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(./assets/wallpaper.jpeg)",
        backgroundColor: "#9DD1E6",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        preventClose
        delay={100}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to&nbsp;
            <Text b size={18}>
              Name of App
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type={"email"}
            placeholder="Email"
            name="email"
            contentLeft={<Mail fill="currentColor" />}
            aria-label="Email"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            name="password"
            type={["password"]}
            contentLeft={<Password fill="currentColor" />}
            aria-label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          />
          {error != "" ? (
            <Text size={14} color="error">
              {errorMessage}
            </Text>
          ) : null}
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Link href="/recover-password">
                <Text color="primary" size={14}>
                  Forgot password?
                </Text>
            </Link>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="secondary"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
          <Button
            auto
            onClick={async () => {
              setLoading(true);
              handleLogin();
            }}
          >
            {loading ? <Loading color={"white"} /> : "Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
