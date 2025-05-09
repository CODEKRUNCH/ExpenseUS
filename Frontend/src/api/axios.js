import axios from 'axios';
  axios.get('http://127.0.0.1:8000/api/sayless')
  .then(response=>{
    console.log('API Response:',response.data);
  })
  .catch(error=>{
    console.error('there was an error! ',error);
  })

export default axiosInstance;