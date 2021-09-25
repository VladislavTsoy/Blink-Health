import axios from 'axios';
import cogoToast from 'cogo-toast';

export const getSpellingSuggestions = async (name) => {
  return await axios.get("https://rxnav.nlm.nih.gov/REST/spellingsuggestions", {
    params: {
      name
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    cogoToast.error(<div>{err.message}</div>, { position: "top-right" });
  })
}

export const getDrugs = async (name) => {
  return await axios.get("https://rxnav.nlm.nih.gov/REST/drugs", {
    params: {
      name
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    cogoToast.error(<div>{err.message}</div>, { position: "top-right" });
  })
}

export const getNDCs = async (rxcui) => {
  return await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`).then(res => {
    return res.data
  }).catch(err => {
    cogoToast.error(<div>{err.message}</div>, { position: "top-right" });
  })
}