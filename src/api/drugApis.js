import axios from 'axios';

export const getSpellingSuggestions = async (name) => {
  return await axios.get("https://rxnav.nlm.nih.gov/REST/spellingsuggestions", {
    params: {
      name
    }
  }).then(res => {
    return res.data
  })
}

export const getDrugs = async (name) => {
  return await axios.get("https://rxnav.nlm.nih.gov/REST/drugs", {
    params: {
      name
    }
  }).then(res => {
    return res.data
  })
}

export const getNDCs = async (rxcui) => {
  return await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`).then(res => {
    return res.data
  })
}