setTimeout(() => {
  let flag = document.getElementById('flag');
  if (flag) {
    flag.innerHTML = flag.innerHTML.replace('No', 'Yes');
  }
}, 1000);
