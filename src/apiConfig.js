export const getApiUrl = () => {
    if (window.location.href.includes('localhost')) {
      return  'http://localhost:3000/api';
    } else {
      return process.env.REACT_APP_API_URL;
    }
  };