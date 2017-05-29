const apiPrefix =  'http://localhost:3000/api/v1';
const _asyncFetch = async function(apiUrl, header){
  try {
    let response = await fetch(apiUrl, header || {});
    return response.json();
  }catch(err){
    console.error(error);
  }
}

exports.fetchHome = function() {
  const apiUrl = `${apiPrefix}/album`;
  return _asyncFetch(apiUrl);
}
