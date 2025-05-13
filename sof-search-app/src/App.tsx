import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';
import BackgroundAnimation from './components/BackgroundAnimation';
import ResultsDisplay from './components/ResultsDisplay';

// API base URL - always use the correct API domain in production
const API_BASE_URL = 'https://sof-query.onrender.com';

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 3rem;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  color: #eaeaea;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 2px rgba(79, 172, 254, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 30px;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ResultsContainer = styled.div`
  margin-top: 40px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #4facfe;
  animation: spin 1s ease-in-out infinite;
  margin: 30px auto;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [positionQuery, setPositionQuery] = useState('');
  const [organizationQuery, setOrganizationQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      let endpoint = API_BASE_URL;
      
      // Determine which endpoint to use based on filled fields
      if (nameQuery) {
        endpoint += `/name/${encodeURIComponent(nameQuery)}`;
      } else if (positionQuery) {
        endpoint += `/position/${encodeURIComponent(positionQuery)}`;
      } else if (organizationQuery) {
        endpoint += `/organization/${encodeURIComponent(organizationQuery)}`;
      } else if (filterQuery) {
        endpoint += `/filter/${encodeURIComponent(filterQuery)}`;
      } else {
        // If all fields are empty, fetch all data
        endpoint += '/name';
      }
      
      // Set up CORS headers for production environment
      const config = process.env.NODE_ENV === 'production' ? {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      } : {};
      
      const response = await axios.get(endpoint, config);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNameQuery('');
    setPositionQuery('');
    setOrganizationQuery('');
    setFilterQuery('');
    setResults(null);
  };

  return (
    <AppContainer>
      <BackgroundAnimation />
      <Title>SOF Week Agenda Search</Title>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="Search by name..."
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              type="text"
              value={positionQuery}
              onChange={(e) => setPositionQuery(e.target.value)}
              placeholder="Search by position..."
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              type="text"
              value={organizationQuery}
              onChange={(e) => setOrganizationQuery(e.target.value)}
              placeholder="Search by organization..."
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="filter">Filter</Label>
            <Input
              id="filter"
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by filter..."
            />
          </InputGroup>
          <ButtonContainer>
            <Button type="submit">Search</Button>
            {results && (
              <Button type="button" onClick={handleReset} style={{ marginLeft: '10px', background: 'rgba(255, 255, 255, 0.1)' }}>
                Reset
              </Button>
            )}
          </ButtonContainer>
        </SearchForm>
        
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <div style={{ marginTop: '20px', color: '#ff6b6b', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        {results && !loading && (
          <ResultsContainer>
            <ResultsDisplay results={results} />
          </ResultsContainer>
        )}
      </SearchContainer>
    </AppContainer>
  );
}

export default App;
