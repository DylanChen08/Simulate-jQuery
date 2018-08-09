window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    if (typeof nodeOrSelector === 'string') {

        let temp = document.querySelectorAll(nodeOrSelector)

        for (let i = 0; i < temp.length; i++) {
            // console.log("in")
            nodes[i] = temp[i];
        }
        nodes.length = temp.length
        // console.log("in")
    } else if (nodeOrSelector instanceof Node) {
        // console.log("in")
        nodes = {
            0: nodeOrSelector,
            length: 1

        }
    }


    nodes.addClass = function (classes) {
        // console.log("in2")
        classes.forEach((value) => {
            console.log("in")
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add(value)
            }
        });
    }

    nodes.text = function (text) {
        if (text === undefined) {
            var texts = [];
            for (let i = 0; i < texts.length; i++) {
                texts.push(nodes[i].textContent)
            }
            return texts
        } else {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text
            }
        }
    }


    return nodes;
}

window.jQuery.ajax = function (options) {
    let url;
    if (arguments.length === 1) {
        url = options.url;
    } else if (arguments.length === 2) {
        url = arguments[0];
        options = arguments[1];
    }


    let method = options.method;
    let body = options.body;
    let successFn = options.successFn;
    let failFn = options.failFn;
    let headers = options.headers;

    let request = new XMLHttpRequest();

    for (let key in headers) {
        let value = headers[key];
        request.setRequestHeader(key, value);
    }

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log("加载完成");
            if (request.status >= 200 && request.status < 300) {
                console.log("请求完成");
                console.log(request.responseText);
                console.log(request.getAllResponseHeaders());
                let parseObject = window.JSON.parse(request.responseText);
                console.log(typeof parseObject);
                console.log(parseObject);
                successFn.call(undefined, request.responseText);
            } else if (request.status >= 400) {
                console.log("请求失败");
                failFn.call(undefined, request);
            }
        }
        console.log(request.readyState);
    };

    request.open(method, url);
    request.send(body);
};

var nodes2 = jQuery("ul>li")
console.log(nodes2)
nodes2.addClass(['blue'])
nodes2.text('hi')
console.log(nodes2.text())


// console.log("jq", jQuery)
// console.dir(window.jQuery)

// console.log(nodes2.addClass)
