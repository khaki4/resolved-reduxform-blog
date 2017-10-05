import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  LabelInputField,
  CheckboxField,
  TextAreaField,
  SelectField
} from 'react-semantic-redux-form';
import { Button, Header, Modal, Form, Segment } from 'semantic-ui-react';
import { changeModalWindow, savePost } from '../../reducers/post/postIndex';

const getValueList = () => {
  const options = ['Life', 'Hobby', 'test', '분류 없음'];

  return options.map(item => {
    return {
      key: item,
      value: item,
      text: item
    };
  });
};

const PostCreatModal = props => {
  if (!props) return null;

  const { modal, handleSubmit, reset, changeModalWindow, savePost } = props;
  const handleOpen = () => changeModalWindow(true);
  const onAddPostClick = values => {
    if (!values.title) return;

    const { title, category, content, isPrivate } = values;
    const newPost = {
      title,
      categories: category,
      content,
      isPrivate: !!isPrivate
    };
    savePost(newPost, reset);
  };
  return (
    <Modal
      className="modal__content"
      trigger={<Button primary onClick={handleOpen}>포스트 생성</Button>}
      basic
      size="small"
      open={modal.isOpen}
    >
      <Segment>
        <Header content="Create Post" />
        <Modal.Content>
          <div>
            <Form onSubmit={handleSubmit(onAddPostClick)}>
              <Field
                name="title"
                component={LabelInputField}
                placeholder="제목을 입력해주세요"
              />
              <Field
                name="category"
                component={SelectField}
                options={getValueList()}
                placeholder="카테고리를 입력해주세요"
              />
              <Field
                name="content"
                component={TextAreaField}
                placeholder="내용을 입력해주세요"
              />
              <Field name="isPrivate" label="비공개" component={CheckboxField} />
              <div className="button-group right">
                <Form.Field
                  control={Button}
                  basic
                  color="red"
                  floated="right"
                  onClick={() => changeModalWindow(false)}
                >
                  Cancel
                </Form.Field>
                <Form.Field
                  control={Button}
                  basic
                  type="submit"
                  color="green"
                  floated="right"
                  onClick={onAddPostClick}
                >
                  Create
                </Form.Field>
              </div>
            </Form>
          </div>
        </Modal.Content>
      </Segment>
    </Modal>
  );
};

const validate = ({ title, content, category }) => {
  const errors = {};

  if (!title) {
    errors.title = 'Enter a title!';
  }
  if (title && title.length < 2) {
    errors.title = 'title must be at least 3 characters!';
  }
  if (!category) {
    errors.category = 'Select a category!';
  }
  if (!content) {
    errors.content = 'Enter a content!';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(
    state => ({
      modal: state.dashboard.modal
    }),
    { changeModalWindow, savePost }
  )(PostCreatModal)
);
