import {Pages} from '../../../../comps/Pages/Pages'
import {Units} from '../../../../comps/Units/Units'
import { revalidateTag } from 'next/cache'


async function anyName(estateID) {
  const allData = 
     await fetch(`http://localhost:5000/units/${estateID}`, 
                            { next: { tags: ['units'] }})
                                            .then((res) => res.json())
      //~ revalidateTag('seeds')
      console.log(fetch)
   const someData = allData.data
   const totalPages = allData.totalPages
  return  {someData, totalPages}
}

  

export default async function UnitList({params}) {
	const {someData, totalPages} = await anyName(params.id)
	//~ console.log(params.id)
	//~ console.log(params)
  return (<>
     
      <Units servData={someData}/>
      <Pages total={totalPages}/>
        </>
  )
}