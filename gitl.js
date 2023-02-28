const defaultUser = 'Sadia-Malik';
const userAPIUrl = `https://api.github.com/users/${defaultUser}`;

const githubUserBlock = $('#github_user');
const input = $('#get_user');
const search = $('#user_submit');

function createNode(element) {
  return $('<' + element + '>');
}

function append(parent, el) {
  return parent.append(el);
}

function fetchGitUser(url) {
      input.focus();
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          let user = data;

      let wrapper = createNode('div'),
          content = createNode('div'),
          title = createNode('h4'),
          img = createNode('img'),
          link = createNode('a'),
          info = createNode('p'),
          repoWrapper = createNode('div'),
          repoTitle = createNode('h5'),
          repoList = createNode('ul'),
          warning = createNode('div');

      if (user.message == "Not Found") {
        input.focus();
        githubUserBlock.html('');

        warning.html("This user does not exist! Try something else.");
        warning.addClass('alert alert-danger');

        append(githubUserBlock, warning);
        return;
      }
      if (user.company) {
        let company = createNode('p');
        company.html('<strong>Company:</strong> ' + user.company);
        append(content, company);
      } else {
        let noCompany = createNode('p');
        noCompany.html('No company information available.');
        append(content, noCompany);
      }

      title.html(user.login);
      link.attr('href', user.html_url);
      link.attr('target', '_blank');
      img.attr('src', user.avatar_url);
      info.html(user.bio);
      
      repoTitle.html('Repositories:');
      


      let numRepos = createNode('p');
      numRepos.html('<strong>Number of public repositories:</strong> ' + user.public_repos);
      append(content, numRepos);

     
      wrapper.addClass('media-left');
      img.addClass('media-object imagee');
      content.addClass('media-body');
      title.addClass('media-heading');

      append(githubUserBlock, link);
      append(link, wrapper);
      append(link, content);
      append(wrapper, img);
      append(content, title);
      append(content, info);
      append(repoWrapper, repoTitle);
      append(repoWrapper, repoList);
    })
    .fail(function(error) {
      console.log(error);
    });
}

function searchUser() {
  const value = input.val();
  const url = `https://api.github.com/users/${value}`;

  input.val('');
  githubUserBlock.html('');
  fetchGitUser(url);
};
search.on('click', searchUser);
input.on('keyup', function(e) {
  if (e.keyCode == 13) {
    searchUser();
  }
});

fetchGitUser(userAPIUrl);