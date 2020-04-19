import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const InputBoostrap = styled.div`
  margin: 10px 0px;
  label {
    padding-right: 10px;
    width: 50%;
  }
  input {
    width: 50%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #a4a4a4;
    border-radius: 0.25rem;

    &.interacted:invalid {
      border: 1.5px solid red;
    }

    &.interacted:valid {
      border: 1.5px solid green;
  }
`;
