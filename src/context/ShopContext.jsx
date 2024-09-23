import React, {createContext, useState} from 'react'

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    
    const [open, setOpen] = useState(false)
    const [filterModel, setFilterModel] = useState(false)
    const [catFil, setCatFil] = useState(null);
    const [addToCartDiscount, setAddToCartDiscount] = useState(0);    
        
    return(
        <ShopContext.Provider value={{open, setOpen, filterModel, setFilterModel, catFil, setCatFil, addToCartDiscount, setAddToCartDiscount }}>
            {props.children}
        </ShopContext.Provider>
    )
  
}


export default ShopContextProvider