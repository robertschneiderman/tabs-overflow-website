(function() {

  const mr = (frm, to) => {
    return Math.floor((Math.random() * to) + frm);
  };

  const mri = (frm, to) => {
    return (Math.random() * to) + frm;
  };  

  const randomBinary = () => {
    return mr(1, 2);
  };

  const randomDimensions = (icon) => {
    let val = mri(3, 5);
    icon.style.width = `${val}rem`;   
    icon.style.height = `${val}rem`;       
    // icon.style.width = `5.5rem`;   
    // icon.style.height = `5.5rem`;    
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
    icon.style.top = `${mr(0, 700)}px`;
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

  for (let i = 0; i < icons.length; i++) {
    let icon =  icons[i];
    randomDimensions(icon);

    placeIconRandomly(icon);

    debugger;

    iconsExcluding = icons.slice(0, i).concat(icons.slice(i+1));

    while(overlap(icon, iconsExcluding)) {
      placeIconRandomly(icon);      
    }
    
  };

  for (let i = 0; i < icons.length; i++) {
    // let time = (icons[i].getBoundingClientRect().top / 500);

    TweenMax.to(icons[i], 7, {
      top: "-=500",
      rotation: `+=${mr(50, 150)}`,
      ease: Linear.easeNone,
      repeat: -1,
    }, 0);    
  }  

  // const iconRise = () => {
  //   tm.to(icons, 7, {
  //     top: "-=500",
  //     rotation: `+=${mr(50, 150)}`,
  //     ease: Linear.easeNone,
  //     repeat: 0,
  //   }, 0);
  // }

  // iconRise();

})();