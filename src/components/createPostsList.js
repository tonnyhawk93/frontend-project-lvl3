const createPostListItem = ({ guid, title, link }) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const linkElement = document.createElement('a');
  linkElement.classList.add('fw-bold');
  linkElement.dataset.id = guid;
  linkElement.setAttribute('target', '_blank');
  linkElement.setAttribute('rel', 'noopener noreferrer');
  linkElement.href = link;
  linkElement.textContent = title;
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.textContent = 'Показать';
  button.dataset.id = guid;
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  li.append(linkElement, button);

  return li;
};

const createCard = (title) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardHeader = document.createElement('h2');
  cardHeader.classList.add('card-title', 'h4');
  cardHeader.textContent = title;
  cardBody.append(cardHeader);
  card.append(cardBody);

  return card;
};

export const createPostsList = (posts) => {
  const card = createCard('Посты');
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  const listItems = posts.map(createPostListItem);
  list.append(...listItems);
  card.append(list);

  return card;
};

export const createFeedsList = (feeds) => {
  const card = createCard('Фиды');
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  const listItems = feeds.map(({ title, description }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    const listItemTitle = document.createElement('h3');
    listItemTitle.classList.add('h6', 'm-0');
    listItemTitle.textContent = title;
    const listItemDescription = document.createElement('p');
    listItemDescription.classList.add('m-0', 'small', 'text-black-50');
    listItemDescription.textContent = description;
    listItem.append(listItemTitle, listItemDescription);
    return listItem;
  });
  list.append(...listItems);
  card.append(list);

  return card;
};
