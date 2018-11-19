import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { Input } from 'antd';
import '../css/style.css'

const Search = Input.Search;
const SearchPanel = (props) => {
  return (
    <div>
      <Jumbotron >
        <div className="search">
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            size="large"
            style={{ width: '80%' }}
          />
        </div>
      </Jumbotron>
    </div>
  );
};

export default SearchPanel;

