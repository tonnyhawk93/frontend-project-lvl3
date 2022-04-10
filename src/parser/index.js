const parser = (xml) => {
  try {
    const posts = [];
    const title = xml.querySelector('title').textContent;
    const description = xml.querySelector('description').textContent;
    const link = xml.querySelector('link').textContent;
    const feed = { title, description, id: link };
    const items = xml.querySelectorAll('item');
    items.forEach((item) => {
      const post = {};
      Array.from(item.children).forEach((child) => { post[child.nodeName] = child.textContent; });
      post.feedId = link;
      post.id = post.guid + post.feedId;
      post.visited = false;
      posts.push(post);
    });

    return { feed, posts };
  } catch (error) {
    throw new Error('error.parseError');
  }
};

export default parser;
