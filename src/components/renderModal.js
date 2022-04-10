const renderModal = ({ title, description, link }, i18) => {
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  const modal = document.querySelector('#modal');
  modal.classList.add('show');
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  modal.style.display = 'block';
  const modalDescription = modal.querySelector('.text-break');
  modalDescription.textContent = description;
  const modalTitle = modal.querySelector('.modal-title');
  const modalLink = modal.querySelector('.full-article');
  const closeButton = modal.querySelector('.btn-secondary');
  modalTitle.textContent = title;
  modalLink.href = link;
  modalLink.textContent = i18('modal.read');
  closeButton.textContent = i18('modal.close');
  const close = modal.querySelector('.btn-secondary');
  close.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.body.removeAttribute('style');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.style.display = 'none';
  });
};

export default renderModal;
