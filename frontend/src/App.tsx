/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import LoadingSpinner from './components/loader/LoadingSpinner';
import { checkSessionValidation } from './util/util';
import './App.scss';
import { User } from './@types';

const App : FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [sessionExpiryDate, setSessionExpiryDate] = useState<string>();
  const [sessionCreationDate, setSessionCreationDate] = useState<string>();

  // Get the method from the backend to query
  const appContextInstance = useContext(AppContext);


  // Query the backend to see if we're logged in
  useEffect(() => {

    // Get user details if the user is authenticated from the backend
    const getUserDetails = async (userId : string) => {

      // Perform the fetch request using GraphQL in order to get the user details on the main app page
      // Note: Please convert your id to an objectId in the backend
      const response = await fetch(`/graphql/auth`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            Accept: "application/json", 
        },
        body : JSON.stringify({
          query :`
            query PostUserDetailsResponse($_id : String!, $token : String!){
              PostUserDetailsResponse(_id : $_id, token : $token){
                user {
                  _id
                  name
                  email
                  password
                  confirmPassword
                  status
                  posts
                }
                sessionCreated
                sessionExpires
                }
              }
            `,
            variables : {
              _id : userId,
              token : appContextInstance?.token ?? ""
            }
        })
      });

      // Get the result from the endpoint
      const { data : { PostUserDetailsResponse : { sessionCreated, sessionExpires, user } } } = await response.json();

      // Set the user details so 
      setUser(user);
      setSessionExpiryDate(sessionExpires);
      setSessionCreationDate(sessionCreated);

    };

    const fetchAuthentication = async () => {

      try {

        appContextInstance?.validateAuthentication();

        (appContextInstance?.userAuthenticated === true && appContextInstance.userId) && getUserDetails(appContextInstance.userId);

        (appContextInstance?.userAuthenticated === true && appContextInstance.userId && appContextInstance.token) 
          && checkSessionValidation(appContextInstance.userId, appContextInstance.token);

      }catch(error){

        console.log("Error: User could not be validated");
        console.error(error);
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
        !isLoading && appContextInstance?.userAuthenticated && user &&
        <div className="app__content">
          <h1 className="app__title">{`Welcome ${user?.name}`}</h1>
          <p className="app__text">{`Current status : ${user?.status}`}</p>
          <p className="app__text">{`Email address : ${user?.email}`}</p>
          <p className="app__text">{`Session created : ${sessionCreationDate}`}</p>
          <p className="app__text">{`Session expires : ${sessionExpiryDate}`}</p>
        </div>
      }

    </div>
  );
}

export default App;
