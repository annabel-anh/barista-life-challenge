import TableHeaderCol from './TableHeaderCol.jsx';

export default function TableHeaderRow({columns, sortCol, sortDir, onHandleSort}) {
    return (
        <>
            <tr className="trow">
                {columns.map(col => {
                    return (
                        <TableHeaderCol
                            label={col.label}
                            colName={col.name}
                            sortCol={sortCol}
                            sortDir={sortDir}
                            onHandleSort={onHandleSort}
                            key={col.name}
                        />
                    )
                })}
                <th>Actions</th>
            </tr>
        </>
    )
}