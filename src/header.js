export const headersProvider = () => {
    let token = null;
    try {
      token = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      // console.log('get token from local storage = ',token)
    } catch (e) {
      console.log(e);
    }
    return {
      Authorization: token,
    };
};

