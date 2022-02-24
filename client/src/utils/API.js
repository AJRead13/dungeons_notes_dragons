const prefix = 'https://www.dnd5eapi.co/api/';

const getRaceInfo = async (race) => {
  const response = await fetch(`${prefix}/races/${race}`);
  const data = await response.json();
  return data;
}

const getClassInfo = async (charClass) => {
  const response = await fetch(`${prefix}/classes/${charClass}`);
  const data = await response.json();
  return data;
}

module.exports = {
  getRaceInfo,
  getClassInfo
}