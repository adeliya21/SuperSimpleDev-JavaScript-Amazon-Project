const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

/*
XMLHttpRequest - built in class to create HTTP requests

xhr.open('method', 'URL path');

URLs:
https://supersimplebackend.dev/
https://supersimplebackend.dev/hello
https://supersimplebackend.dev/products/first
https://supersimplebackend.dev/products/not-supported
https://supersimplebackend.dev/dosumentation
https://supersimplebackend.dev/images/apple.png

methods(GET, POST, DELETE,) + URLs = backedn API

URL can return/contain:
plain text
html text
JSON
images (.png)

*/