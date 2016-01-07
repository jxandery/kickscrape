Nightmare = require('nightmare');

Nightmare()
  .goto('https://www.kickstarter.com/projects/728836843/codrone-learn-to-code-with-programmable-drone/description')
  .evaluate(function(){

    var findRewards     = function() {
      console.log('it hits');
      var rewardsList   = $('.pledge__info');
      var rewards       = [];
      for (var i = 0; i < rewardsList.length; i++) {
        rewards.push(
            {
              pledgeInfo:  rewardsList[i].children[0].innerHTML.slice(9, 13),
              description: rewardsList[i].children[2].innerHTML.slice(4, 140).split('<p>').join(' ').split('</p>').join(' '),
            }
            );
      }
      return rewards;
    }

    name       = $('title:first').text();
    backers    = $('#backers_count').data('backers-count');
    pledged    = $('#pledged').data('pledged');
    goal       = $('#pledged').data('goal');
    rewards    = findRewards();

    return {
      backers: backers,
      pledged: pledged,
      goal:    goal,
      rewards: rewards
    };
  })
.then(function(result){
  console.log(result);
}, function(err) {
  console.log(err);
})
.end();

