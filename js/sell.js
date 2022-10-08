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
        parentForm.replaceChild(section, form);
    }
}

let mainForm = document.querySelector('form');
mainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    console.log(fileInput.files[0]);
    const config = {
        onUploadProgress : function(progressEvent) {
            const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
        }
    }

    //Axios 
    axios.post('https://httpbin.org/post', formData, config)
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

