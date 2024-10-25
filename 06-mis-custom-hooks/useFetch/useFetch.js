import { useEffect, useState } from "react";

const localCache = {

   // 'https://pokeapi.co/api/v2/pokemon/1': { name: 'bulbasaur', info },


};

export const useFetch = ( url ) => {

   const [state, setState] = useState({
      data: null,
      loading: true,
      hasError: false,
      error: null
   });

   useEffect(() => {
     getFetch();
   }, [url]);

   const setLoadingState = () => {
      setState({
         data: null,
         loading: true,
         hasError: false,
         error: null
      });
   };


   const getFetch = async() => {

      if ( localCache[url] ) {
         console.log('Usando cache');
         
         setState({
            data: localCache[url],
            loading: false,
            hasError: false,
            error: null
         });
         
         return;
      }

      setLoadingState();

      const resp = await fetch( url );

      await new Promise( resolve => setTimeout(resolve, 800) );

      if ( !resp.ok ) {
         setState({
            data: null,
            loading: false,
            hasError: true,
            error: {
               code: resp.status,
               message: resp.statusText
            }
         });
         return;
      }
      const data = await resp.json();

      setState({
         data,
         loading: false,
         hasError: false,
         error: null,
      });

      localCache[url] = data;
      
   };
   

  return {
   data: state.data,
   isLoading: state.loading,
   hasError: state.hasError,
  };

};
