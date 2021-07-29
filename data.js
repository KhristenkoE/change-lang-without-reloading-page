const getData = async (tag) => {
  const response = await fetch(`https://muteit-web-multi-language-db.maximlitvinov.workers.dev/?tag=${tag || ''}`);
  return await response.json();
};
