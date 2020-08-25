import React from 'react'

function pettedList(props) {

    


    return (
        <ul>
            {props.petted.map((pet) =>{
                return (
                    <li>{pet}</li>
                )
            })}
        </ul>
    )
}

export default pettedList
