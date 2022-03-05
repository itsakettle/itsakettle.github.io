// Display the banner on page load

const currentTimeSeconds = () => {
  return Math.round(new Date().getTime()/1000)
}

const bannerVisibility = () => {

  let bannerDismissTime = localStorage.bannerDismissTime;
  let bannerRefreshDays = 60;
  let bannerRefreshSeconds = bannerRefreshDays*24*60*60;
  let currentTime = currentTimeSeconds()

  if (bannerDismissTime == null) {
    $('#cookie-banner').css({visibility: 'visible'})
  } else if ( (currentTime - bannerDismissTime)  > bannerRefreshSeconds) {
    $('#cookie-banner').css({visibility: 'visible'})
  }
  
}

const bannerDismiss = () => {
  $('#banner-dismiss').click(function () {
    localStorage.bannerDismissTime =currentTimeSeconds();
    $('#cookie-banner').css({visibility: 'hidden'})
  });
}

window.addEventListener('load', bannerVisibility)
window.addEventListener('load', bannerDismiss)