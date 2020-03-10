import React from 'react';
import { Form, Input, Button } from 'antd';

import { Container } from './styles';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

export const Demo = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome"
          name="username"
          rules={[
            {
              required: true,
              message: 'Campo obrigatório.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Descrição" name="password" rules={[{}]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Demo;
