const hoverPagination = (element) => {
    let parent = element.parentElement;
    console.log(parent);
    Array.from(parent.children).forEach(child => {
        if(child.classList.contains('page_active')) {
            child.classList.remove('page_active');
        }
    });
    element.classList.add('page_active');
}
