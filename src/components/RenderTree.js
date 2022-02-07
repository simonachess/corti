import React, {useState} from 'react'
import data from '../data/data'

export default function RenderTree() {

	const [active, setActive] = useState([])
	const [breadcrumbs, setBreadcrumbs] =useState([])
	
	const handleActiveNode = (node, level) =>{
		const copyActive = active.slice(0, level-1)
		const copyBreadcrumb = breadcrumbs.slice(0, level)
		setActive([...copyActive, node.id])
		setBreadcrumbs([...copyBreadcrumb, node.title])
	}

	const handleShowFolders = (title) =>{
		if(!breadcrumbs.includes(title)){
			setBreadcrumbs([...breadcrumbs, title])
		}
	}

	const createMenu = (data, level) => {
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

	const menu = createMenu(data.Documents, 1)

	return (
		<div className='container'>
			<ul className='breadcrumb-container'>
				{breadcrumbs.length > 0 && breadcrumbs.map((breacrumb, i)=>{
					return(
						<li key={i} className='breadcrumb'>{breacrumb}/</li>
					)
				})}
			</ul>
			<p onClick={()=>{handleShowFolders(Object.keys(data)[0])}} className='title'>{Object.keys(data)[0]}</p>
			 <div className={`${breadcrumbs.length > 0 ? "" : "hidden-breadcrumb"}`}>{menu}</div>
		</div>
	)
}