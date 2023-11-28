import { getAPICall, postAPICall } from './BaseAPI';

export const getHeaderData = (callback) => {
  getAPICall('price/getheaderdata', callback);
}

export const getTableData = (seasonId, brandId, callback) => {
  getAPICall('price/gettabledata/' + seasonId + '/' + brandId, callback);
}

export const setFree = (group, isFree, callback) => {
  const payload = { group, isFree, };
  postAPICall('price/setfree', payload, callback);
}

export const setPriceData = (groupId, seasonId, brandId, pointId, value, callback) => {
  const payload = {
    groupId,
    seasonId,
    brandId,
    pointId,
    value: value ? value : "",
  };
  postAPICall('price/setpricedata', payload, callback);
}

export const setExtraDay = (group, extraDay, callback) => {
  const payload = { group, extraDay, };
  postAPICall('price/setextraday', payload, callback);
}

export const createGroup = (group, callback) => {
  const payload = { group };
  postAPICall('price/creategroup', payload, callback);
}

export const updateGroup = (oldName, newName, callback) => {
  const payload = { oldName, newName };
  postAPICall('price/updategroup', payload, callback);
}

export const createPricePoint = (duration, durationType, callback) => {
  const payload = { duration, durationType };
  postAPICall('price/addpricepoint', payload, callback);
}

export const deleteGroup = (group, callback) => {
  const payload = { group };
  postAPICall('price/deletegroup', payload, callback);
}

export const deletePricePoint = (pointId, callback) => {
  const payload = { pointId };
  postAPICall('price/deletepricepoint', payload, callback);
}

export const getSeasonsData = (callback) => {
  getAPICall('price/getseasonsdata', callback);
}

export const saveSeasonCell = (id, column, value, callback) => {
  const payload = {id, column, value};
  postAPICall('price/saveseasoncell', payload, callback);
}

export const deleteSeason = (id, callback) => {
  const payload = { id };
  postAPICall('price/deleteseason', payload, callback);
}

export const getBrandsData = (callback) => {
  getAPICall('price/getbrandsdata', callback);
}

export const saveBrandCell = (id, column, value, callback) => {
  const payload = {id, column, value};
  postAPICall('price/savebrandcell', payload, callback);
}

export const deleteBrand = (id, callback) => {
  const payload = { id };
  postAPICall('price/deletebrand', payload, callback);
}