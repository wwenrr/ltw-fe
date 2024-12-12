const createStore = () => {
    let data = null;
  
    const setData = (next) => {
      data = next;
    };
  
    const getData = () => {
      return data;
    };
  
    return { setData, getData };
  };
  
  export const store = createStore();
  