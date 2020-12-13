
//Should import react if it is the index.js page
import React, { Suspense, useState, useEffect } from "react";
//importing necessery components
import fetchUserProfile from './someWhereElse.js'


const SuspensefulUserProfile = ({ userId }) => {
  const [data, setData] = useState({});

  // useEffect(async () => {
  //   fetchUserProfile(userId).then((profile) => setData(profile));
  // });

  //** Issue no. 1: Effect callbacks are synchronous to prevent race conditions. async functions can not be used as a callback of useEffect hook. I think the 'fetchUserProfile' function should be an asynchronous function as it will fetch data from the API endpoint. So we don't actually need an async function in here. If we need to call an async function inside useEffect hook we may do the following:


  useEffect(() => {
    //This is an example of an async function inside the useEffect hook. I would place the function outside of the hook and call it inside though.
    const anAsyncFunction = async () => {
      console.log('This is an async function!')
    }
    anAsyncFunction();

    fetchUserProfile(userId).then((profile) => setData(profile));

    //** Issue no. 2: 'fetchUserProfile' is coming from somewhere else, but it was never imported

    //** Issue no 3: useEffect is used without a dependency array. It's not a good idea to call useEffect hook without an empty or non-empty dependency array. At least a cleanup function is to be called inside the useEffect hook if not using a dependencty array.
  }, []);
  return (
    //** Issue no. 4:  I don't think "Suspense" is somethink I want to use right now. No stable release of React.js supports this feature. If we still want to use Suspense, we should do it correctly. Suspense takes a fallback attribute.

    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile data={data} />
    </Suspense>
  );
};
const UserProfile = ({ data }) => {
  return (
    <>
      <h1>{data.name}</h1>
      <h2>{data.email}</h2>
    </>
  );
};
const UserProfileList = () => (
  //** Issue no. 5: Here if the value of userId is not not an expression, and is just a string or a number, I don't find any reason for putting those curly brackets
  <>
    <SuspensefulUserProfile userId={1} />
    <SuspensefulUserProfile userId={2} />
    <SuspensefulUserProfile userId={3} />
  </>
);


//I suppose this is the index.js file as nothing is exported from this component. So we must include something more

const rootElement = document.getElementById(
  "root"
);
ReactDOM.createRoot(rootElement).render(
  <UserProfileList />
);

//If not we should export 'UserProfileList' so that it can be imported from index.js or from any other components.

export default UserProfileList;
//I'm exporting 'UserProfileList' as default though it is not necessery.

