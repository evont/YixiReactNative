const apiPrefix =  'http://192.168.0.102:3000/api/v1';
const _asyncFetch = function(apiUrl, header){
  try {
     let response = new Promise((resolve, reject) => {
      fetch(apiUrl).then(res => {
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

exports.fetchLectureItem = function(id){
  const apiUrl = `${apiPrefix}/lecture/detail/${id}`;
  return _asyncFetch(apiUrl);
}

exports.fetchLecture = function(api_type) {
  const apiUrl = `${apiPrefix}/lecture/list/${api_type}/1/desc`;
  console.log(apiUrl);
  return _asyncFetch(apiUrl);
}
