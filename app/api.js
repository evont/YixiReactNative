const apiPrefix =  'http://localhost:3000/api/v1';
const _asyncFetch = function(apiUrl, header){
  try {
     let response = new Promise((resolve, reject) => {
      fetch(apiUrl, header || {}).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            reject('服务器繁忙，请稍后再试；\r\nCode:' + res.status)
        }
      }).then(
        data => {
          if (data && data.res === 0) {
              resolve(data)
          } else {
              reject(data.msg)
          }
        }
      ).catch((err)=> {
          resolve({})
      })
     })
     return response;
  }catch(err){
    console.error(error);
  }
}

exports.fetchHome = function() {
  const apiUrl = `${apiPrefix}/album`;
  return _asyncFetch(apiUrl);
}
