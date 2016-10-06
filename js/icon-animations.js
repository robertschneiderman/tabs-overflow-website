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

    //   // icons[i].getBoundingClientRect().top

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


  // jQuery('img.icon').each(function(){
  //     var $img = jQuery(this);
  //     var imgID = $img.attr('id');
  //     var imgClass = $img.attr('class');
  //     var imgURL = $img.attr('src');

  //     jQuery.get(imgURL, function(data) {
  //         // Get the SVG tag, ignore the rest
  //         var $svg = jQuery(data).find('svg');

  //         // Add replaced image's ID to the new SVG
  //         if(typeof imgID !== 'undefined') {
  //             $svg = $svg.attr('id', imgID);
  //         }
  //         // Add replaced image's classes to the new SVG
  //         if(typeof imgClass !== 'undefined') {
  //             $svg = $svg.attr('class', imgClass+' replaced-svg');
  //         }

  //         // Remove any invalid XML tags as per http://validator.w3.org
  //         $svg = $svg.removeAttr('xmlns:a');

  //         // Replace image with new SVG
  //         $img.replaceWith($svg);

  //     }, 'xml');

  // });

  const creationWaypoint = () => {
    let waypoint = new Waypoint({
      element: document.getElementById('ot-creation'),
      handler: () => {
        animateOTCreation();
        debugger;
        waypoint.destroy();
      },
      offset: '75%'    
    });
  };

  const listingWaypoint = () => {
    let waypoint2 = new Waypoint({
      element: document.getElementById('ot-listing'),
      handler: () => {
        animateOTListing();
        debugger;
        waypoint2.destroy();
      },
      offset: '75%'    
    }); 
  }   

  $("#ot-creation").load("./images/svg/tab_overflow_creation_4.svg", creationWaypoint);

  $("#ot-listing").load("./images/svg/overflow_tab_listing.svg", listingWaypoint);

  $("#ot-listing").load("./images/svg/safe_tabs.svg", listingWaypoint);


  const animateOTCreation = () => {
    let tl = new TimelineMax;

    tl.to(document.getElementById('overflow-tab'), .3, {
      y: -25,
      ease: Linear.easeNone,
      repeat: 0,
    }, 0).to(document.getElementById('flash-start'), .3, {
      scaleY: 11,
      scaleX: 12,
      transformOrigin:'5% 63%',
      ease: Linear.easeNone,
      repeat: 0,
    }).from(document.getElementById('magnified'), .8, {
      x: -10,
      opacity: 0,
      ease: Linear.easeIn,
      repeat: 0,
    });    
  };

  const animateOTListing = () => {
    let tl = new TimelineMax;

    tl.from(document.getElementById('bing'), .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%',      
    }).from(document.getElementById('youtube-1'), .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%',      
    }).from(document.getElementById('facebook'), .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%'
    }).from(document.getElementById('youtube-2'), .6, {
      scale: .5,
      opacity: 0,
      ease: Bounce.easeOut,
      repeat: 0,
      transformOrigin:'50% 50%'      
    });    
  };    




  



})();