const apiPrefix =  'http://api.yixi.tv/api/v1/';

exports.fetchHome = function() {
  let result = fetch(apiPrefix + 'album')
       .then( res => res.json() )
       .then( data => result);
  alert(result);
  return result;
}
