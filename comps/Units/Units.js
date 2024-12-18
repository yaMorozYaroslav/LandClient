'use client'
import React from 'react'
import * as S from './units.styled'
import Box from '@mui/material/Box';
import {AddUnit} from './AddUnit/AddUnit'
import {SpinZone} from '../../blocks/SpinZone'
//~ import LinearProgress from '@mui/material/LinearProgress';

import {useUnitContext} from '/context/units/UnitState'
import {useQueryContext} from '/context/queries/QueryState'
import {useUserContext} from '/context/user/UserState'

import revalidator from './revalidator'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { useParams } from 'next/navigation'

import {UCell} from './UCell/UCell'
import AddHomeIcon from '@mui/icons-material/AddHome';

export function Units({userData, servData, estate}){
	//~ console.log(userData)
	
	const pathname = usePathname()
	const router = useRouter()
	const params = useParams()
	
	const [open, setOpen] = React.useState({form: false})
    const [shown, setShown] = React.useState(servData||[])
	const [currItem, setCurrItem] = React.useState({})
	const [staticData, setStaticData] = React.useState(servData)
	
	const {fetchEstateUnits, loadingUnits, units, 
		               removeUnit, resetUnits} = useUnitContext()
		               
	const {state, category} = useQueryContext()
	
	
	
	const creator = userData.email && (userData.email.address === estate.owner)
	console.log(userData.email)
	const admin = userData && userData.role === 'admin'
	
	
	const handEdit =(e, s)=> {e.preventDefault(); 
		                      setCurrItem(s);setOpen({...open, form: true})}
		                      
    const onMenu = () => {router.push('/'); resetUnits()}
	const showOptions =()=>{setOpen({...open, options: !open.options});}
	
                       
	function deleteUnit(e, id){
		e.preventDefault();
		removeUnit(id)
		revalidator()
		setTimeout(()=>{fetchEstateUnits({'estateID': params.id,
									      'page': state.page})},500)
		}	

   React.useEffect(()=>{ if(units.data){setShown(units.data)}
	                  },[ units])
       
return (<S.Container>
      <S.ListButts>
       {open.form &&
		     <AddUnit setOpen={setOpen} 
		                currItem={currItem}
		                setCurrItem={setCurrItem}
		               />} 
        {creator &&       
			<S.AddAdmin onClick={()=>setOpen({...open, form: true})}>
			                   <AddHomeIcon fontSize='large'/> </S.AddAdmin>}
             <S.Title>Units</S.Title>
     <S.NotLink onClick={()=>onMenu()}>
                                 <SpinZone> Menu </SpinZone></S.NotLink> 
                                      
     <S.NotEstate onClick={()=>router.push(`/estate/${params.id}`)}>
                                 <SpinZone>Estate</SpinZone></S.NotEstate>      
      </S.ListButts> 
         
     
		               
	   {loadingUnits &&  <S.SpinCont><S.Spinner/></S.SpinCont>}
       {shown && shown.length>0 && !loadingUnits && <S.List>
          
          
         {shown.map(item => 
		   <UCell key={item._id} item={item} open={open}
			     showOptions={showOptions} creator={creator} 
			     admin={admin} 
			     handEdit={handEdit} 
			     deleteUnit={deleteUnit}/>)}       
        </S.List>}
        
         {!shown.length&&<S.NoData>No products found for this request</S.NoData>}
         
       </S.Container>)
} 
