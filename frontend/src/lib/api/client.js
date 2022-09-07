import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';


const options = {
  ignoreHeaders: true,
  withCredentials: true
};

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://react-rails-library.herokuapp.com/api/v1'
  }),
 options
);
