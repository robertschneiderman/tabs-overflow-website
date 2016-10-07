(function() {

  const mr = (frm, to) => {
    return Math.floor((Math.random() * to) + frm);
  };

  const mri = (frm, to) => {
    return (Math.random() * (to - frm)) + frm;
  };  

  const randomBinary = () => {
    return mr(1, 2);
  };

  window.mri = mri;

  const randomDimensions = (icon) => {
    let val = mri(6, 8);
    icon.style.width = `${val}rem`;   
    icon.style.height = `${val}rem`;       
    // icon.style.width = `8rem`;   
    // icon.style.height = `8rem`;    
  };

  const randomOrigin = (icon) => {
    // let bottom = mr(-20, 50); 
    icon.style.bottom = `-20%`;
    icon.style.left = `${mr(1, 90)}%`;

    // let binary = randomBinary();
    // if (binary === 1) {
    //   icon.style.left = `${mr(-10, 10)}%`;
    // } else {
    //   icon.style.right = `${mr(-10, 10)}%`;
    // }  
  };

  const getHoOrigin = (icon) => {
    if (icon.style.right === '') {
      return 'left';
    } else if (icon.style.left === '') {
      return 'right';
    }
  };

  const getHoPath = (icon, prv, increment) => {
    hOrigin = getHoOrigin(icon);
    let binary = randomBinary();

    if (hOrigin === 'left') {
      return mr(prv, prv + increment);
    } else if (hOrigin === 'right') {
      return mr(prv, prv - increment);        
    } else if (binary === 1) {
      return mr(prv, prv - increment);
    } else {
      return mr(prv, prv + increment);
    }

  };     
  
  const randomDuration = (frm, to) => {
    return mr(frm, to);
  };

  const randomDelay = (frm, to) => {
    let randNum = mr(frm, to);
    return (randNum === 3) ? 0 : randNum
  };

  const randomPercent = () => {
    return `${mr(1, 100)}%`;
  };

  const placeIconRandomly = (icon) => {
    icon.style.left = `${mr(0, 1300)}px`;
    icon.style.top = `${mr(0, 1800)}px`;    
  } 

  const sizeDown = (icon) => {
    debugger;
    let width = icon.style.width;
    let height = icon.style.height;
    icon.style.width = `${(width.slice(0, width.length - 2) - 1)}rem`;
    icon.style.width = `${(height.slice(0, height.length - 2) - 1)}rem`;
  }

  const dimensionInteger = (dim) => {
    return dim.slice(0, dim.length - 2);
  }

  const overlap = (newVec, oldVecs) => {
    newVec = newVec.getBoundingClientRect();

    for (var i = 0; i < oldVecs.length; i++) {
      let oldVec = oldVecs[i].getBoundingClientRect();

      if (!(newVec.right < oldVec.left || 
      newVec.left > oldVec.right || 
      newVec.bottom < oldVec.top || 
      newVec.top > oldVec.bottom)) {
        return true;
      }
    };
    return false;
  };

  let tm = new TimelineMax();

  let icons = Array.prototype.slice.call(document.querySelectorAll('.icon'));

  // for (let i = 0; i < icons.length; i++) {
  //   let icon =  icons[i];
  //   randomDimensions(icon);

  //   placeIconRandomly(icon);    

  //   if (i === icons.length) debugger;

  //   iconsExcluding = icons.slice(0, i).concat(icons.slice(i+1));

  //   let j = 0;
  //   while(overlap(icon, iconsExcluding)) {
  //     // debugger;
  //     if ((j >= 3) && (dimensionInteger(icon.style.width) > 6.5)) {
  //       sizeDown(icon);
  //       j = 0;
  //     }
  //     if (dimensionInteger(icon.style.width) < 6.5) {
  //       icon.style.width = `4rem`
  //       icon.style.height = `4rem`
  //     }      
  //     placeIconRandomly(icon);
  //     j++
  //   }
    
  // };

    // for (let i = 0; i < icons.length; i++) {
    //   let time = (icons[i].getBoundingClientRect().top / 500);

    //   TweenMax.to(icons[i], 32, {
    //     top: "-=1900",
    //     rotation: `+=${mr(350, 450)}`,
    //     ease: Linear.easeNone,
    //     repeat: -1,
    //   }, 0);    
    // }

  // setInterval(animateIcons, 28000);

  // let k = 0
  // setInterval(() => {
  //   console.log("k:", 1);
  //   k++
  // }, 1000);

  const creationWaypoint = () => {
    let waypoint = new Waypoint({
      element: document.getElementById('ot-creation'),
      handler: function() {
        this.element.style.visibility = 'visible';
        animateOTCreation();
        this.destroy();
      },
      offset: '75%'    
    });
  };

  const listingWaypoint = () => {
    let waypoint2 = new Waypoint({
      element: document.getElementById('ot-listing'),
      handler: function() {
        this.element.style.visibility = 'visible';        
        animateOTListing();
        this.destroy();
      },
      offset: '75%'    
    }); 
  };

  const safeTabWaypoint = () => {
    let waypoint3 = new Waypoint({
      element: document.getElementById('ot-safe-tabs'),
      handler: function() {
        this.element.style.visibility = 'visible';        
        animateSafeTabs();
        this.destroy();
      },
      offset: '75%'    
    }); 
  };

  const shareBtnWaypoint = () => {
    new Waypoint({
      element: document.getElementById('fb-share-btn'),
      handler: function() {
        this.element.style.visibility = 'visible';        
        this.element.classList.add('zoomInDown');
        setTimeout(() => {
          this.element.classList.add('tada');
        }, 500);
        this.destroy();
      },
      offset: '95%'    
    }); 
  }
  shareBtnWaypoint();

  const textWaypoint = () => {
    Array.from(document.getElementsByClassName('how-to-text')).forEach((el, i) => {
      new Waypoint({
        element: el,
        handler: function() {
          this.element.style.opacity = 1;
          if (i === 1)
            this.element.style.right = '0rem';
          else {
            this.element.style.left = '0rem';
          }
        },
        offset: '75%'
      });
    });
  };
  textWaypoint();

  $("#ot-creation").load("./images/svg/tabs_overflow_creation.svg", creationWaypoint);

  $("#ot-listing").load("./images/svg/overflow_tab_listing.svg", listingWaypoint);

  $("#ot-safe-tabs").load("./images/svg/safe_tabs.svg", safeTabWaypoint);


  const animateOTCreation = () => {
    let tl = new TimelineMax;

    tl.from('#ot-creation-svg', .6, {
      x: -200,
      opacity: 0
    }).to('#overflow-tab', .3, {
      y: -25,
      ease: Linear.easeNone,
    }, 0).to('#flash-start', .3, {
      scaleY: 11,
      scaleX: 12,
      transformOrigin:'5% 63%',
      ease: Linear.easeNone,
    }).from('#magnified', .8, {
      x: -10,
      display: 'block',
      opacity: 0,
      ease: Linear.easeIn,
    });    
  };

  const animateOTListing = () => {
    let tl = new TimelineMax;

    tl.from('#ot-listing-svg', .6, {
      x: 200,
      opacity: 0
    }).from('#bing', .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      transformOrigin:'50% 50%',      
    }).from('#youtube-1', .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      transformOrigin:'50% 50%',      
    }).from('#facebook', .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      transformOrigin:'50% 50%'
    }).from('#youtube-2', .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      transformOrigin:'50% 50%'      
    });    
  };    

  const animateSafeTabs = () => {
    let tl = new TimelineMax;

    tl.from('#safe-tabs-svg', .6, {
      x: -200,
      opacity: 0
    }).to('#cursor', .4, {
      x: '-420%',
      y: '-130%',
      ease: Power1.easeOut,
      repeat: 0,
    }).from('#dropdown', .6, {
      scaleY: 0,
      transformOrigin:'50% 0%',      
      ease: Power1.easeOut,
      repeat: 0,
    }).to('#cursor', .4, {
      x: '-480%',
      y: '200%',
      ease: Power1.easeOut,
      repeat: 0,
    }, '-=.2').from('#lock-one', .4, {
      scale: 0,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%',
    }, "lock-appear").to('#swivel-one', .4, {
      scaleX: -1,
      ease: Power1.easeOut,
      repeat: 0,
    }, 'swivel').to('#swivel-one', .4, {
      y: 5,
      ease: Power1.easeOut,
      repeat: 0,
    }, 'press').from('#lock-twoo', .4, {
      scale: 0,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%',
    }, "lock-appear").to('#swivel-twoo', .4, {
      scaleX: -1,
      ease: Power1.easeOut,
      repeat: 0,
    }, 'swivel').to('#swivel-twoo', .4, {
      y: 5,
      ease: Power1.easeOut,
      repeat: 0,
    }, "press").from('#lock-three', .4, {
      scale: 0,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%',
    }, "lock-appear").to('#swivel-three', .4, {
      scaleX: -1,
      ease: Power1.easeOut,
      repeat: 0,
    }, 'swivel').to('#swivel-three', .4, {
      y: 5,
      ease: Power1.easeOut,
      repeat: 0,
    }, 'press') 
  };
})();