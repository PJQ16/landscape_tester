const config = {
     /*    urlApi:'http://localhost:3084', */
       /*  urlApi:'https://netzero.erdi.cmu.ac.th', */
          urlApi:'http://10.110.23.11:3084', 
        token_name:'pos_token',
        headers:() => {
                return{
                headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('pos_token')
                         }
                }
        }
}
export default config;