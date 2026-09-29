import React, { useState } from 'react';
import './Info.css';

function Info() {
    const [expanded, setExpanded] = useState(false);

    const toggleContent = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="container">
        <div className="info-card">
            <h2>
                <strong>Online store of household appliances and electronics</strong>
            </h2>
            <p>
                Then the question arises: where’s the content? Not there yet? That’s not so bad,
                there’s dummy copy to the rescue. But worse, what if the fish doesn’t fit in the
                can, the foot’s too big for the boot? Or too small? To short sentences, to many
                headings, images too large for the proposed design, or too small, or they fit in
                but it looks iffy for reasons.
                {expanded && (
                    <>
                        {' '}
                        <p className='pt-2'>
                            A client that’s unhappy for a reason is a problem, a client that’s unhappy though he or her can’t quite put a finger on it is worse. Chances are there wasn’t collaboration, communication, and checkpoints, there wasn’t a process agreed upon or specified with the granularity required. It’s content strategy gone awry right from the start. If that’s what you think how bout the other way around? How can you evaluate content without design? No typography, no colors, no layout, no styles, all those things that convey the important signals that go beyond the mere textual, hierarchies of information, weight, emphasis, oblique stresses, priorities, all those subtle cues that also have visual and emotional appeal to the reader.</p>
                    </>
                )}
            </p>
            <button className="read-more-btn" onClick={toggleContent}>
                {expanded ? 'Read Less ▲' : 'Read More ▼'}
            </button>
        </div>
        </div>
    );
}

export default Info
