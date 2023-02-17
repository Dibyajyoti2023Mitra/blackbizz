import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

const BASE_URL = "http://142.93.55.214:3089/api/v1/admin/";
// async function requestData(url, method, params = null) {
//   let token = "";
//   let user = reactLocalStorage.getObject("userData");
//   if (user && user != null && Object.keys(user).length > 0) {
//     token = user.token;
//   }
//   // console.log("token",userdata.token);
//   // let bash_url = 'http://api.vintagebazaar.in/api/';
//   // let bash_url = "http://127.0.0.1:3030/api/";
//   let bash_url = "http://13.127.101.102:5008/v1/user/";
//   let apiUrl = bash_url + url;
//   console.log("Url " + method, apiUrl);
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   // myHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:3030");
//   myHeaders.append("Access-Control-Allow-Origin", "http://13.127.101.102:5008");
//   if (token != "") {
//     myHeaders.append("authorization", token);
//   }
//   myHeaders.append("userType", "Admin");
//   const options = {
//     method: method,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   };
//   if (method === "DELETE") {
//     // options['body'] = none;
//   } else if (method !== "GET") {
//     options["body"] = JSON.stringify(params);
//   }
//   return await fetch(apiUrl, options)
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         // console.log("result", result);
//         return result;
//       },
//       (error) => {
//         // this.setState({ error });
//       }
//     );
// }

async function requestData(url, method, params = {}) {
  let token = "";
  let user = reactLocalStorage.getObject("userData");
  if (user && user != null && Object.keys(user).length > 0) {
    token = user.token;
  }
  let apiUrl = BASE_URL + url;
  var myHeaders = new Headers();
  if (token != "") {
    myHeaders.append("authorization", token);
  }
  myHeaders.append("userType", "Admin");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "http://142.93.55.214:3089");
  var raw = JSON.stringify(params);

  var requestOptions = {};
  if (method == "POST") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  } else if (method == "PUT") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  } else {
    requestOptions = {
      method: method,
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };
  }

  return await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
}

async function fileUplodeDynamic(
  url,
  method,
  file,
  // object_get = {},
  tokenCustom = null
) {
  let bash_url = "http://142.93.55.214:3089/api/v1/admin/";
  let apiUrl = bash_url + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });

  let headers = {
    // 'Accept': 'application/json',
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "http://142.93.55.214:3089",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  for (var pair of file.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  return await fetch(apiUrl, {
    method: "POST",
    body: file,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then(
      (result) => {
        // console.log(result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

async function fileUplode(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let token = "";
  let user = reactLocalStorage.getObject("userData");
  if (user && user != null && Object.keys(user).length > 0) {
    token = user.token;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });
  if (token != "") {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: "Admin",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  // for (var pair of file.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: "follow",
    headers: headers,
  })
    .then((response) => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      (result) => {
        // console.log(result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

// async function fileUplode(
//   url,
//   method,
//   file,
//   option,
//   object_get = {},
//   tokenCustom = null
// ) {
//   let token = "";
//   let user = reactLocalStorage.getObject("userData");
//   if (user && user != null && Object.keys(user).length > 0) {
//     token = user.token;
//   }
//   let bash_url = "http://13.127.101.102:5008/v1/user/";
//   let apiUrl = bash_url + url;
//   const data = new FormData();
//   if (option == "Single") {
//     data.append("image", file);
//   } else {
//     let i = 0;
//     Object.keys(file).forEach(function (key) {
//       data.append("image", file[i]);
//       i++;
//     });
//   }

//   Object.keys(object_get).forEach(function (key) {
//     let ddd = object_get[key];
//     if (key == "dynamic_fields") {
//       ddd = JSON.stringify(object_get[key]);
//     }
//     console.log(key, ddd);
//     data.append(key, ddd);
//   });

//   // for (var pair of data.entries()) {
//   //     console.log(pair[0]+ ', ' + pair[1]);
//   // }

//   // console.log('data',data);
//   if (token != "") {
//    var toooo=token;
//   }
//   let headers = {
//     // 'Accept': 'application/json',
//     // 'Content-Type': 'multipart/form-data',
//     "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
//     "userType":"Admin",
//     "authorization":toooo

//     // 'Authorization': 'Bearer ' + login_status,
//   };
//   console.log("data", data);

//   return await fetch(apiUrl, {
//     method: method,
//     headers: headers,
//     body: data,
//   })
//     .then((response) => response.json())
//     .then(
//       (result) => {
//         console.log(result);
//         return result;
//       },
//       (error) => {
//         return error;
//       }
//     );
// }

async function newFileUpload(url, file, object_get) {
  // let bash_url = "http://127.0.0.1:3030/api/";
  let bash_url = "http://13.127.101.102:5011/api/v1/";

  let apiUrl = bash_url + url;

  const data = new FormData();
  if (typeof file == "string") {
    data.append("image", {
      uri: String(file),
      type: "image/jpeg",
      name: "filename.jpg",
    });
  } else {
    data.append("image", file);
  }
  for (var pair of data.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  console.log("file", file);
  Object.keys(object_get).forEach(function (key) {
    let ddd = object_get[key];
    console.log(key, ddd);
    data.append(key, ddd);
  });

  var requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  return await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

async function newFileCropUpload(url, file, object_get) {
  let bash_url = "https://admin.jd3tv.com/api/";
  // let bash_url = "http://127.0.0.1:3030/api/";

  let apiUrl = bash_url + url;

  const data = new FormData();
  data.append("image", {
    uri: file,
    type: "image/jpeg",
    name: "filename.jpg",
  });

  var requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  return await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

async function videoUpload(url, file, object_get) {
  let bash_url = "https://admin.jd3tv.com/api/";

  let apiUrl = bash_url + url;
  console.log("file", file);
  const data = new FormData();
  // // data.append("video", fileInput.files[0], "Mumbai ka secret haath laga _ RCB vs RR _ Pre match chat.mp4");
  data.append("video", file);

  var requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  return await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

async function uploadFileRequest(url, file, callback) {
  const BASE_URL = "https://admin.jd3tv.com/api/";
  var cancelToken = Axios.CancelToken;
  var source = cancelToken.source();
  let apiUrl = BASE_URL + url;

  const data = new FormData();
  data.append("video", file);

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
      callback(percentCompleted, null, null);
    },
    cancelToken: source.token,
  };

  return await Axios.post(apiUrl, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      callback(null, null, error);
    });
}

const getOriginalname = async (data, extn) => {
  let arr = data.split("/");
  let lent = Number(arr.length - 1);
  // console.log("arr[lent]", extn)
  if (!arr[lent].match(/.(jpg|jpeg|png|gif|pdf|csv|plainText|zip)$/i)) {
    return arr[lent] + "." + extn.substring(extn.lastIndexOf("/") + 1);
  } else {
    return arr[lent];
  }
};

export default {
  requestData,
  fileUplode,
  newFileUpload,
  newFileCropUpload,
  videoUpload,
  uploadFileRequest,
  fileUplodeDynamic,
  // get,
  // post,
  // put,
  // // delete,
  // upload,
};
