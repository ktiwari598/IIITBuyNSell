let form = document.querySelector('#file-upload-section'),
fileInput = document.querySelector('#uploaded-file');

form.addEventListener('click', () => {
    fileInput.click();
});

fileInput.onchange = ({target}) => {
    let file = target.files[0];
    let fileSize = file.size;
    if(file) {
        if(fileSize > (1000000)) {
            fileSize = (fileSize/(1000000)).toFixed(2);
            fileSize = `${fileSize} MB`
        }
        else {
            fileSize = (fileSize/(1000)).toFixed(2);
            fileSize = `${fileSize} KB`
        }
        let parentForm = form.parentElement;
        let section = document.createElement('section');
        section.classList.add('upload-area');
        section.innerHTML =  `<li class="row">
                  <div class="content">
                    <i class="fas fa-file-alt"></i>
                    <div class="upload-details">
                      <span class="name">${file.name}</span>
                      <span class="size">${fileSize}</span>
                    </div>
                  </div>
                  <i class="fas fa-check"></i>
                </li>`;
        let childrens = parentForm.children;
        if(childrens.item(2)) {
            console.log(childrens.item(2));
            childrens.item(2).remove();
        }
        parentForm.appendChild(section);
    }
}

function updateFormUI() {
    let parentForm = document.querySelector('.wrapper');
    let uploadArea = document.querySelector('.upload-area');
    parentForm.replaceChild(form, uploadArea);
}

let mainForm = document.querySelector('form');
mainForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let submit = document.getElementById('sell-submit');

    let parent = submit.parentElement;

    // let circularIndicator = document.createElement('div');
    // circularIndicator.classList.add('circular');
    // circularIndicator.innerHTML = `<div class="inner"></div>
    //         <div class="numb">0%</div>
    //         <div class="circle">
    //           <div class="bar left">
    //             <div class="progress"></div>
    //           </div>
    //           <div class="bar right">
    //             <div class="progress"></div>
    //           </div>
    //         </div>`;
    // parent.replaceChild(circularIndicator, submit);

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);


    const config = {
        onUploadProgress : function(progressEvent) {
            let percentCompleted = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
            //percentCompleted = Math.max(0, percentCompleted-10);
            submit.value = `Uploading Image file ... ${percentCompleted}%`;
            Object.assign(submit.style,{background:"#7c9bf0",color:"#fff"});
            if(percentCompleted == 100) {
                submit.value = `please wait..`;
            }
        }
    }

    //Axios 
    axios.post('https://httpbin.org/post', formData, config)
    .then(res => {
        console.log(res);
        submit.value = `Submit`;
        Object.assign(submit.style,{background:"#fff",color:"#333"});
        alert('Wohoo!, you have successfully added a new item for purchase');
        let parentForm = form.parentElement;
        let childrens = parentForm.children;
        if(childrens.item(2)) {
            childrens.item(2).remove();
        }
    })
    .catch(err => console.log(err));
});

