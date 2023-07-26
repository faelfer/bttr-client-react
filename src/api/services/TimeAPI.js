/* eslint-disable no-console */
import createExceptionSentry from '../../utils/createExceptionSentry';
import Axios from '../Axios';

export async function TimesByPageFetch(tokenAuthorization, page) {
  console.log('TimesByPageFetch | tokenAuthorization, page:', tokenAuthorization, page);
  const configRequest = {
    method: 'get',
    url: '/times/times_by_page',
    params: { page },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimesByPageFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      times: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.log('TimesByPageFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, page },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
      times: [],
      count: 0,
    };
  }
}

export async function TimeByIdFetch(tokenAuthorization, timeID) {
  console.log('TimeByIdFetch | tokenAuthorization, timeID:', tokenAuthorization, timeID);
  const configRequest = {
    method: 'get',
    url: `/times/time_by_id/${timeID}`,
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimeByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      time: response.data.time,
    };
  } catch (error) {
    console.log('TimeByIdFetch | error:', error.message);
    createExceptionSentry(
      error,
      configRequest.method,
      configRequest.url,
      { ...configRequest.headers, timeID },
    );

    return {
      isSuccess: false,
      message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
    };
  }
}

export async function TimeCreateFetch(tokenAuthorization, skillID, minutes) {
  console.log('TimeCreateFetch | tokenAuthorization, skillID, minutes:', tokenAuthorization, skillID, minutes);
  const configRequest = {
    method: 'post',
    url: '/times/create_time',
    data: {
      skill_id: skillID,
      minutes,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimeCreateFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('TimeCreateFetch | error:', error.message);
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

export async function TimeUpdateByIdFetch(
  tokenAuthorization,
  timeID,
  skillID,
  minutes,
) {
  console.log(
    'TimeUpdateByIdFetch | tokenAuthorization, skillID, minutes:',
    tokenAuthorization,
    timeID,
    skillID,
    minutes,
  );
  const configRequest = {
    method: 'put',
    url: `/times/update_time_by_id/${timeID}`,
    data: {
      skill_id: skillID,
      minutes,
    },
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimeUpdateByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('TimeUpdateByIdFetch | error:', error.message);
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

export async function TimeDeleteByIdFetch(tokenAuthorization, timeID) {
  console.log('TimeDeleteByIdFetch | tokenAuthorization, timeID:', tokenAuthorization, timeID);
  const configRequest = {
    method: 'delete',
    url: `/times/delete_time_by_id/${timeID}`,
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimeDeleteByIdFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log('TimeDeleteByIdFetch | error:', error.message);
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

export async function TimesByDateFetch(
  tokenAuthorization,
  skillID,
  firstDayDatetimeToFilter,
  lastDayDatetimeToFilter,
) {
  console.log(
    'TimesByDateFetch | tokenAuthorization, skillID, firstDayDatetimeToFilter, lastDayDatetimeToFilter: ',
    tokenAuthorization,
    skillID,
    firstDayDatetimeToFilter,
    lastDayDatetimeToFilter,
  );
  const configRequest = {
    method: 'get',
    url: `/times/times_by_date?date_initial=${firstDayDatetimeToFilter}&date_final=${lastDayDatetimeToFilter}&skill_id=${skillID}`,
    headers: { Authorization: tokenAuthorization },
  };

  try {
    const response = await Axios(configRequest);
    console.log('TimesByDateFetch | response.data:', response.data);
    return {
      isSuccess: true,
      message: '',
      times: response.data.times,
    };
  } catch (error) {
    console.log('TimesByDateFetch | error:', error.message);
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
