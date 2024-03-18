import {FaSort, FaSortUp, FaSortDown} from 'react-icons/fa'

export default function TableHeaderCol({label, colName, sortCol, sortDir, onHandleSort}) {
    let sortIcon
    if (colName !== sortCol) {
        sortIcon = <FaSort/>
    } else {
        sortIcon = sortDir === 'asc' ? <FaSortUp/> : <FaSortDown/>
    }

    let newSortDir
    if (colName !== sortCol) {
        newSortDir = 'asc'
    } else {
        newSortDir = sortDir === 'asc' ? 'desc' : 'asc'
    }

    const handleClick = () => {
        onHandleSort(colName, newSortDir)
    }

    return (
        <th onClick={handleClick}>
            {label}
            {sortIcon}
        </th>
    )
}