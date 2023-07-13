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

export async function SkillByIdFetch(tokenAuthorization, skillID) {
  console.log('SkillByIdFetch | tokenAuthorization, skillID:', tokenAuthorization, skillID);
  const configRequest = {
    method: 'get',
    url: `/skills/skill_by_id/${skillID}`,
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SkillByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      skill: response.data.skill,
    };
  } catch (error) {
    console.log('SkillByIdFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, skillID },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function SkillCreateFetch(tokenAuthorization, name, timeDaily) {
  console.log('SkillCreateFetch | tokenAuthorization, name, timeDaily:', tokenAuthorization, name, timeDaily);
  const configRequest = {
    method: 'post',
    url: '/skills/create_skill',
    data: {
      name,
      time_daily: timeDaily,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SkillCreateFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('SkillCreateFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, ...configRequest.data },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function SkillUpdateByIdFetch(
  tokenAuthorization,
  skillID,
  name,
  timeDaily,
) {
  console.log('SkillUpdateByIdFetch | tokenAuthorization, name, timeDaily:', tokenAuthorization, name, timeDaily);
  const configRequest = {
    method: 'put',
    url: `/skills/update_skill_by_id/${skillID}`,
    data: {
      name,
      time_daily: timeDaily,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SkillUpdateByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('SkillUpdateByIdFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, ...configRequest.data },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function SkillDeleteByIdFetch(tokenAuthorization, skillID) {
  console.log('SkillDeleteByIdFetch | tokenAuthorization, skillID:', tokenAuthorization, skillID);
  const configRequest = {
    method: 'delete',
    url: `/skills/delete_skill_by_id/${skillID}`,
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('SkillDeleteByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('SkillDeleteByIdFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}
