import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

// const colorToAdd = {
//   color: '',
//   code: { hex: '' },
//   id: ''
// };

const ColorList = ({ colors, match, updateColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [colorToAdd, setColorToAdd] = useState(colorToAdd)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        window.location = '/protected'
      })
      .catch(err => { console.log(err) })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('Color to Delete ID:', colorToEdit)
    console.log('Url to edit:', `/colors/${color.id}`)
    axiosWithAuth()
      .delete(`colors/${color.id}`, color)
      .then(res => {
        window.location = '/protected'
      })
      .catch(err => { console.log(err) })

  };


  // const addColor = color => {
  //   axiosWithAuth()
  //     .post(`/colors/${color.id}`, color)
  //     .then(res => {
  //       console.log(res)
  //       window.location = '/protected'
  //     })
  //     .catch(err => { console.log(err) })
  // }


  // const handleChange = e => {
  //   // addColor(colorToAdd)
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                X
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* <div className='add-form-cont'>
        <form id='myForm' onSubmit={addColor(colorToAdd)}>
          <input
            placeholder='Color Name'
            type="name"
            name="color"
            onChange={handleChange}
          />
          <input
            placeholder='Hex'
            type="age"
            name="hex"
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div> */}
    </div>
  );
};

export default ColorList;
