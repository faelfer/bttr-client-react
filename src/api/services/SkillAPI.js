/* eslint-disable no-console */
import createExceptionSentry from '../../utils/createExceptionSentry';
import Axios from '../Axios';

export async function SkillsByPageFetch(tokenAuthorization, page) {
  console.log('SkillsByPageFetch | tokenAuthorization, page:', tokenAuthorization, page);
  const configRequest = {
    method: 'get',
    url: '/skills/skills_by_page',
    params: { page },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SkillsByPageFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      skills: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.log('SkillsByPageFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, page },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function ProfileFetch(tokenAuthorization) {
  console.log('ProfileFetch | tokenAuthorization:', tokenAuthorization);
  const configRequest = {
    method: 'get',
    url: '/users/profile',
    headers: { Authorization: tokenAuthorization },
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
