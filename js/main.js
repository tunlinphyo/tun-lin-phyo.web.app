/** Main App **/
const $ = elm => document.querySelector(elm);
const _ = elm => document.createElement(elm);

const main = () => {

  let projectIndex = 0;

  const setCssVar = (name, value) => {
    const root = $(':root');
    root.style.setProperty(name, value);
  }

  const showNext = () => {
    setCssVar('--slide-next-opacity', 1);
    setCssVar('--slide-next-event', 'auto');
  }
  const hideNext = () => {
    setCssVar('--slide-next-opacity', 0);
    setCssVar('--slide-next-event', 'none');
  }
  const showPrev = () => {
    setCssVar('--slide-prev-opacity', 1);
    setCssVar('--slide-prev-event', 'auto');
  }
  const hidePrev = () => {
    setCssVar('--slide-prev-opacity', 0);
    setCssVar('--slide-prev-event', 'none');
  }
  const showAll = () => {
    showNext();
    showPrev();
  }
  const hideAll = () => {
    hideNext();
    hidePrev();
  }

  const printDetail = data => {
    const htmlString = `
          <header>
              <img src="${data.logo}" alt="${data.name}" class="applogo cursor-disabled detail-applogo">
              <h2 class="appname cursor-text">${data.name}</h2>
              <small class="cursor-text-tiny">(${data.language})</small>

              <div class="available-at ${data.isApp ? '' : 'none'}">
                  <a href="${data.store.apple || '#'}" ${data.store.apple && 'target="_blank"'}
                      class="button view-store app-store ${data.store.apple ? 'cursor-link' : 'cursor-disabled'}">
                      <img src="./assets/icons/apple.png" alt="apple">
                      <p>App Store</p>
                  </a>
                  <a href="${data.store.android || '#'}" ${data.store.android && 'target="_blank"'}
                      class="button view-store play-store ${data.store.android ? 'cursor-link' : 'cursor-disabled'}">
                      <img src="./assets/icons/play-store.png" alt="apple">
                      <p>Google Play</p>
                  </a>
              </div>
              <div class="view-on ${data.isApp ? 'none' : ''}">
                  <a href="${data.site.link}" class="cursor-link" target="_blank">${data.site.link}</a>
              </div>
          </header>
          <p class="paragraph p-detail-about cursor-text-small">${data.about}</p>
          ${
            data.detail ? '<p class="paragraph p-detail-about cursor-text-small">' + data.detail + '</p>' : ''
          }

      `;
    $('.detail-container').innerHTML = htmlString;
  };

  const setActive = index => {
    const paginations = document.querySelectorAll('.custom-pagination');
    for (let pagination of paginations) {
      if (pagination.classList.contains(`pagination-${index}`)) {
        pagination.classList.add('pagination-active');
        pagination.classList.remove('cursor-link');
        pagination.classList.add('cursor-disabled');
      } else {
        pagination.classList.remove('pagination-active');
        pagination.classList.add('cursor-link');
        pagination.classList.remove('cursor-disabled');
      }
    }
  }

  const initSwipers = () => {
    /** Initialize Swiper **/
    const swiper = new Swiper('.swiper-container-main', {
      direction: 'vertical',
      speed: 560,
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      breakpointsInverse: true,
      resizeObserver: true,
      simulateTouch: false,
      breakpoints: {
        768: {
          speed: 580,
        },
        1024: {
          speed: 600,
        },
        1280: {
          speed: 620,
        }
      },
      pagination: {
        el: '.swiper-pagination-main',
        clickable: true,
        dynamicBullets: true,
      },
    });

    const animateList = () => {
      const speeds = ['02s', '03s', '04s', '05s', '06s', '08s', '1s']
      const list = $('.skill-list');
      const skills = list.children;
      let index = 0;
      for (let skill of skills) {
        skill.className = `animated fadeInDown delay-${speeds[index]}`;
        index += 1;
        // skill.addEventListener('click', ({screenX, screenY, clientX, clientY}) => {
        //     console.log(screenX, screenY, clientX, clientY);
        // })
      }
    }

    const writeLogo = (elm, data) => {
      let html = '';
      data.split('').forEach(d => {
        if (d === '-') html += '<span class="cursor-text space"></span>';
        else html += `<span class="cursor-text-large">${d}</span>`;
      });
      elm.innerHTML = html;
    }

    const title = $('title');
    const scrollHelp = $('#scroll-help');
    const contactLink = $('.contact-link');
    const contactBtn = $('.contact-button');
    const logo = $('.logo');
    const myPhoto = $('.my-photo');
    const welcome = $('.welcome');
    const aboutMe = $('.about-me');
    const email = $('.email');
    const phone = $('.phone');
    const animatedLayer = $('.animated-layer');
    swiper.on('slideChange', () => {
      const index = swiper.realIndex;
      setActive(index);
      if (index === 0) {
        title.textContent = 'Tun Lin Phyo';
        writeLogo(logo, 'design-!diot');
        logo.className = 'logo animated jello';
        scrollHelp.className = 'button scroll-help cursor-link animated bounceInHelp';
      } else if (index === 1) {
        title.textContent = 'Recent Works';
        writeLogo(logo, 'recent-works');
        logo.className = 'logo animated swing';
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
        // if (projectIndex < projects.length - 1) {
        //   scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
        // } else {
        //   scrollHelp.className = 'button scroll-help cursor-link scroll-projects';
        // }
      } else if (index === 3) {
        title.textContent = 'Contact Me?';
        writeLogo(logo, 'contact-me?');
        logo.className = 'logo animated rubberBand';
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
      } else {
        title.textContent = 'What I Learn';
        writeLogo(logo, 'what-!-learn');
        logo.className = 'logo animated shake';
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects';
        animateList();
      }

      if (index === 0) {
        myPhoto.className = 'my-photo cursor-welcome animated slideInDown';
        welcome.className = 'welcome cursor-text animated zoomIn';
        aboutMe.className = 'about-me cursor-text-small parageraph animated bounceInRight';
        contactLink.className = 'contact-link cursor-link animated bounceInLink';
      } else {
        myPhoto.className = 'my-photo cursor-welcome';
        welcome.className = 'welcome';
        aboutMe.className = 'about-me parageraph';
        contactLink.className = 'contact-link hide';
      }
      if (index === 3) {
        email.classList.add('zoomIn');
        phone.classList.add('zoomIn')
      }
      // else {
      //   email.classList.remove('zoomIn');
      //   phone.classList.remove('zoomIn')
      // }
      if (index === 1) {
        if (!projectIndex) {
          showNext();
          hidePrev();
        } else if (projectIndex === projects.length - 1) {
          showPrev();
          hideNext();
        } else {
          showAll();
        }
      } else {
        hideAll();
      }
    });

    for (let i = 0; i < 4; i++) {
      $(`.pagination-${i}`).addEventListener('click', () => swiper.slideTo(i, 400));
    }


    scrollHelp.addEventListener('click', () => swiper.slideNext());
    $('#scroll-top').addEventListener('click', () => {
      swiper.slideTo(0, 1000);
      animatedLayer.style.animation = 'AnimatedLayer 1s cubic-bezier(0.72, -0.05, 0.74, 0.88) reverse';
    });
    contactLink.addEventListener('click', () => {
      swiper.slideTo(4, 1000);
      animatedLayer.style.animation = 'AnimatedLayer 1s ease';
    });
    contactBtn.addEventListener('click', () => {
      swiper.slideTo(4, 1000);
      animatedLayer.style.animation = 'AnimatedLayer 1s ease';
    });
    animatedLayer.addEventListener('animationend', () => {
      animatedLayer.style.animation = '';
    })

    myPhoto.addEventListener('click', () => {
      myPhoto.className = 'my-photo cursor-welcome animated wobble';
    });
    myPhoto.addEventListener('animationend', () => {
      myPhoto.className = 'my-photo cursor-welcome';
    });

    const clearDetail = () => $('.detail-container').innerHTML = '';

    const projectDetail = $('.project-detail');
    const projectDetailEvent = projectDetail.addEventListener('transitionend', () => {
      if (projectDetail.classList.contains('open')) {
        $('.project-container').style.opacity = 1;
        $('.close-button').style.opacity = 1;
        $('.detail-applogo').style.opacity = 1;
      }

      projectDetail.removeEventListener('transitionend', projectDetailEvent);
    });

    const duration = 500;
    let dimensions;
    let startDimensions;
    let endDimensions;
    let startIcon;
    const imageTransporter = $('.image-transporter');

    const onClickCard = (card, data) => {
      const parent = card.parentElement;
      const mySwiper = $('.swiper-container-projects').swiper;

      if (parent.classList.contains('swiper-slide-next')) {
        mySwiper.slideNext(400);
        return;
      } else if (parent.classList.contains('swiper-slide-prev')) {
        mySwiper.slidePrev(400);
        return;
      } else if (!parent.classList.contains('swiper-slide-active')) {
        return;
      }

      startIcon = card.querySelector('.applogo');
      const domRect = card.getBoundingClientRect();
      const iconRect = startIcon.getBoundingClientRect();

      dimensions = [domRect.y, domRect.x, domRect.width, domRect.height];
      const [top, left, width, height] = dimensions;
      startDimensions = [iconRect.y, iconRect.x];
      const [sTop, sLeft] = startDimensions;

      projectDetail.classList.add('open');
      printDetail(data);
      $('.detail-applogo').style.opacity = 0;

      const endIcon = $('.detail-applogo');
      const endIconRect = endIcon.getBoundingClientRect();

      imageTransporter.src = data.logo;
      imageTransporter.style.width = `${startIcon.clientWidth}px`;
      imageTransporter.style.height = `${startIcon.clientHeight}px`;

      endDimensions = [endIconRect.y, endIconRect.x];
      const [eTop, eLeft] = endDimensions;
      startIcon.style.opacity = 0;

      projectDetail.animate(
        [
          { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`, opacity: 1, borderRadius: '10px' },
          { top: '0', left: '0', width: '100%', height: '100%', opacity: 1, borderRadius: '0px' },
        ],
        { duration, easing: 'ease' }
      );
      imageTransporter.animate(
        [
          { top: `${sTop}px`, left: `${sLeft}px` },
          { top: `${eTop}px`, left: `${eLeft}px` },
        ],
        { duration, easing: 'ease-in-out' }
      )
    };
    const onClickClose = () => {
      const scrollTop = $('.project-container').scrollTop
      const [top, left, width, height] = dimensions;
      const [sTop, sLeft] = startDimensions;
      const [eTop, eLeft] = endDimensions;

      projectDetail.classList.remove('open');
      $('.project-container').style.opacity = 0;
      $('.close-button').style.opacity = 0;
      $('.detail-applogo').style.opacity = 0;
      startIcon.style.opacity = 1;
      clearDetail();

      projectDetail.animate(
        [
          { top: '0', left: '0', width: '100%', height: '100%', opacity: 1, borderRadius: '0px' },
          { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`, opacity: 1, borderRadius: '10px' },
        ],
        { duration, easing: 'ease' }
      )
      const imageAnimate = imageTransporter.animate(
        [
          { top: `${eTop - scrollTop}px`, left: `${eLeft}px`, opacity: 1 },
          { top: `${sTop}px`, left: `${sLeft}px`, opacity: 1 },
        ],
        { duration, easing: 'ease-in-out' }
      )

      imageAnimate.onfinish = () => {
        imageTransporter.src = null;
      }
    }


    $('.close-button').addEventListener('click', onClickClose);

    const projectSlides = document.getElementById('project-slides');
    projectSlides.innerHTML = '';
    for (let project of projects) {
      const swiperCard = _('div'),
        card = _('div'),
        appLogo = _('img'),
        appName = _('h2'),
        small = _('small'),
        description = _('p'),
        viewMore = _('button');

      swiperCard.className = 'swiper-slide';
      card.className = 'card card-project cursor-link';
      appLogo.className = 'applogo';
      appLogo.setAttribute('alt', project.name);
      appLogo.setAttribute('src', project.logo);
      appName.className = 'appname';
      appName.textContent = project.name;
      small.textContent = `(${project.language})`;
      small.className = 'cursor-text-tiny';
      description.className = 'paragraph description';
      description.textContent = project.about;
      viewMore.className = 'button view-more cursor-link';
      viewMore.textContent = 'Read More..';
      card.addEventListener('click', () => onClickCard(card, project));

      card.append(appLogo, appName, small, description, viewMore);
      swiperCard.append(card);
      projectSlides.append(swiperCard);
    }

    /** Initialize Swiper **/
    const swiperProjects = new Swiper('.swiper-container-projects', {
      slidesPerView: 'auto',
      speed: 560,
      spaceBetween: 0,
      centeredSlides: true,
      breakpointsInverse: true,
      simulateTouch: false,
      breakpoints: {
        768: {
          speed: 580,
        },
        1024: {
          speed: 600,
        },
        1280: {
          speed: 620,
        }
      },
      pagination: {
        el: '.swiper-pagination-projects',
        type: 'fraction',
      }
    });



    swiperProjects.on('slideChange', () => {
      projectIndex = swiperProjects.realIndex;
      // const viewMore = $('.view-more');
      if (!projectIndex) {
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
        showNext();
        hidePrev();
      } else if (projectIndex == projects.length - 1) {
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
        showPrev();
        hideNext();
      } else {
        scrollHelp.className = 'button scroll-help cursor-link scroll-projects hide';
        showAll();
      }
      // if ($('.swiper-slide').classList.contains('swiper-slide-active')) {
      //   viewMore.classList.add('cursor-link');
      //   viewMore.classList.remove('cursor-disabled');
      // } else {
      //   viewMore.classList.remove('cursor-link');
      //   viewMore.classList.add('cursor-disabled');
      // }
    });

    $('.custon-swiper-button-next').addEventListener('click', () => swiperProjects.slideNext(400));
    $('.custon-swiper-button-prev').addEventListener('click', () => swiperProjects.slidePrev(400));
  };

  initSwipers();
};

const cursor = () => {
  const cursorEl = $('.custom-cursor');
  const [w, h] = [cursorEl.offsetWidth, cursorEl.offsetHeight]

  const changeCursor = (elm) => {
    const compStyles = window.getComputedStyle(elm);
    if (elm.classList.contains('cursor-link')) {
      cursorEl.className = 'custom-cursor is-link';
    } else if (elm.classList.contains('cursor-disabled')) {
      cursorEl.className = 'custom-cursor is-disabled';
    } else if (elm.classList.contains('cursor-text')) {
      cursorEl.className = 'custom-cursor is-text';
    } else if (elm.classList.contains('cursor-text-large')) {
      cursorEl.className = 'custom-cursor is-text is-large';
    } else if (elm.classList.contains('cursor-text-small')) {
      cursorEl.className = 'custom-cursor is-text is-small';
    } else if (elm.classList.contains('cursor-text-tiny')) {
      cursorEl.className = 'custom-cursor is-text is-tiny';
    } else if (elm.classList.contains('cursor-me')) {
      cursorEl.className = 'custom-cursor is-me';
    } else if (elm.classList.contains('cursor-welcome')) {
      cursorEl.className = 'custom-cursor is-welcome';
    } else {
      cursorEl.className = 'custom-cursor';
    }
  }

  const moveCursor = (x, y) => {
    cursorEl.style.top = `${y - (h / 2)}px`;
    cursorEl.style.left = `${x - (w / 2)}px`;
  }

  document.addEventListener('mousemove', evt => {
    moveCursor(evt.clientX, evt.clientY);
  })

  document.addEventListener('mouseover', (evt) => {
    changeCursor(evt.target);
  }, false)
};

const theme = () => {
  let themeLight = true;
  const myPhoto = $('.my-photo');
  const animation = $('.theme-animation');
  const themeBtn = $('.theme-toggle');

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) themeLight = false;
  else themeLight = true;

  const setTheme = theme => {
    document.body.setAttribute('color-schema', theme)
  }

  const toggleTheme = ({ clientX, clientY }) => {
    animation.style.top = `${clientY - 20}px`;
    animation.style.left = `${clientX - 20}px`;
    animation.style.animation = 'SetTheme .5s';
  }

  myPhoto.addEventListener('click', toggleTheme);
  themeBtn.addEventListener('click', toggleTheme);
  animation.addEventListener('animationend', () => {

    animation.style.top = '-100px';
    animation.style.left = '-100px';
    animation.style.animation = '';

    if (themeLight) {
      setTheme('dark');
      themeLight = false;
    } else {
      setTheme('light');
      themeLight = true;
    }
  })
};

(() => {
  window.addEventListener('load', () => {
    main();
    cursor();
    theme();
  })
})();