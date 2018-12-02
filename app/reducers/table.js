import axios from 'axios'

const reducer = (state={}, action) => {
  switch (action.type) {
  case SET_TABLE:
    return action.table
  }
  return state
}

const GET_TABLE = 'GET_TABLE'
const ADD_ROW = 'ADD_ROW'
const SET_TABLE = 'SET_TABLE'

export const setTable = (table) => {
  return {
    type: SET_TABLE,
    table
  }
}

export const addRow = (rowData, tableID) => {
  return (dispatch) => {
    axios.post(`/tables/${tableID}/data`, {rowData})
    .then((result)=>{
      if (result.data.error){
        // Todo implement
      }
      else{
        dispatch(setTable(result.data))
      }
    })
  }
}

export const getTable = (tableID) => {
  return (dispatch) => {
    axios.get(`/tables/${tableID}`)
    .then((result)=>{
      if (result.data.error){
        // Todo implement
      }
      else {
        dispatch(setTable(result.data))
      }
    })
  }
}

export default reducer