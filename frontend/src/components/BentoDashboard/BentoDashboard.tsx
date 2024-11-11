// BentoDashboard.jsx

import React from 'react';
import styled from 'styled-components';
// import Header from '../Header'; // Import the Header component

const BentoWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  gap: 1rem;
  padding: 1rem;
`;

const BentoContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 1fr 2fr 3fr 3fr; // Change the first row to auto for the header
  grid-template-columns: 3fr 1fr 2fr;
  gap: 1rem;
  flex: 2 0 10rem;
`;

const BentoItem = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  transition: box-shadow 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

const Item1 = styled(BentoItem)`
  background: #F4BD50;
  grid-column: 1 / -1;
  grid-row: span 2;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
    grid-row: span 2;
  }
`;

const Item2 = styled(BentoItem)`
  background: #AAEC8A;
  grid-row: span 2;

  @media (min-width: 768px) {
    grid-row: span 2;
  }
`;

const Item3 = styled(BentoItem)`
  background: #B881FF;
  grid-column: span 2;
  grid-row: span 3;

  @media (min-width: 768px) {
    grid-column: span 2;
    grid-row: span 2;
  }
`;

const Item4 = styled(BentoItem)`
  background: #F4BD50;
  grid-column: span 1;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
  }
`;

const Item5 = styled(BentoItem)`
  background: #FF8983;
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

const Item6 = styled(BentoItem)`
  background: #837AED;
  grid-column: span 1;
`;

const BentoDashboard = () => {
  return (
    <BentoWrapper>
      <BentoContainer>
        <Item1>
          {/* <Header /> Include the Header component inside Item1 */}
        </Item1>
        <Item2 />
        <Item3 />
        <Item4 />
        <Item5 />
        <Item6 />
      </BentoContainer>
    </BentoWrapper>
  );
};

export default BentoDashboard;