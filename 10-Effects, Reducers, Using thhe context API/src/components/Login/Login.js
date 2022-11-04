import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import AuthContext from "../../stores/auth-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const emailReducerFn = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: String(state.value).includes("@") };
  }

  return { value: "", isValid: true };
};

const passwordReducerFn = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: true };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const initState = { value: "", isValid: false };
  const [emailState, dispatchEmail] = useReducer(emailReducerFn, initState);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducerFn,
    initState
  );

  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timout = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    //Sử dụng cleanup function để clear timeout mỗi khi user gõ phím dưới 500ms để tránh gọi setTimeout nhiều lần  khi người dùng chưa nhập xong
    // ig. Case setTimeout gọi http nếu không clearTimeout thế này thì server sẽ nhận được nhiều request mỗi khi user nhập ký tự

    //Cleanup function dưới sẽ không gọi khi lần đầu render componentn
    return () => {
      clearTimeout(timout);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
