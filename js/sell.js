let form = document.querySelector('#file-upload-section'),
form2 = document.querySelector('#file-upload-section-2'),
fileInput = document.querySelector('#uploaded-file'),
fileInput2 = document.querySelector('#uploaded-file-2');


form.addEventListener('click', () => {
    fileInput.click();
    fileInput.onchange = ({target}) => {
        let file = target.files[0];
        let fileName = file.name;
        if(fileName.length > 10) {
            let arr = fileName.split(".");
            fileName = arr[0].slice(0,10) + "..." + arr[arr.length-1];
        }
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
                        <span class="name">${fileName}</span>
                        <span class="size">${fileSize}</span>
                        </div>
                    </div>
                    <i class="fas fa-check"></i>
                    </li>`;
            let childrens = parentForm.children;
            if(childrens.item(2)) {
                childrens.item(2).remove();
            }
            parentForm.appendChild(section);
        }
    }
});

form2.addEventListener('click', () => {
    fileInput2.click();
    console.log("hwllo 1");
    fileInput2.onchange = ({target}) => {
        let file = target.files[0];
        let fileName = file.name;
        if(fileName.length > 10) {
            let arr = fileName.split(".");
            fileName = arr[0].slice(0,10) + "..." + arr[arr.length-1];
        }
        console.log("hwllo 2");
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
            let parentForm = form2.parentElement;
            let section = document.createElement('section');
            section.classList.add('upload-area');
            section.innerHTML =  `<li class="row">
                    <div class="content">
                        <i class="fas fa-file-alt"></i>
                        <div class="upload-details">
                        <span class="name">${fileName}</span>
                        <span class="size">${fileSize}</span>
                        </div>
                    </div>
                    <i class="fas fa-check"></i>
                    </li>`;
            let childrens = parentForm.children;
            if(childrens.item(2)) {
                childrens.item(2).remove();
            }
            parentForm.appendChild(section);
        }
    }   
});


const submitForm = (formType, submitBtn) => {

    let mainForm = document.getElementById(formType);
    mainForm = mainForm.firstElementChild;

    mainForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let submit = document.getElementById(submitBtn);

        const formData = new FormData();
        if(formType == 'sell-pro') {
            formData.append('image', fileInput.files[0]);
        }
        else {
            formData.append('image', fileInput2.files[0]);
        }

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
            (formType == 'sell-pro') ? alert('Wohoo!, you have successfully added a new item for purchase')
            : alert('Wohoo!, you have successfully added a new item in Lost&Found')
            let parentForm = (formType == 'sell-pro') ? form.parentElement : form2.parentElement;
            console.log(parentForm);
            let childrens = parentForm.children;
            if(childrens.item(2)) {
                childrens.item(2).remove();
            }
        })
        .catch(err => console.log(err));
    });

}

const openForm = (formType, element1, element2) => {
    let descForm = document.getElementsByClassName('desc-form');
    for(let i=0;i<descForm.length;i++) {
        descForm[i].style.display = "none";
    }
    document.getElementById(formType).style.display='block';
    
    document.getElementById(element2).classList.remove('active');
    document.getElementById(element1).classList.add('active');
}