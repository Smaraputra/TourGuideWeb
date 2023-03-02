export default function urlhost() {
  if(location.host=='sipenguide.artanode.com'){
    return 'https://sipenguideapi.artanode.com'
  }else{
    return 'http://'+location.host
  }
}