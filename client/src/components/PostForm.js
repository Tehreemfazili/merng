import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { CREATE_POST_MUTATION } from '../util/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
            const data = proxy.readQuery({
              query: FETCH_POSTS_QUERY,
            });
    //    const data = proxy.readQuery({
    //      query: FETCH_POSTS_QUERY
    //    });
    //    data.getPosts = [result.data.getPosts, ...data.getPosts];
       proxy.writeQuery({ query: FETCH_POSTS_QUERY,  data: {
        getPosts: [result.data.createPost, ...data.getPosts],
      }, });
       values.body = '';
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false} //error to make field red
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}


export default PostForm;