import React from 'react'

import {jwtDecode} from 'jwt-decode'
import * as S from './auth-panel.styled'
import {useRouter} from 'next/navigation'
import {logOut} from '/lib'
import cookies from 'js-cookie';


//~ import {useUserContext} from '../../../context/user/UserState'
 
export function AuthPanel({userData}){
 const r = useRouter()

 //~ const {setFromStorage, signIn,
	    //~ signUp, error, clearError} =  useUserContext()

   const onLogin = () => r.push('/auth') 
    
		console.log(userData)
     React.useEffect(()=>{
	              let token
	        	if(userData)token = userData.token
	        	if(token){

	        		const decodedToken = jwtDecode(token)
                    
	        		if(decodedToken.exp * 999.999 < new Date().getTime()){
	        		 logOut()
	        		 alert('Token has expired')
	              }
	        	}
	        	//~ const interval = setInterval(()=>{setUpdate(update+1);
					                           
					                                       //~ },10000)
	        	//~ if(!token){clearInterval(interval);setUpdate(0);}
	        	//~ return () => clearInterval(interval);
	                     },[userData, logOut, r])
	     
	  //~ console.log(userData)
	    return <>
	    <S.Name>{userData.user?userData.user.name:'Guest'}</S.Name>
	    {userData.user
			?<S.LogBut className='styledLink'
			           onClick={()=>logOut()}>{'Log Out'}</S.LogBut>
						             
			:<S.LogBut onClick={()=>onLogin()}>{'Log In'}</S.LogBut>}
		 </>
		}
