const Test = () => {
  const handleTest = async () => {
    // setAuthorizationToken();
    // try {
    //   const headers = setAuthorizationToken();
    //   console.log(headers);
    //   const response = await newRequest
    //     .get("/test1", { headers })
    //     .then((res) => res);
    //   console.log(response);
    //   const requestHeaders = response.config.headers.Authorization;
    //   console.log("Request Headers:", requestHeaders);
    //   const responseHeaders = response.headers;
    //   console.log("Response Headers:", responseHeaders);
    // } catch (error) {
    //   console.log("test-error");
    // }
  };

  return (
    <>
      <button onClick={() => handleTest()}>test</button>
    </>
  );
};

export default Test;
