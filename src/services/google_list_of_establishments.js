import Api from  './api';

const GoogleListOfEstablishmentsService = {
  index: (latitude, longitude) => Api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`)
}

export default GoogleListOfEstablishmentsService;