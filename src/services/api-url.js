export default function apiURL() {
  console.log(location.host)
  // return 'http://'+location.host+'/api/'
  if(location.host=='localhost:8080'){
    console.log('http://'+location.host+'/api/')
    return 'http://'+location.host+'/api/'
  }else if(location.host=='sipenguide.artanode.com'){
    return 'https://sipenguideapiapi.artanode.com/api/'
  }
}