import styled from 'styled-components';

export const Section = styled.section`
  padding: 1rem;
  display: ${props => (props.visible ? '' : 'none')};

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    justify-content: center;
    align-items: center;

    transition: opacity 0.15s linear;
  }

  .modal-dialog {
    max-width: 500px;
    margin: 150px auto;
  }

  .modal-content {
    flex-direction: column;
    background-color: #fff;
    border: 1px solid;
    border-radius: 0.3rem;
    .modal-header {
      padding: 1rem;
      display: flex;
      .close {
        display: flex;
        float: right;
        margin: 0 0 0 auto;
      }
    }
    .modal-body {
      padding: 1rem;
    }
    .modal-footer {
      padding: 1rem;
    }
  }
`;
