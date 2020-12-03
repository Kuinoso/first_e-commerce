import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import StarRating from './rating.js'
import Swal from 'sweetalert2'


export default function PutReview() {
    const userData = useSelector(state => state.userId);
    const history = useHistory();
    const pID = useSelector(state => state.idP)
    const rID = useSelector(state => state.rID)
    const [data, setData] = useState({
        rating: "",
        description: "",
    })

    useEffect(() => {
        async function makeRequests() {
            await axios.get(`http://localhost:3001/products/${pID}/review/${rID}`, {
            }).then(reviu => {
                setData({
                    ...data,
                    description: reviu.data.description,
                    rating: reviu.data.rating

                })
            })
        }
        makeRequests();
    }, []);

    const handlePrueba = (e) => {
        setData({
            ...data,
            rating: e.target.value
        })
    }

    const handleCambio = (e) => {
        setData({
            ...data,
            description: e.target.value
        })
        console.log(data.description)
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        let json = {
            rating: data.rating,
            description: data.description,
        }
        await axios.put(`http://localhost:3001/products/${pID}/review/${rID}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Review editada correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        })
        history.push(`/products/prod/${pID}`)
    }

    return (
        <div>
            <div className="ReviewCreado2">
                <h1>Opinion sobre el producto</h1>
                <h5>{userData.name} {userData.lastname}</h5>
                <div onClick={handlePrueba}><StarRating /></div>
                <input className="inputNuevo" value={data.description} onChange={handleCambio} type="text"></input>
                <button className="BtnEditar" onClick={handleEdit}>Modificar</button>
            </div>
        </div>
    )
}
