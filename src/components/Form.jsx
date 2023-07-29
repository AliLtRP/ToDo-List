import axios from "axios";
import { useState, useEffect } from "react";
import GetData, { Fetch } from "./GetData";
import '../App.css'

function Form() {
    const local = localStorage.getItem('visit');
    const[id, setId] = useState(0);
    const[name, setName] = useState('');
    const[time, setTime] = useState('');
    const [data, setData] = useState([]);

    
    let Fetch = () => {
        axios.get(process.env.REACT_APP_URL, { params: { local } })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };


    const handleSubmit = (e)=>{
        e.preventDefault();

        let local = localStorage.getItem('visit');

        if(local == null){
            local = localStorage.setItem('visit', (new Date()).getTime());
        }

        local = localStorage.getItem('visit');

        axios.post(`${process.env.REACT_APP_CREATE}${id}/${name}/${time}/${local}`)
            .then(res => {
                console.log('success');
                Fetch();
            })
            .catch(err => console.log(err));
            let i = id+1;
            setId(i);
            console.log(id);
    }

    useEffect(()=>{
        Fetch();
    }, []);


    return(
        <div className="form">
            <form action="" method="post" onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Task Name"/>
                <input type="date" value={time} onChange={e=>setTime(e.target.value)} placeholder="time"/>
                <button type="operation" >submit</button>
            </form>

            <GetData data={data} setData={setData} name={name} time={time}/>
        </div>
    )
}

export default Form;