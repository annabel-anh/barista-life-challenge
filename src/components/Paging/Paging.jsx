import { Pagination } from 'react-bootstrap';
import {useState} from 'react';

export default function Paging({handlePaging, disabledNext, disabledPrev}) {

    return (
        <Pagination data-bs-theme="dark">
            <Pagination.Prev onClick={handlePaging} disabled={disabledPrev}>Prev</Pagination.Prev>
            <Pagination.Next onClick={handlePaging} disabled={disabledNext} >Next</Pagination.Next>
        </Pagination>
    )
}