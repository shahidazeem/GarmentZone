const setEmail = (email)=>{
    localStorage.setItem("garment:email", email);
}

const getEmail = ()=>{
    return localStorage.getItem("garment:email");
}
const setUser = (data)=>{
    try{
        let stringData = JSON.stringify(data);
        localStorage.setItem("garment:user", stringData);
    } catch(err){

    }
}

const getUser = ()=>{
        try {
          let data = localStorage.getItem("garment:user");
          if(data){
              return JSON.parse(data);
          } 
          return null;
        } catch (err) {
            return null;
        }
}

const localStorageManager = {
    setEmail,
    getEmail,
    getUser,
    setUser,
}

export default localStorageManager;