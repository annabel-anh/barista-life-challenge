import {useState} from "react";
import Alert from 'react-bootstrap/Alert'

export default function AlertList({alertList}) {
    const [show, setShow] = useState(true)

    return (
        <>
            {
                alertList.map(alertItem =>
                    <Alert
                        key={alertItem.name}
                        variant={'success'}
                        onClose={() => setShow(false)}
                        dismissible
                        data-bs-theme="dark"
                    >
                        {alertItem.name} is successfully {alertItem.type}!
                    </Alert>
                )
            }
        </>
    )
}