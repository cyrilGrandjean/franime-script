import {el} from "redom";

export function observeDom(obj: HTMLElement, callback) {
    var MutationObserver = window.MutationObserver;

    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback)

        // have the observer observe for changes in children
        mutationObserver.observe(obj, {childList: true, subtree: true})
        return mutationObserver
    }

    // browser support fallback
    else if (window.addEventListener) {
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
    }
}

export function addButtonDownloadCsv(parentDiv: HTMLElement, callDownload: () => void) {
    if (document.getElementById('csvButton')) {
        return;
    }
    let div = el(
        'div',
        'CSV',
        {
            id: 'csvButton',
            class: 'ml-3 flex justify-center items-center w-[39px] h-[39px] relative gap-2.5 p-2.5 rounded-[10px] bg-[#1e222c]',
            style: 'cursor: pointer;',
        });
    div.addEventListener("click", (e) => {
        e.preventDefault();
        callDownload();
    });
    parentDiv.appendChild(div);
}
