import React from 'react';
import axios from "axios";

function newDogs() {

    const handleSelect = (e) => {
        // console.log(e.target.getAttribute("data"))
        let petting = e.target.getAttribute("data")
        axios({
            url: "/pet",
            method: "post",
            // withCredentials: true,
            data: {
                username: "gerple3",
                petted: petting
            }
        }).then(res => console.log(res))
    }
    return (
        <div>
            <p data="thisnew" onClick={handleSelect}>new</p>
        </div>
    )
}

export default newDogs
