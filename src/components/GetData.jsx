import axios from "axios";
import { useState, useEffect } from "react";


function GetData({ data, setData }) {
    const local = localStorage.getItem('visit');

    let Fetch = () => {
        axios.get(`http://localhost:8000/`, { params: { local } })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    let deleteTask = (e) => {
        axios.delete(`http://localhost:8000/app/item/delete/${e}`)
            .then(res => {
                console.log(res.data);
                setTimeout(()=>{
                    Fetch();
                }, 100)
            })
            .catch(err => console.log(err));
    }

    useEffect(()=>{
        Fetch();
    },[])

    return (
        <>
            {data.map(v => (
                <div>
                    {v.name}
                    {v.time}
                    <button onClick={e => deleteTask(v.id)}>delete</button>
                </div>
            ))}
        </>
    );
}

export default GetData;
