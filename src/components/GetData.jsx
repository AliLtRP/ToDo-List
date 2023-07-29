import axios from "axios";
import { useState, useEffect } from "react";
import './style.css';

function GetData({ data, setData, name, time }) {
    const local = localStorage.getItem('visit');

    let Fetch = () => {
        axios.get(`${process.env.REACT_APP_URL}`, { params: { local } })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    let updateTask = (e, na) =>{
        console.log(name);
        console.log(time);
        console.log(na);
        axios.post(`${process.env.REACT_APP_UPDATE}${e}/${na}`, {name, time})
            .then(res => {
                console.log(res);
                setTimeout(() => {
                    Fetch();
                }, 100)
            })
            .catch(err => console.log(err));
    }

    let deleteTask = (e) => {
        axios.delete(`${process.env.REACT_APP_DELETE}${e}`)
            .then(res => {
                console.log(res.data);
                setTimeout(() => {
                    Fetch();
                }, 100)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        Fetch();
    }, []);

    return (
        <div className="task">
            {data.map(v => (
                <div className="wrapper">
                    <div className="checkBox">
                        <input type="checkbox" className="ch" name="" id="" />
                    </div>

                    <div className="data">
                        <div className="name">
                            <p className="">{v.name}</p>
                        </div>
                        <div className="time">
                            <p className="">{v.time}</p>
                        </div>
                    </div>
                    <div className="butt">
                        <button type="operation" onClick={e => updateTask(v.id, v.name)}>update</button>
                        <button type="operation" onClick={e => deleteTask(v.id)}>delete</button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default GetData;
