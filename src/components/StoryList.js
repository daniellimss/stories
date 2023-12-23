import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Pagination from './Pagination';


const StoryList = ({ stories }) => {

	return (
		<div>
			<ul className='list-group'>
				{stories.map((story, index) => (
					<li key={index} className="story_box">
						<div className="row" >
							<div className="col-md-3">
								<h3>{story.title}</h3>
								<img src={story.hero_image.url} className="img-size" />
							</div>
							<div className="col-md-9 p-2">
								{story.dek ? <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(story.dek) }} /> : <p >No story here!</p>}
							</div>
							<hr className='ruled' />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
export default StoryList;