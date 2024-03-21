import React from 'react';
import DeleteButton from './DeleteButton';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import {FaEdit} from 'react-icons/fa';
import {Link} from 'react-router-dom';


export default function DataRow({id, data, columns, viewModel, onHandleDelete}) {
    const entity = viewModel.entitySingle
    const nameCol = viewModel.nameCol
    const dataAttr = columns.map(col => col.name)
    const deletePrompt = `Are you sure you want to delete ${entity} ${data[nameCol]}? This action is irreversible.`

    const popover = (<Popover id="popover-basic">
        <Popover.Header as="h3">{data[nameCol]}</Popover.Header>
        <Popover.Body>
            <Image src={data.logoUrl} className="w-100 mb-2 rounded-3"/>
            {`${data[nameCol]} joins #BaristaLife with the motto "${data.motto}"`}
        </Popover.Body>
    </Popover>);

    return (<>
        <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="left"
            overlay={popover}
        >
            <tr key={id}>
                {dataAttr.map(attr => <td key={attr}>{data[attr]}</td>)}
                <td>
                    <Link to={`/edit-${entity}/${id}`}>
                        <Button variant="btn btn-outline-light" type="button" className="me-md-2 mb-md-0 mb-2">
                            <FaEdit/>
                        </Button>
                    </Link>
                    <DeleteButton
                        title={`Delete ${entity} ${data[nameCol]}?`}
                        bodyText={deletePrompt}
                        noText="Cancel"
                        confirmText="Delete"
                        itemKey={id}
                        onDelete={onHandleDelete}
                    />
                </td>
            </tr>
        </OverlayTrigger>
    </>)
}