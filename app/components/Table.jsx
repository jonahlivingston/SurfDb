import React from 'react'
import {Table, Button} from 'evergreen-ui'
import {connect} from 'react-redux'
import {getTable, addRow} from '../reducers/table'
import {Link} from 'react-router'

const SAMPLE_TABLE_DATA = {
  metaData: {
    headers: [
      {name: 'name'},
      {name: 'age'},
      {name:'address'},
    ]
  },
  data:[
    {name: 'Jonah', age:24, address:'123 test street'},
    {name: 'Justin', age:12, address:'prank avenue'},
    {name: 'Bad', age:102, address:'prank avenue tst'}
  ]
}

export class DataTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editable: {},
      overrideTable: undefined
    }
    this.onEditableCellChange = this.onEditableCellChange.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  componentDidMount(){
    //Todo pull table to get from URL or other source. for now is hardcoded
    this.getTable(this.getTableID())
  }

  onEditableCellChange(header, val){
    //Todo insert validation that values match validation in header
    this.setState({
      ...this.state,
      editable: {
        ...this.state.editable,
        [header.name]: val
      }
    })
  }

  addRow(){
    const editableSetFields = this.state.editable
    this.props.addRow(this.state.editable, this.getTableID())
  }



  getTable(tableID){
    if (tableID==="1"){
      this.setState({overrideTable: SAMPLE_TABLE_DATA})
    }
    else{
      this.props.getTable(tableID)
    }
  }

  getTableID(){
    //Todo implement
    return "1"
  }

  renderEditable(headers){
    const editableRow = headers.map((header)=>{
      return(
        <Table.SearchHeaderCell placeholder="Enter Value" id="editable-cell" value={this.state.editable[header.name]} name={header.name} onChange={(val)=>{this.onEditableCellChange(header, val)}}/>
      )
    })
    return(
      <Table.Row>
        {editableRow}
      </Table.Row>
    )
  }

  renderTable(table){
    const headers = table.metaData.headers.map((header)=>{
      return(
        <Table.TextHeaderCell>
          {header.name}
        </Table.TextHeaderCell>
      )
    })
    const head = <Table.Head>{headers}</Table.Head>
    const bodyInfo = table.data.map((row)=>{
      return(
        <Table.Row>
          {table.metaData.headers.map((header)=>{
            console.log("header is", header)
            console.log("rowis", row)
            return(
              <Table.TextCell>{row[header.name] || ""}</Table.TextCell>
            )
          })}
        </Table.Row>
      )
    })
    const body = <Table.Body>{bodyInfo}</Table.Body>
    const dataTable = (
      <Table>
        {head}
        {body}
        {this.renderEditable(table.metaData.headers)}
      </Table>
    )
    return dataTable 
  }

  render(){
    // Todo switch sample table data to read from state
    if (this.props.selectedTable.metaData || this.state.overrideTable){
      return(
        <div>
          {this.renderTable(this.state.overrideTable || this.props.selectedTable)}
          <Button appearance="primary" intent="success" onClick={this.addRow}>Add Row</Button>
        </div>
      )
    }
    else{
      return <div/>
    }

  }
}

const mapStateToProps = (state) => {
  console.log("this.state", state)
  return {
      selectedTable: state.table,
  }
}


const mapDispatchToProps = (dispatch) => ({
  addRow(rowData, tableID) {
      dispatch(addRow(rowData, tableID))
  },
  getTable(tableID){
    dispatch(getTable(tableID))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
