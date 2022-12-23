import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { BarChart, Bar, CartesianGrid, Legend,XAxis, YAxis } from 'recharts';
import './index.css'

const App = () => {

  let actualData = {}
  const [daaa,setDaaa] = useState([])
  const [fetcher,setFetcher] = useState({fetch: "popular",order: "desc"})
  async function getData(){
    const url = `https://api.stackexchange.com/2.3/tags?order=${fetcher.order}&sort=${fetcher.fetch}&site=stackoverflow`
    const response = await fetch(url);
    var data = await response.json();
    //console.log(data.items)
     actualData = data.items.map(node =>{
      return {
        name: node.name,
        count: node.count
        
      }
    
      
    
    })
    const temp = JSON.stringify(actualData)
    
    
    await setDaaa(actualData);
    console.log(daaa)
}

function handleChange(event){
  setFetcher(prev=> {
    const {name,value} = event.target
    return {
      ...prev,
      [name]: value
    }
  })
  getData()
}

console.log(fetcher.order)
// Sample data
const data1 = [
{name: 'Geeksforgeeks', count: 400},
{name: 'Technical scripter', count: 700},
{name: 'Geek-i-knack', count: 200},

];

console.log(daaa)
return (
  <div>
    <h2> Zolve Task 1</h2>
    <select id="fetcher"
     value={fetcher.fetch}
     onChange={handleChange}
     name="fetch"
     className='fetcher'
     >
                <option value="popular">Popular</option>
                <option value="activity">Activity</option>
                <option value="name">Name</option>
            </select>

    <select id="fetcher"
     value={fetcher.order}
     onChange={handleChange}
     name="order"
     className='fetcher-2'
     >
                <option value="desc">Desceding</option>
                <option value="asc">Ascending</option>
                
            </select>
            
    <button className='--button' onClick={getData}>Fetch </button>
    
<BarChart width={1500} height={700} data={daaa}>

	<Bar dataKey="count"  fill="blue"/>
	<Legend width={100} wrapperStyle={{ top: 40, right: 50, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
	<XAxis dataKey="name"  />
	<YAxis />
</BarChart>
<footer className='footer'>This website is a part of Zolve Internship Challenge <a target="_blank" href='https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow'>API</a></footer>
</div>

);
}

export default App;
