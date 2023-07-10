/* eslint-disable no-console */
import createExceptionSentry from '../../utils/createExceptionSentry';
import Axios from '../Axios';

export async function SignUpFetch(
  username,
  email,
  password,
) {
  console.log(
    'SignUpFetch | username, email, password: ',
    username,
    email,
    password,
  );
  const configRequest = {
    method: 'post',
    url: '/users/sign_up',
    data: {
      username,
      email,
      password,
    },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SignUpFetch | response', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('SignUpFetch | error:', error);
    let message;
    const expectedStatusCodes = [409];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message = 'No momento esse recurso está indisponível, tente novamente mais tarde.';
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
  console.log('SignInFetch | email, password:', email, password);
  const configRequest = {
    method: 'post',
    url: '/users/sign_in',
    body: { email, password },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SignInFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
      user: {
        ...response.data.user,
        token: response.data.token,
      },
    };
  } catch (error) {
    console.log('SignInFetch | error:', error.message);
    let message;
    const expectedStatusCodes = [401, 404];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message = 'No momento esse recurso está indisponível, tente novamente mais tarde.';
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
  console.log('ForgotPasswordFetch | email: ', email);
  const configRequest = {
    method: 'post',
    url: '/users/forgot_password',
    body: { email },
  };

  try {
    const response = await Axios(configRequest);
    console.log('ForgotPasswordFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('ForgotPasswordFetch | error: ', error);
    let message;
    const expectedStatusCodes = [404];
    if (expectedStatusCodes.includes(error.response.status)) {
      message = error.response.data.message;
    } else {
      message = 'No momento esse recurso está indisponível, tente novamente mais tarde.';
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

export async function ProfileFetch(tokenAuthorization) {
  console.log('ProfileFetch | tokenAuthorization:', tokenAuthorization);
  const configRequest = {
    method: 'get',
    url: '/users/profile',
    headers: { headers: { Authorization: tokenAuthorization } },
  };

  try {
    const response = await Axios[configRequest.method](
      configRequest.url,
      configRequest.headers,
    );
    console.log('ProfileFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      user: response.data.user,
    };
  } catch (error) {
    console.log('ProfileFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      configRequest.headers.headers,
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function ProfileUpdateFetch(
  tokenAuthorization,
  name,
  cpfCnpj,
  birthDate,
  email,
  phone,
  phoneWhatsapp,
  address,
  district,
  city,
  unitFederative,
  cep,
) {
  console.log(
    'ProfileUpdateFetch | tokenAuthorization, name, phone, email, state, city:',
    tokenAuthorization,
    name,
    cpfCnpj,
    birthDate,
    email,
    phone,
    phoneWhatsapp,
    address,
    district,
    city,
    unitFederative,
    cep,
  );
  const configRequest = {
    method: 'patch',
    url: '/users/profile',
    body: {
      name,
      cpf_cnpj: cpfCnpj,
      birth_date: birthDate,
      email,
      phone,
      whatsapp: phoneWhatsapp,
      address,
      district,
      city,
      state: unitFederative,
      cep,
    },
    headers: { headers: { Authorization: tokenAuthorization } },
  };

  try {
    const response = await Axios[configRequest.method](
      configRequest.url,
      configRequest.body,
      configRequest.headers,
    );
    console.log('ProfileUpdateFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('ProfileUpdateFetch | error:', error.message);
    let message;
    if (error.message === 'Request failed with status code 409') {
      message = error.response.data.message;
    } else {
      message = 'No momento esse recurso está indisponível, tente novamente mais tarde.';
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        {
          ...configRequest.headers.headers,
          ...configRequest.body,
        },
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
    'RedefinePasswordFetch | tokenAuthorization, password, passwordNew: ',
    tokenAuthorization,
    password,
    passwordNew,
  );
  const configRequest = {
    method: 'post',
    url: '/users/redefine_password',
    body: {
      password,
      new_password: passwordNew,
    },
    headers: { headers: { Authorization: tokenAuthorization } },
  };

  try {
    const response = await Axios[configRequest.method](
      configRequest.url,
      configRequest.body,
      configRequest.headers,
    );
    console.log('RedefinePasswordFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('RedefinePasswordFetch | error: ', error);
    let message;
    if (error.message === 'Request failed with status code 401') {
      console.log('RedefinePasswordFetch | error.response.data.message:', error.response.data.message);
      message = error.response.data.message;
    } else {
      console.log('RedefinePasswordFetch | error:', error.message);
      message = 'No momento esse recurso está indisponível, tente novamente mais tarde.';
      createExceptionSentry(
        error,
        configRequest.method,
        configRequest.url,
        {
          ...configRequest.headers.headers,
          ...configRequest.body,
        },
      );
    }
    return {
      isSuccess: false,
      message,
    };
  }
}
