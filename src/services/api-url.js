export default function apiURL() {
  // console.log('http://'+location.host+'/api/')
  // return 'http://'+location.host+'/api/'
  if(location.host=='localhost'){
    return 'http://'+location.host+'/api/'
  }else if(location.host=='https://sipenguide.artanode.com/'){
    return 'https://sipenguideapiapi.artanode.com/api/'
  }
}