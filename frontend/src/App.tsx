/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import LoadingSpinner from './components/loader/LoadingSpinner';
import './App.scss';
import { User } from './@types';

const App : FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  // Get the method from the backend to query
  const appContextInstance = useContext(AppContext);

  // Get user details if the user is authenticated from the backend
  const getUserDetails = async (userId : string) => {

    // We assign Formdata here so we can use this with cors in the backend
    const fields = new FormData();
    fields.append("userId", userId);
    fields.append("token", appContextInstance?.token ? appContextInstance.token : "");

    const result = await fetch(`http://localhost:4000/user/${userId}`, {
      method : "POST",
      body : fields
    });

    const data = await result.json();

    // Set the user details so 
    setUser(data.user);
  };

  // Query the backend to see if we're logged in
  useEffect(() => {

    const fetchAuthentication = async () => {

      try {

        appContextInstance?.validateAuthentication();
        (appContextInstance?.userAuthenticated === true && appContextInstance.userId) && getUserDetails(appContextInstance.userId);

      }catch(error){

        console.log("Request failed");
        console.log(error);
      }

      // We have a response so we're not loading data anymore
      setIsLoading(false);
    };

    fetchAuthentication();

  },[appContextInstance]);

  return (
    <div className="app">

      {
        isLoading && 
        <LoadingSpinner/>
      }

      {
        !isLoading && appContextInstance?.userAuthenticated &&
        <div className="app__content">
          <h1 className="app__title">{`Welcome ${user?.name}`}</h1>
          <p className="app__text">{`Current status : ${user?.status}`}</p>
          <p className="app__text">{`Email address : ${user?.email}`}</p>
        </div>
      }

    </div>
  );
}

export default App;
