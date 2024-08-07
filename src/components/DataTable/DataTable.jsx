import Table from 'react-bootstrap/Table';
import TableHeaderRow from './TableHeaderRow.jsx';
import DataRow from './DataRow.jsx';

export default function DataTable({data, viewModel, sortCol, sortDir, onHandleDelete, onHandleSort}) {
    const columns = viewModel.list.columns

    return (<div className="text-nowrap">
        <Table
            id="my-list"
            className="border-dark-subtle border align-middle"
            striped
            hover
            responsive
            size="lg"
            data-bs-theme="dark"
        >
            <thead>
            <TableHeaderRow
                sortCol={sortCol}
                sortDir={sortDir}
                onHandleSort={onHandleSort}
                columns={columns}
            />
            </thead>
            <tbody>
            {data && data.map(item => (<DataRow
                key={item.id}
                id={item.id}
                data={item}
                viewModel={viewModel}
                columns={columns}
                onHandleDelete={onHandleDelete}
            />))}
            </tbody>
        </Table>
    </div>)
}