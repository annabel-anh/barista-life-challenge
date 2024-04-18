import { Pagination } from 'react-bootstrap';
import {useState} from 'react';

export default function Paging({handlePaging}) {

    return (
        <Pagination data-bs-theme="dark">
            <Pagination.Prev onClick={handlePaging}>Prev</Pagination.Prev>
            <Pagination.Next onClick={handlePaging}>Next</Pagination.Next>
        </Pagination>
    )
}