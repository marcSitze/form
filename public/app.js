const form = document.querySelector('form');
const modules = document.querySelector('.modules');
let count = 0;
modules.addEventListener('click', e => {
  //  console.log(e.target.checked);
    // if(e.target.name == 'module1'){
    //     count++;
    // }
    // if(e.target.name == 'module2'){
    //     count++;
    // }
    // if(e.target.name == 'module3'){
    //     count++;
    // }
    if(e.target.checked){
        count++;
    }
    console.log(count);
});