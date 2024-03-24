const CatchAPI = async (PromiseFn)=>{
    let result = {
        data: null,
        error: null,
    }
    await Promise.resolve(PromiseFn)
    .then(res=>{
        result.data = res.data;
    })
    .catch(err=>{
        result.error = err?.response?.data || {
            msg: err?.message,
        } 
    })

}
export default CatchAPI;