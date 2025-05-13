import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
`;

const ResultsHeader = styled.h2`
  margin-bottom: 20px;
  color: #4facfe;
  font-size: 1.5rem;
`;

const ResultsTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#4facfe' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#4facfe' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

const ResultsContent = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const RawJSON = styled.pre`
  padding: 20px;
  overflow-x: auto;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #eaeaea;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardField = styled.div`
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
`;

const FieldValue = styled.div`
  font-size: 0.95rem;
  word-break: break-word;
`;

interface ResultsDisplayProps {
  results: any;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [viewMode, setViewMode] = React.useState<'json' | 'cards'>('cards');
  
  // Ensure results is an array for card view
  const resultsArray = Array.isArray(results) ? results : [results];
  
  return (
    <Container>
      <ResultsHeader>Search Results</ResultsHeader>
      
      <ResultsTabs>
        <Tab 
          active={viewMode === 'cards'} 
          onClick={() => setViewMode('cards')}
        >
          Card View
        </Tab>
        <Tab 
          active={viewMode === 'json'} 
          onClick={() => setViewMode('json')}
        >
          JSON View
        </Tab>
      </ResultsTabs>
      
      <ResultsContent>
        {viewMode === 'json' ? (
          <RawJSON>
            {JSON.stringify(results, null, 2)}
          </RawJSON>
        ) : (
          <CardGrid>
            {resultsArray.map((item, index) => (
              <Card key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <CardField key={key}>
                    <FieldLabel>{key}</FieldLabel>
                    <FieldValue>
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </FieldValue>
                  </CardField>
                ))}
              </Card>
            ))}
          </CardGrid>
        )}
      </ResultsContent>
    </Container>
  );
};

export default ResultsDisplay; 