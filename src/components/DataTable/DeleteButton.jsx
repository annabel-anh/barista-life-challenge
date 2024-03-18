import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaTrash} from 'react-icons/fa'


export default function DeleteButton({bodyText, title, noText, confirmText, itemKey, onDelete}) {
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const handleConfirm = () => {
        setShow(false)
        onDelete(itemKey);
    }
    const handleShow = () => {
        setShow(true)
    }

    return (<>
        <Button variant="btn btn-outline-danger" onClick={handleShow}>
            <FaTrash/>
        </Button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {noText}
                </Button>
                <Button type='button' variant="danger" onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}
