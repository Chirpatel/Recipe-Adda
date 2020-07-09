import axios from 'axios';
export const Recipe = async({query})=>{
    var config = {
        url: `https://yummly2.p.rapidapi.com/feeds/search?q=${query}&start=0`,
        headers: { 
          'x-rapidapi-host': 'yummly2.p.rapidapi.com', 
          'x-rapidapi-key': `${process.env.REACT_APP_SECRET_KEY}`, 
          'useQueryString': 'true'
        }
      };
      var data;
      await axios(config)
      .then(function (response) {
        data = response.data;
        //console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
      return data;
}
