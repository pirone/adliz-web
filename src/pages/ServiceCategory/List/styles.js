import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .topbox {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
    & .pageButton {
      justify-content: flex-end;
    }
    & .pageTitle {
      justify-content: flex-start;
    }
  }

  .actions {
    width: 80px;
  }

  table button {
    font-size: 15px;
    padding: 0px 4px;
  }
  .btEdit {
    padding-right: 1px;
    margin-right: 2px;
  }
`;
