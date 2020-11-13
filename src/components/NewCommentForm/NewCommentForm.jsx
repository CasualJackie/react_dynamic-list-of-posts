import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = memo(({
  selectedPostId,
  loadData,
  validation,
  setValidation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleName = useCallback((event) => {
    setName(event.target.value);
    setValidation(false);
  }, []);

  const handleEmail = useCallback((event) => {
    setEmail(event.target.value);
    setValidation(false);
  }, []);

  const handleComment = useCallback((event) => {
    setComment(event.target.value);
    setValidation(false);
  }, []);

  const submitComment = useCallback(async(event) => {
    event.preventDefault();

    if (name === '' || email === '' || comment === '') {
      setValidation(true);

      return;
    }

    await addComment({
      name,
      email,
      body: comment,
      postId: selectedPostId,
    });

    setName('');
    setEmail('');
    setComment('');

    loadData();
  }, [name, email, comment, selectedPostId]);

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          onChange={handleName}
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          onChange={handleEmail}
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={handleComment}
          value={comment}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      {validation && (
        <p className="NewCommentForm__error">
          All fields must be filled
        </p>
      )}

      <button
        onClick={submitComment}
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});

NewCommentForm.propTypes = {
  setValidation: PropTypes.func.isRequired,
  validation: PropTypes.bool.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  loadData: PropTypes.func.isRequired,
}.isRequired;
