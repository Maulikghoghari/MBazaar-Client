import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

function FaqsAccodian() {
    return (
        <div className='container p-4 bg-light'>
            <div className="Faqs">
                <h3 className='my-4'>FAQs</h3>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>My order hasn't arrived yet Where is it?</Accordion.Header>
                        <Accordion.Body>
                            <p>A client that’s unhappy for a reason is a problem, a client that’s unhappy though he or her can’t quite put a finger on it is worse. Chances are there wasn’t collaboration, communication, and checkpoints, there wasn’t a process agreed upon or specified with the granularity required.</p>
                            <p>It’s content strategy gone awry right from the start. Forswearing the use of Lorem Ipsum wouldn’t have helped, won’t help now. It’s like saying you’re a bad designer, use less bold text, don’t use italics in every other paragraph. True enough, but that’s not all that it takes to get things back on track.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Do You deliver on public holidays?</Accordion.Header>
                        <Accordion.Body>
                            <p>If that’s what you think how bout the other way around? How can you evaluate content without design? No typography, no colors, no layout, no styles, all those things that convey the important signals that go beyond the mere textual, hierarchies of information, weight, emphasis, oblique stresses, priorities, all those subtle cues that also have visual and emotional appeal to the reader. Rigid proponents of content strategy may shun the use of dummy copy but then designers might want to ask them to provide style sheets with the copy decks they supply that are in tune with the design direction they require.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Do you deliver to my postcode?</Accordion.Header>
                        <Accordion.Body>
                            <p>A client that’s unhappy for a reason is a problem, a client that’s unhappy though he or her can’t quite put a finger on it is worse. Chances are there wasn’t collaboration, communication, and checkpoints, there wasn’t a process agreed upon or specified with the granularity required.</p>
                            <p>It’s content strategy gone awry right from the start. Forswearing the use of Lorem Ipsum wouldn’t have helped, won’t help now. It’s like saying you’re a bad designer, use less bold text, don’t use italics in every other paragraph. True enough, but that’s not all that it takes to get things back on track.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Is next-day delivery available on all orders?</Accordion.Header>
                        <Accordion.Body>
                            <p>If that’s what you think how bout the other way around? How can you evaluate content without design? No typography, no colors, no layout, no styles, all those things that convey the important signals that go beyond the mere textual, hierarchies of information, weight, emphasis, oblique stresses, priorities, all those subtle cues that also have visual and emotional appeal to the reader. Rigid proponents of content strategy may shun the use of dummy copy but then designers might want to ask them to provide style sheets with the copy decks they supply that are in tune with the design direction they require.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Do I need to be sign for delivery?</Accordion.Header>
                        <Accordion.Body>
                            <p>A client that’s unhappy for a reason is a problem, a client that’s unhappy though he or her can’t quite put a finger on it is worse. Chances are there wasn’t collaboration, communication, and checkpoints, there wasn’t a process agreed upon or specified with the granularity required.</p>
                            <p>It’s content strategy gone awry right from the start. Forswearing the use of Lorem Ipsum wouldn’t have helped, won’t help now. It’s like saying you’re a bad designer, use less bold text, don’t use italics in every other paragraph. True enough, but that’s not all that it takes to get things back on track</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default FaqsAccodian
