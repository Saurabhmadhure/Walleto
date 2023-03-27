import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  padding: 10px 20px;

  &:hover {
    background-color: #0069d9;
  }
`;

const Heading = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubHeading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;

  &:not(:last-child) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    flex: none;
    margin-bottom: 20px;

    &:not(:last-child) {
      margin-right: 0;
    }
  }
`;
