import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';

export default function SearchBar({placeholderText, onHandleSearch}) {
    const [inputValue, setInputValue] = useState('')

    return (
        <InputGroup data-bs-theme="dark">
            <Form.Control
                value={inputValue}
                placeholder={placeholderText}
                aria-label={placeholderText}
                aria-describedby="basic-addon2"
                onChange={(e) => {
                    setInputValue(e.target.value)
                    onHandleSearch(e.target.value)
                }}
            />
            <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                    setInputValue('')
                    onHandleSearch('')
                }}
            >
                Clear search
            </Button>
        </InputGroup>
    )
}