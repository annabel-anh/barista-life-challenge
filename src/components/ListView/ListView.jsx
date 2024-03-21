import {useEffect, useState} from 'react';
import DataTable from '../DataTable/DataTable.jsx';
import AlertList from '../AlertList/AlertList.jsx';
import Button from 'react-bootstrap/Button';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { FaArrowRotateLeft, FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'

export default function ListView({api, viewModel}) {
    const entitySingle = viewModel.entitySingle
    const [alertList,setAlertList] = useState([]);
    const [entityData, setEntityData] = useState(null)

    const [sortCol, setSortCol]  = useState(api.sortCol)
    const [sortDir, setSortDir]  = useState(api.sortDir)
    const [filterStr, setFilterStr] = useState(api.filterStr)
    const [isReset, setIsReset] = useState(false)


    useEffect(() => {
        api.sortCol = sortCol
        api.sortDir = sortDir
        api.filterStr = filterStr

        api.list()
            .then(data => setEntityData([...data]))
    }, [filterStr, sortDir, sortCol, isReset, api]);

    const addAlert = (entityName, type) => {
        let newList = []
        newList.push({name: entityName, type: type})
        setAlertList(newList)
    }

    const handleSort = (colName, sortDir) => {
        setSortCol(colName)
        setSortDir(sortDir)
    }

    const handleDelete = (id) => {
        const delItemName = api.model.data[api.getItemIndex(id)][viewModel.nameCol]
        api.delete(id)
            .then(() => {
                setEntityData([...api.model.data])
                addAlert(delItemName, 'deleted')
            })
    }

    const handleReset = () => {
        api.reset()
        api.clear()

        setSortCol(api.sortCol)
        setSortDir(api.sortDir)
        setIsReset(true)
        setAlertList([])
    }


    const handleSearch = (query) => {
        if (query.length > 2) {
            setFilterStr(query)
        } else if (query.length === 0) {
            setFilterStr(query)
        }
    }

    return (
        <>
            <AlertList alertList={alertList}/>
            <div className="container m-sm-0">
                <div className="row p-0 gap-2">
                    <Link to={`/add-${entitySingle}`} className='w-auto p-0'>
                        <Button
                            type='button'
                            variant="btn btn-outline-success"
                        >
                            Add new {entitySingle} <FaPlus />
                        </Button>
                    </Link>
                    <div className='w-auto p-0'>
                        <Button
                            type='button'
                            variant="btn btn-outline-primary"
                            onClick={() => handleReset()}
                            className='w-auto'
                        >
                            Reset <FaArrowRotateLeft />
                        </Button>
                    </div>
                    <div className="w-auto p-0 flex-grow-1">
                        <SearchBar
                            placeholderText={`Search ${entitySingle}...`}
                            onHandleSearch={handleSearch}
                        />
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

        </>
    )
}