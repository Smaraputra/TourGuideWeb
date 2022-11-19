export default function fileHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return {
      Authorization: "Bearer " + user.jwt,
      "content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":"HEAD,GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":"*",
    };
  } else {
    return {};
  }
}
