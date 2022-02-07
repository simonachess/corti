const data = 
			{
				Documents: 
						[
							{
								id: "1",
								title: 'Folder 1',
								nodes:	
									[
										{
											id: "11",
											title:'Subfolder 1A'
										}, 
										{
											id: "12",
											title:'Subfolder 1B', 
											nodes:
												[
													{
														id: "121",
														title: 'Subfolder 1B-1'
													}
												]
										}
									]	
							},
							{
								id: "2",
								title: 'Folder 2',
								nodes:	
								[
									{
										id: "21",
										title:'Subfolder 2A'
									}, 
									{
										id: "22",
										title:'Subfolder 2B', 
									},
									{
										id: "23",
										title:'Subfolder 2C', 
									}
								]	
							},
							{
								id: "3",
								title: 'Folder 3',
							},
					]
			}


export default data;