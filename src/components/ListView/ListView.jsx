import {useEffect, useState} from 'react';
import DataTable from '../DataTable/DataTable.jsx';
import AlertList from '../AlertList/AlertList.jsx';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Paging from '../Paging/Paging.jsx';

export default function ListView({api, viewModel}) {
    const entitySingle = viewModel.entitySingle
    const [alertList,setAlertList] = useState([]);
    const [entityData, setEntityData] = useState([])

    const [sortCol, setSortCol]  = useState(api.sortCol)
    const [sortDir, setSortDir]  = useState(api.sortDir)
    const [filterStr, setFilterStr] = useState(api.filterStr)
    const [filterCol, setFilterCol] = useState(api.filterCol)
    const [limit, setLimit] = useState(api.limit)
    const [offset, setOffset] = useState(api.offset)


    useEffect(() => {
        api.sortCol = sortCol
        api.sortDir = sortDir
        api.filterStr = filterStr
        api.filterCol = filterCol
        api.limit = limit
        api.offset = offset

        api.list()
            .then(data => {
                setEntityData([...data])
            })
    }, [filterStr, filterCol, sortDir, sortCol, api, alertList, limit, offset]);

    const addAlert = (entityName, type) => {
        let newList = []
        newList.push({name: entityName, type: type})
        setAlertList(newList)
    }

    const handleSort = (colName, sortDir) => {
        setSortCol(colName)
        setSortDir(sortDir)
        setFilterCol(colName)
    }

    const handleDelete = async (id) => {
        const delItem = await api.read(id)

        api.delete(id)
            .then(() => {
                addAlert(delItem.name, 'deleted')
            })
    }

    const handleSearch = (query) => {
        if (query.length > 2) {
            setFilterStr(query)
        } else if (query.length === 0) {
            setFilterStr(query)
        }
    }

    const handleLimit = (e) => {
        setLimit(Number(e.target.textContent))
    }

    const placeHolderText = (filterCol) => {
        return filterCol.replace(/(?<!^)(?=[A-Z])/g, ' ').toLowerCase()
    }

    const handlePaging = (e) => {
        if (e.target.textContent.includes("Prev")) {
            setOffset(offset - limit)
        } else if (e.target.textContent.includes("Next")) {
            setOffset(offset + limit)
        }
    }

    return (
        <>
            <AlertList alertList={alertList}/>
            <div className="container mb-3">
                <div className="row p-0 gap-2">
                    <Link to={`/add-${entitySingle}`} className='w-auto p-0'>
                        <Button
                            type='button'
                            variant="btn btn-outline-success"
                        >
                            Add new {entitySingle} <FaPlus />
                        </Button>
                    </Link>
                    <div className="w-auto p-0 flex-grow-1">
                        <SearchBar
                            placeholderText={`Search ${placeHolderText(filterCol)}...`}
                            onHandleSearch={handleSearch}
                        />
                    </div>
                    <div className="w-auto p-0">
                        <DropdownButton data-bs-theme="dark" id="dropdown-item-button" title="Limit" variant='secondary'>
                            <Dropdown.Item as="button" onClick={handleLimit}>5</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLimit}>10</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLimit}>20</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
            <DataTable
                data={entityData}
                sortCol={sortCol}
                sortDir={sortDir}
                viewModel={viewModel}
                onHandleDelete={handleDelete}
                onHandleSort={handleSort}
            />
            <Paging handlePaging={handlePaging} disabledNext={entityData.length < limit} disabledPrev={offset - limit < 0}></Paging>
        </>
    )
}