
export default function Home() { 
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const startOAuth = () => {
  //   setLoading(true);
  //   window.location.href = '/api/auth/linkedin';
  //   setLoading(false);
  // };

    // useEffect(()=>{

    //   const fun = async()=>{
    //     try {
    //       const accessToken = await getAccessToken("linkedin_access_token");
    //       console.log(accessToken.value);
    //   } catch (error) {
    //       console.log("Use Effect Error:_",error);
    //   }
    //   }

    //   fun();
      
    // },[loading])


  return (
    <div className="homeContainer">
      <h1>Home</h1>
      {/* <button onClick={startOAuth}>Sign in with LinkedIn</button> */}

      {/* {loading && <p>Loading user data...</p>}
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )} */}
      {/* <DashboardContainer/> */}
    </div>
  );
}
