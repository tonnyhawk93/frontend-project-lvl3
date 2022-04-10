export const createErrorFeedback = (message) => {
  const errorFeedback = document.createElement('p');
  errorFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
  errorFeedback.id = 'errorFeedback';
  errorFeedback.textContent = message;
  return errorFeedback;
};

export const createSuccessFeedback = (message) => {
  const successFeedback = document.createElement('p');
  successFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
  successFeedback.id = 'successFeedback';
  successFeedback.textContent = message;
  return successFeedback;
};
