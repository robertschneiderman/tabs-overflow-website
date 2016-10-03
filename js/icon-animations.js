(function() {

  const mr = (frm, to) => {
    return Math.floor((Math.random() * to) + frm);
  };

  const randomBinary = () => {
    return mr(1, 2);
  };

  const randomDimensions = (icon) => {
    icon.style.width = `${mr(4, 5)}rem`;   
    icon.style.height = `${mr(4, 5)}rem`;       
  };

  const randomOrigin = (icon) => {
    let bottom = mr(-20, 50); 
    icon.style.bottom = `${bottom}%`;

    if (bottom > 0) {
      let binary = randomBinary();
      if (binary === 1) {
        icon.style.left = '-20%';
      } else {
        icon.style.right = '-20%';
      }
    } else {
      let left = mr(1, 99)
      icon.style.left = `${left}%`;      
    }   
  };

  const getHoOrigin = (icon) => {
    debugger;
    if (icon.style.left === '-20%') {
      return 'left';
    } else if (icon.style.right === '-20%') {
      return 'right';
    }
  };

  const getHoPath = (icon, prv, increment) => {
    hOrigin = getHoOrigin(icon);

    if (hOrigin === 'left') {
      return mr(prv, prv + increment);
    } else if (hOrigin === 'right') {
      return mr(prv, prv - increment);        
    }
  };     
  
  const randomDuration = (frm, to) => {
    return mr(frm, to);
  };

  const randomDelay = (frm, to) => {
    let randNum = mr(frm, to);
    (randNum === 3) ? 0 : randNum
  };

  const randomPercent = () => {
    return `${mr(1, 100)}%`;
  };       

  let tm = new TimelineMax();

  let icons = document.querySelectorAll('.icon');

  for (let i = 0; i < icons.length; i++) {
    let icon =  icons[i];

    randomDimensions(icon);
    randomOrigin(icon);

    let x1 = mr(-30, 30);
    let x2 = getHoPath(icon, x1, 400);
    let x3 = getHoPath(icon, x2, 800);
    let y1 = mr(-30, 30);
    let y2 = mr(y1, y1 - 200);
    let y3 = mr(y2, y2 - 300);
    let r1 = mr(-30, 30);
    let r2 = mr(r1, r1 + 50);
    let r3 = mr(r2, r2 + 50);

    tm.to(document.getElementById(icon.id), randomDuration(8, 10), {
      bezier: {
        type: "soft",
        values: [
          {x: x1, y: y1, rotation: r1},
          {x: x2, y: y2, rotation: r2},
          {x: x3, y: y3, rotation: r3}
        ],
        autoRotate: false
      },
      ease: Linear.easeNone,
      repeat: 0
    }, `start+=${randomDelay(1, 3)}`);


  };
})();