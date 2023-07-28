import axios from "axios";
import { useState, useEffect } from "react";
import GetData, { Fetch } from "./GetData";


function Form() {
    const local = localStorage.getItem('visit');
    const[id, setId] = useState(0);
    const[name, setName] = useState('');
    const[time, setTime] = useState('');
    const [data, setData] = useState([]);

    
    let Fetch = () => {
        axios.get(`http://localhost:8000/`, { params: { local } })
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

        axios.post(`http://localhost:8000/app/item/${id}/${name}/${time}/${local}`)
            .then(res => {
                console.log('success');
                Fetch();
            })
            .catch(err => console.log(err));
    }

    useEffect(()=>{
        Fetch();
    }, []);


    return(
        <>
            <form action="" method="post" onSubmit={handleSubmit}>
                <input type="number" value={id} onChange={e=>setId(e.target.value)} placeholder="id"/>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="name"/>
                <input type="date" value={time} onChange={e=>setTime(e.target.value)} placeholder="time"/>

                <button type="submit">submit</button>
            </form>

            <GetData data={data} setData={setData}/>
        </>
    )
}

export default Form;