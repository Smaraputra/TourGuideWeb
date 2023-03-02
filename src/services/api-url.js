export default function apiURL() {
  // return 'http://'+location.host+'/api/'
  if(location.host=='sipenguide.artanode.com'){
    return 'https://sipenguideapi.artanode.com/api/'
  }else{
    return 'http://'+location.host+'/api/'
  }
}