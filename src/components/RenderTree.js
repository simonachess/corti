import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function RenderTree() {

	const [fetchedData, setFetchedData] = useState([])
	const [active, setActive] = useState([])
	const [breadcrumbs, setBreadcrumbs] =useState([])
	
	useEffect(()=>{
		const getData = async()=>{
			try{
				const response = await axios.get('https://run.mocky.io/v3/cb495939-3cfd-48af-9a21-041d4a78c49e');
				console.log(response.data)
				setFetchedData(response.data)
			}
			catch(err){
				console.log("Error",err)
			}
		}
		getData();
	},[])
	
	const handleActiveNode = (node, level) =>{
		const copyActive = active.slice(0, level-1)
		const copyBreadcrumb = breadcrumbs.slice(0,level)
		setActive([...copyActive, node.id])
		setBreadcrumbs([...copyBreadcrumb, node.title])
	}

	const handleShowFolders = (title) =>{
		if(!breadcrumbs.includes(title)){
			setBreadcrumbs([...breadcrumbs, title])
		}
	}

	const createMenu = (data, level) => {
		console.log('data',data)
		return (
			<ul>
				{data?.map((node, i) => {
					return (
						<li key={i} className='node'>
							<div onClick={()=>handleActiveNode(node, level)} >{node.title}</div>
							{node.nodes?.length > 0 && 
								<div className={`${active.includes(node.id) ? "" : "hidden-levels"}`}>{createMenu(node.nodes, level+1)}</div>}
								
						</li>
					)})}
			</ul>
		)
	}

	const menu = createMenu(fetchedData.Documents, 1)

	return (
		<div className='container'>
			<ul className='breadcrumb-container'>
				{breadcrumbs.length > 0 && breadcrumbs.map((breacrumb, i)=>{
					return(
						<li key={i} className='breadcrumb'>{breacrumb}/</li>
					)
				})}
			</ul>
			<p onClick={()=>{handleShowFolders(Object.keys(fetchedData)[0])}} className='title'>{Object.keys(fetchedData)[0]}</p>
			 <div className={`${breadcrumbs.length > 0 ? "" : "hidden-breadcrumb"}`}>{menu}</div>
		</div>
	)
}
