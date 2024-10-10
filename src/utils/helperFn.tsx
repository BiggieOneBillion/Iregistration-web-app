// interface IError {
//   response?: {
//     data: {
//       message: string;
//     };
//   };
//   request?: object;
// }

// export const handleError = (error:IError) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     toast({
//       position: "top",
//       status: "error",
//       title: "Sign-In Failed",
//       description: error?.response?.data.message,
//     });
//   } else if (error.request) {
//     // The request was made but no response was received
//     toast({
//       position: "top",
//       status: "error",
//       title: "Sign-In Failed",
//       description: "Network Error,  Please check your internet connection",
//     });
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     toast({
//       position: "top",
//       status: "error",
//       title: "Sign-In Failed",
//       description: "Our Fault, Please try again later ",
//     });
//   }
// };
