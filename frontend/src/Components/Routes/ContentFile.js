import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../Inventory/AllProducts/Products';
import Edit from '../Inventory/AllProducts/EditProduct/Edit';
import LinaerStepper from '../Inventory/AllProducts/NewProduct/Steeper';
 export default function ContentFile() {
  return (
        <>
            <Routes>
                <Route path='/'>

                    <Route path='/products/newproduct' element={<LinaerStepper/>}/>
                    <Route index  element={<Products />}/>
                    <Route path='/products/edit' element={<Edit />}/>
                </Route>
            </Routes> 
        </>
  )
}
