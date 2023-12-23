import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import StoryList from './components/StoryList';
import './App.css';
import { Pagination } from 'react-bootstrap';

function App() {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage, setStoriesPerPage] = useState(3);
  const [fetchMoreStories, setFetchMoreStories] = useState(false);

  //Using axios and async/await:
  useEffect(() => {
    const fetchStories = async () => {
      const res = await axios.get('https://cryptodire.kontinentalist.com/api/v1/stories');
      setStories(res.data.data);
    }
    fetchStories();
  }, []);

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  console.log(stories);

  const handleClick = (e) => {
    setCurrentPage(currentPage + 1);
    setFetchMoreStories(true);
  }

  if (fetchMoreStories) {
    const loadMore = async () => {
      const res = await axios.get(`https://cryptodire.kontinentalist.com/api/v1/stories?page=${currentPage}`);
      setStories([...stories, ...res.data.data]);
    }
    loadMore();
    setFetchMoreStories(false);
  }

  return (
    <div className="App">
      <div className='app-wrapper'>
        <div>
          <Header />
        </div>
        <div>
          <StoryList stories={currentStories} />
        </div>
        <button className="btn-more" onClick={handleClick}>More Stories</button>
        <Pagination totalStories={stories.length} storiesPerPage={storiesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;
