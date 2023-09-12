/* eslint-disable no-console */
import createExceptionSentry from "../../utils/createExceptionSentry";
import Axios from "../Axios";

export async function SignUpFetch(username, email, password) {
  console.log(
    "SignUpFetch | username, email, password: ",
    username,
    email,
    password,
  );
  const configRequest = {
    method: "post",
    url: "/users/sign_up",
    data: {
      username,
      email,
      password,
    },
  };

  try {
    const response = await Axios(configRequest);
    console.log("SignUpFetch | response", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("SignUpFetch | error:", error);
    let message;
    const expectedStatusCodes = [409];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        configRequest.body,
      );
    }

    return {
      isSuccess: false,
      message,
    };
  }
}

export async function SignInFetch(email, password) {
  console.log("SignInFetch | email, password:", email, password);
  const configRequest = {
    method: "post",
    url: "/users/sign_in",
    data: { email, password },
  };

  try {
    const response = await Axios(configRequest);
    console.log("SignInFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
      user: {
        ...response.data.user,
        token: response.data.token,
      },
    };
  } catch (error) {
    console.log("SignInFetch | error:", error.message);
    let message;
    const expectedStatusCodes = [401, 404];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        configRequest.body,
      );
    }
    return {
      isSuccess: false,
      message,
    };
  }
}

export async function ForgotPasswordFetch(email) {
  console.log("ForgotPasswordFetch | email: ", email);
  const configRequest = {
    method: "post",
    url: "/users/forgot_password",
    data: { email },
  };

  try {
    const response = await Axios(configRequest);
    console.log("ForgotPasswordFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("ForgotPasswordFetch | error: ", error);
    let message;
    const expectedStatusCodes = [404];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        configRequest.data,
      );
    }

    return {
      isSuccess: false,
      message,
    };
  }
}

export async function ProfileFetch(tokenAuthorization) {
  console.log("ProfileFetch | tokenAuthorization:", tokenAuthorization);
  const configRequest = {
    method: "get",
    url: "/users/profile",
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log("ProfileFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: "",
      user: response.data.user,
    };
  } catch (error) {
    console.log("ProfileFetch | error:", error.message);
    let message;
    const expectedStatusCodes = [401];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        configRequest.headers,
      );
    }

    return {
      isSuccess: false,
      message,
      user: null,
    };
  }
}

export async function ProfileUpdateFetch(tokenAuthorization, username, email) {
  console.log(
    "ProfileUpdateFetch | tokenAuthorization, name, phone, email, state, city:",
    tokenAuthorization,
    username,
    email,
  );
  const configRequest = {
    method: "patch",
    url: "/users/profile",
    data: {
      username,
      email,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log("ProfileUpdateFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("ProfileUpdateFetch | error:", error.message);
    let message;
    const expectedStatusCodes = [401, 409];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(error, configRequest.method, configRequest.url, {
        ...configRequest.headers,
        ...configRequest.data,
      });
    }
    return {
      isSuccess: false,
      message,
    };
  }
}

export async function ProfileDeleteFetch(tokenAuthorization) {
  console.log("ProfileDeleteFetch | tokenAuthorization:", tokenAuthorization);
  const configRequest = {
    method: "delete",
    url: "/users/profile",
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log("ProfileDeleteFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("ProfileDeleteFetch | error:", error.message);
    let message;
    const expectedStatusCodes = [401];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        configRequest.headers,
      );
    }
    return {
      isSuccess: false,
      message,
    };
  }
}

export async function RedefinePasswordFetch(
  tokenAuthorization,
  password,
  passwordNew,
) {
  console.log(
    "RedefinePasswordFetch | tokenAuthorization, password, passwordNew: ",
    tokenAuthorization,
    password,
    passwordNew,
  );
  const configRequest = {
    method: "post",
    url: "/users/redefine_password",
    data: {
      password,
      new_password: passwordNew,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log("RedefinePasswordFetch | response.data:", response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("RedefinePasswordFetch | error: ", error);
    let message;
    const expectedStatusCodes = [401];
    if (expectedStatusCodes.includes(error.response.status)) {
      console.log(
        "RedefinePasswordFetch | error.response.data.message:",
        error.response.data.message,
      );
      message = error.response.data.message;
    } else {
      console.log("RedefinePasswordFetch | error:", error.message);
      message =
        "No momento esse recurso está indisponível, tente novamente mais tarde.";
      createExceptionSentry(error, configRequest.method, configRequest.url, {
        ...configRequest.headers,
        ...configRequest.data,
      });
    }
    return {
      isSuccess: false,
      message,
    };
  }
}
