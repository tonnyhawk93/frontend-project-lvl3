const modal = document.querySelector('#modal');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.text-break');
const modalLink = modal.querySelector('.full-article');
const closeButton = modal.querySelector('.btn-secondary');

const renderModal = ({ title, description, link }, i18) => {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalLink.href = link;
  modalLink.textContent = i18('modal.read');
  closeButton.textContent = i18('modal.close');
};

export default renderModal;
