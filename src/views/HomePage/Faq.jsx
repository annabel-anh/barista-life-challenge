import Accordion from 'react-bootstrap/Accordion';

export default function Faq() {
    return (
        <div className='container-fluid faq-container py-5 d-flex justify-content-center'>
            <div className="row col-lg-6 d-flex flex-column gap-3">
                <h2 className='faq-header'>Frequently Asked Questions</h2>
                <Accordion defaultActiveKey={['0']} data-bs-theme="dark">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Who can participate?</Accordion.Header>
                        <Accordion.Body >
                            Open to teams of professional baristas with at least 2 years of experience each.
                        </Accordion.Body >
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>How do we register?</Accordion.Header>
                        <Accordion.Body >
                            Click the <span className="fw-bold">Register your team</span> button above and submit your team
                            information.
                        </Accordion.Body >
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>What equipment will be provided?</Accordion.Header>
                        <Accordion.Body >
                            Standard espresso machines and grinders are provided. You may bring personal tools.
                        </Accordion.Body >
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>On what criteria will we be judged?</Accordion.Header>
                        <Accordion.Body >
                            Judges will score based on technique, flavor, presentation, creativity, and overall impression.
                        </Accordion.Body >
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}