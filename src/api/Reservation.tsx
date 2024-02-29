import { basePostAPICall, getAPICall, postAPICall } from './BaseAPI';

export const verifyQauntity = async (payload, callback) => {
  return await postAPICall('reservation/verifyquantity', payload, callback);
};

export const createReservation = (payload, callback) => {
  postAPICall('reservations/createreservation', payload, callback);
};

export const getReservationsData = (callback) => {
  getAPICall('reservations/getreservationsdata/', callback);
}

export const getReservationDetail = (id, callback) => {
  getAPICall('reservations/getreservationdetails/' + id, callback);
}

export const updateReservation = (payload, callback) => {
  postAPICall('reservations/updatereservation', payload, callback);
};

export const deleteReservationItem = (payload, callback) => {
  postAPICall('reservation/removereservationitem', payload, callback);
};

export const createTransaction = (payload, callback) => {
  postAPICall('reservation/createtransaction', payload, callback);
};

export const  getTransactionsData= (payload, callback) => {
  postAPICall('reservation/gettransactionsdata/', payload, callback);
}