'use client'
import React from 'react'
import * as S from './estates.styled'
import Box from '@mui/material/Box';
import {AddEstate} from './AddEstate/AddEstate'
import {SpinZone} from '../../blocks/SpinZone'
//~ import LinearProgress from '@mui/material/LinearProgress';

import {useEstateContext} from '../../context/estates/EstateState'
import {useQueryContext} from '../../context/queries/QueryState'
//~ import {useUserContext} from '../../context/user/UserState'
import {useCartContext} from '../../context/cart/CartState'
import {getSession} from '/lib'
import revalidator from './revalidator'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import AddEstateIcon from '@mui/icons-material/AddHomeWork';
import cookies from 'js-cookie';

import {ECell} from './ECell/ECell'

export function Estates ({userData, servData}){
	
	const pathname = usePathname()
	const router = useRouter()
	
	const [open, setOpen] = React.useState({form: false})
    const [shown, setShown] = React.useState(servData.data)
	const [currItem, setCurrItem] = React.useState({})
	const [staticData, setStaticData] = React.useState(servData)
	//~ console.log(servData)
	//~ const {userData} = useUserContext()
	const {cartItems, addToCart} = useCartContext()
	
	const {fetchEstates, loadingEstates, estates, 
		   removeEstate, resetEstates, setEstates} = useEstateContext()
  	               
	const {state, category} = useQueryContext()
	
	const propertyOwner =(id)=> userData.user && (userData.user._id === id)
	const owner = userData.role && userData.role === 'Owner'
	const admin = userData.role && userData.role === 'Admin'
	console.log(owner)
	
	
	const handAdd =(e, s)=> {e.preventDefault();addToCart(s);}
	
	const handEdit =(e, s)=> {e.preventDefault(); 
		                      setCurrItem(s);setOpen({...open, form: true})}
		                      
    const onMenu = () => {router.push('/'); resetEstates()}
	const showOptions =()=>{setOpen({...open, options: !open.options});}
	
                       
	function deleteEstate(e, id){
		e.preventDefault();
		removeEstate(id).then(()=>{alert('Estate has been deleted.')
			                              fetchEstates(state)})
		
		revalidator()
		}	
		
   React.useEffect(()=>{
	                    //~ if(!estates.data){setEstates(servData.servData)}
	                    if(estates.data)setShown(estates.data)
	                    
	                  },[estates.data])
       
       //~ console.log(userData)
return (<S.Container>
      <S.ListButts>
       {admin||owner &&      
			 <S.AddAdmin onClick={()=>setOpen({...open, form: true})}>
			                   <AddEstateIcon fontSize='large'/> </S.AddAdmin>}
	  <S.Title>Estates</S.Title>
       {open.form &&
		     <AddEstate setOpen={setOpen} 
		                currItem={currItem}
		                setCurrItem={setCurrItem}
		               />} 
            
      </S.ListButts> 
         
     
		               
	   {loadingEstates &&  <S.SpinCont><S.Spinner/></S.SpinCont>}
       {shown && shown.length>0 && !loadingEstates && <S.List>
          
          
         {shown.map(item => 
		   <ECell key={item._id} item={item} open={open}
			      showOptions={showOptions} owner={propertyOwner} 
			      admin={admin} 
			      handEdit={handEdit} handAdd={handAdd} 
			      deleteEstate={deleteEstate}/>)}       
        </S.List>}
        
         {!shown.length&&<S.NoData>No products found for this request</S.NoData>}
         
       </S.Container>)
} 
